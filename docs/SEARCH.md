# DontMailMe Research

## RFC 8058 Standard
Requires a POST request to the URL specified in the List-Unsubscribe-Post header.

## Gmail API Constraints
* Fetching headers requires metadata format.
* Google Apps Script UrlFetchApp handles the required POST requests.

## Outlook Constraints
* Cloud APIs require paid Azure subscriptions.
* Local COM objects on Windows and AppleScript on macOS bypass costs and maintain zero data access.