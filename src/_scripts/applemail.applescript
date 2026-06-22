tell application "Mail"
    set selectedMsgs to selection
    if (count of selectedMsgs) is 0 then
        display dialog "Please select at least one email." buttons {"OK"} default button 1
        return
    end if

    set successCount to 0

    repeat with i from (count of selectedMsgs) to 1 by -1
        set msg to item i of selectedMsgs
        set tmpPath to ""
        try
            set rawSource to source of msg
            set tmpPath to (do shell script "mktemp /tmp/dontmailme.XXXXXX")
            set fref to open for access (POSIX file tmpPath) with write permission
            write rawSource to fref as «class utf8»
            close access fref

            set awkScript to "awk 'BEGIN{IGNORECASE=1; url=\"\"; isOneClick=0} /^List-Unsubscribe-Post:.*One-Click/{isOneClick=1} /^List-Unsubscribe:/{if(match($0, /<(https:\/\/[^>]+)>/)){url=substr($0, RSTART+1, RLENGTH-2)}} END{if(isOneClick && url) print url}'"
            set shellCmd to "cat " & tmpPath & " | sed '/^$/q' | " & awkScript
            set postUrl to do shell script shellCmd

            do shell script "rm -f " & tmpPath

            if postUrl is not "" then
                set curlCmd to "curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -d 'List-Unsubscribe=One-Click' -s -o /dev/null -w '%{http_code}' " & quoted form of postUrl
                set httpCode to do shell script curlCmd

                if (httpCode as integer) ≥ 200 and (httpCode as integer) < 400 then
                    delete msg
                    set successCount to successCount + 1
                end if
            end if
        on error errMsg
            if tmpPath is not "" then
                try
                    do shell script "rm -f " & tmpPath
                end try
            end if
        end try
    end repeat

    display notification "Unsubscribed and deleted " & successCount & " newsletters." with title "DontMailMe"
end tell
