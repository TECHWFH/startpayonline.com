# StartPay Smart Auto-Save, Draft Recovery & Record Protection Policy

Applies to StartPay forms, calculators and software in this repository and as the required baseline for future StartPay projects derived from it.

1. Debounce draft writes until one second after input stops. Do not write on every keystroke. Flush dirty state on pagehide/hidden when possible.
2. Status colors: Saving Royal Blue #2457FF; successfully written Draft Saved Bright Green #00A825; Save Failed Bright Red #FF0000. Never show success without a successful storage operation. Show Last Saved in DD/MM/YYYY with Asia/Kolkata time.
3. Offer Continue Form and Start New Form for recovery. Require confirmation before discarding an unfinished draft. Never silently replace an unresolved draft.
4. Use a project-specific new-form draft key and a separate edit-draft key per saved record. Drafts and edit drafts do not count against the 20 saved records.
5. Editing an existing record changes only a separate draft until explicit successful Save Changes. Preserve permanent ID and createdAt. Generate a new project ID only for a new saved record.
6. Exclude passwords, OTPs, API keys, tokens, banking credentials and fields marked data-sensitive=true or data-autosave=off. Preserve required functional/security code. Explain browser/device-only storage limits and loss on clearing browser data.
7. Remove only the corresponding draft after a successful saved-record write. Retain drafts on failure or conflict. Do not clear unrelated project/record drafts.
8. Keep a saved-record fingerprint/version in each edit draft. Check it at restore and at Save Changes; block stale overwrites and retain the draft if the record changed or was deleted. Refresh other records before writing the list.
9. Do not claim localStorage is cross-device/cloud storage, encrypted storage, or an atomic multi-tab database. For shared simultaneous editing, use a server-side transactional store.
10. Legacy drafts without a verifiable edit baseline must not silently overwrite a newer saved record.

Insurance implementation keys: startpay.insurance.drafts.v1.new and startpay.insurance.drafts.v1.edit.<record-id>. Use a different project namespace for Loan, Property and other projects.

RTO assistance is an advisory registration-prefix lookup, not an official ownership/vehicle verification. Do not guess unknown cities; distinguish BH series. Validate mapping changes before publishing.
