# DontMailMe - Outlook auto-unsubscribe script (https://dontmailme.org/outlook)
# Free & open source (MIT). Runs locally on YOUR Windows PC. Nothing leaves your computer.
# Method: RFC 8058 one-click unsubscribe.
#
# HOW TO USE:
#   1. Open the Outlook desktop app and select the newsletter emails you want gone.
#   2. Open PowerShell and run this script.
#   It reads each message's List-Unsubscribe header, sends the one-click POST,
#   and moves successfully-unsubscribed messages to Deleted Items.

$ErrorActionPreference = "Stop"

try {
    $Outlook = [Runtime.Interopservices.Marshal]::GetActiveObject("Outlook.Application")
} catch {
    Write-Host "Please open Outlook Desktop first!" -ForegroundColor Red
    exit
}

$Selection = $Outlook.ActiveExplorer().Selection
if ($Selection.Count -eq 0) {
    Write-Host "Please select at least one email." -ForegroundColor Yellow
    exit
}

$processed = 0
$PR_TRANSPORT_MESSAGE_HEADERS = "http://schemas.microsoft.com/mapi/proptag/0x007D001F"
$items = @()
foreach ($msg in $Selection) { $items += $msg }

for ($i = $items.Count - 1; $i -ge 0; $i--) {
    $msg = $items[$i]
    try {
        $headers = $msg.PropertyAccessor.GetProperty($PR_TRANSPORT_MESSAGE_HEADERS)
        if ($headers -match 'List-Unsubscribe-Post:\s*List-Unsubscribe=One-Click') {
            if ($headers -match 'List-Unsubscribe:\s*.*?<(https://[^>]+)>') {
                $url = $Matches[1]
                Write-Host "Unsubscribing from: $url" -ForegroundColor Cyan
                try {
                    $response = Invoke-WebRequest -Uri $url -Method Post -Body "List-Unsubscribe=One-Click" -ContentType "application/x-www-form-urlencoded" -UseBasicParsing
                    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
                        $msg.Delete()
                        $processed++
                        Write-Host "Success! Moved to Deleted Items." -ForegroundColor Green
                    } else {
                        Write-Host "Failed. HTTP Status: $($response.StatusCode)" -ForegroundColor Yellow
                    }
                } catch {
                    Write-Host "Failed to execute HTTP POST." -ForegroundColor Red
                }
            }
        }
    } catch {
        Write-Host "Error processing message." -ForegroundColor Red
    }
}

[System.Runtime.Interopservices.Marshal]::ReleaseComObject($Outlook) | Out-Null
Write-Host "Done! Processed $processed newsletters." -ForegroundColor Green
