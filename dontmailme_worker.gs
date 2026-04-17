/**
 * DontMailMe - RFC 8058 Auto-Unsubscriber
 * GitHub: https://github.com/sein-io/dontmailme
 * License: MIT
 */

'use strict';

const ALLOWED_SENDERS = ['newsletter@favorite.com', 'news@stripe.com'];

function testDryRun() {
    Logger.log('--- START DRY RUN ---');
    processEmails(true);
    Logger.log('--- END DRY RUN ---');
}

function installTrigger() {
    ScriptApp.getProjectTriggers().forEach(function(t) {
        ScriptApp.deleteTrigger(t);
    });
    
    ScriptApp.newTrigger('runJob')
        .timeBased()
        .everyMinutes(15)
        .create();
        
    Logger.log('Automation active. DontMailMe will run every 15 minutes.');
}

function runJob() {
    processEmails(false);
}

function processEmails(isDryRun) {
    const query = 'is:unread (category:promotions OR list:unsubscribe)';
    const threads = GmailApp.search(query, 0, 50); 
    let processedCount = 0;

    for (let i = 0; i < threads.length; i++) {
        const messages = threads[i].getMessages();
        
        for (let j = 0; j < messages.length; j++) {
            const message = messages[j];
            if (!message.isUnread()) continue;

            const id = message.getId();
            const sender = message.getFrom();
            
            const emailMatch = sender.match(/<([^>]+)>/);
            const email = emailMatch ? emailMatch[1].toLowerCase() : sender.toLowerCase();
            const isWhitelisted = ALLOWED_SENDERS.some(function(s) {
                return email === s.toLowerCase();
            });
            
            if (isWhitelisted) {
                Logger.log('[SKIP] ' + email);
                continue;
            }

            try {
                const metadata = Gmail.Users.Messages.get('me', id, { 
                    format: 'metadata', 
                    metadataHeaders: ['List-Unsubscribe', 'List-Unsubscribe-Post'] 
                });
                
                let listUnsub = '';
                let listUnsubPost = '';

                if (metadata.payload && metadata.payload.headers) {
                    metadata.payload.headers.forEach(function(header) {
                        if (header.name.toLowerCase() === 'list-unsubscribe') listUnsub = header.value;
                        if (header.name.toLowerCase() === 'list-unsubscribe-post') listUnsubPost = header.value;
                    });
                }

                if (listUnsubPost.indexOf('List-Unsubscribe=One-Click') !== -1) {
                    const urlMatch = listUnsub.match(/<(https:\/\/[^>]+)>/i);
                    
                    if (urlMatch && urlMatch[1]) {
                        const postUrl = urlMatch[1];
                        
                        if (isDryRun) {
                            Logger.log('[DRY RUN] ' + email + ' -> ' + postUrl);
                        } else {
                            const response = UrlFetchApp.fetch(postUrl, {
                                method: 'post',
                                contentType: 'application/x-www-form-urlencoded',
                                payload: 'List-Unsubscribe=One-Click',
                                muteHttpExceptions: true,
                                followRedirects: true
                            });
                            
                            const code = response.getResponseCode();
                            if (code >= 200 && code < 400) {
                                Gmail.Users.Messages.remove('me', id);
                                Logger.log('[SUCCESS] ' + email);
                            } else {
                                Logger.log('[HTTP_' + code + '] ' + email);
                            }
                        }
                        processedCount++;
                    }
                }
            } catch (e) {
                Logger.log('[ERROR] ' + id + ': ' + e.message);
            }
        }
    }
    
    Logger.log('Processed ' + processedCount);
}