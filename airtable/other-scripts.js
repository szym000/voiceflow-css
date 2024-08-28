//KB upload 1

// Webhook URL from Make.com
const webhookUrl = 'https://hook.eu2.make.com/gdq2uxe039fefe2oetlja4yqdxbwa3x0';

// Table name and field containing attachments
const tableName = 'KB upload'; // Ensure this matches your actual table name
const attachmentField = 'Datei'; // Update with the correct attachment field name

// Retrieve triggering record's ID
const { recordId } = input.config();

// Access the table and the record
const table = base.getTable(tableName);
const record = await table.selectRecordAsync(recordId);

// Get the attachment data from the record
const attachmentData = record.getCellValue(attachmentField);

if (!attachmentData || attachmentData.length === 0) {
    output.set('message', 'No attachments found in the specified field.');
    return;
}

// Assume sending the first attachment (extend if needed)
const attachmentUrl = attachmentData[0].url;
const attachmentName = attachmentData[0].filename;
const attachmentMimeType = attachmentData[0].type || 'application/octet-stream';

// Create JSON data to send
const fileData = {
    name: attachmentName,
    mime: attachmentMimeType,
    url: attachmentUrl
};

// Send the file metadata directly to the webhook
await fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([fileData])
});

output.set('message', 'File metadata successfully sent to the webhook.');


//KB upload 2
// Second Webhook URL
const webhookUrl2 = 'https://hook.eu2.make.com/19ac72qjam58rpk7lcpde545k61zd4l3';

// Table name
const tableName = 'KB upload'; // Ensure this matches your actual table name

// Retrieve triggering record's ID
const { recordId } = input.config();

// Access the table and the record
const table = base.getTable(tableName);
const record = await table.selectRecordAsync(recordId);

if (!record) {
    output.set('message', 'No record found with the specified ID.');
    return;
}

// Trigger the second webhook
await fetch(webhookUrl2, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recordId })
});

output.set('message', 'Second webhook triggered.');








//KB replace 1
// Webhook URL from Make.com
const webhookUrl = 'https://hook.eu2.make.com/zov52l636eg6dgsvffu6un7u1jglwac9';

// Table name and fields containing attachments and document IDs
const tableName = 'KB list'; // Ensure this matches your actual table name
const attachmentField = 'Datei'; // Update with the correct attachment field name
const documentIdField = 'Dokument ID'; // Replace with the exact field name for the document ID

// Retrieve triggering record's ID
const { recordId } = input.config();

// Access the table and the record
const table = base.getTable(tableName);
const record = await table.selectRecordAsync(recordId);

// Get the attachment data and document ID from the record
const attachmentData = record.getCellValue(attachmentField);
const documentID = record.getCellValue(documentIdField);

if (!attachmentData || attachmentData.length === 0) {
    output.set('message', 'No attachments found in the specified field.');
    return;
}

if (!documentID) {
    output.set('message', 'No document ID found in the specified field.');
    return;
}

// Assume sending the first attachment (extend if needed)
const attachmentUrl = attachmentData[0].url;
const attachmentName = attachmentData[0].filename;
const attachmentMimeType = attachmentData[0].type || 'application/octet-stream';

// Create JSON data to send
const fileData = {
    name: attachmentName,
    mime: attachmentMimeType,
    url: attachmentUrl,
    documentID: documentID // Add the document ID field to the payload
};

// Send the file metadata and document ID directly to the webhook
await fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([fileData])
});

output.set('message', 'File metadata and document ID successfully sent to the webhook.');


//KB replace 2
// Second Webhook URL
const webhookUrl2 = 'https://hook.eu2.make.com/19ac72qjam58rpk7lcpde545k61zd4l3';

// Table name
const tableName = 'KB list'; // Ensure this matches your actual table name

// Retrieve triggering record's ID
const { recordId } = input.config();

// Access the table and the record
const table = base.getTable(tableName);
const record = await table.selectRecordAsync(recordId);

if (!record) {
    output.set('message', 'No record found with the specified ID.');
    return;
}

// Trigger the second webhook
await fetch(webhookUrl2, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recordId })
});

output.set('message', 'Second webhook triggered.');







//KB delete 
// Webhook URL base
const webhookBaseURL = 'https://hook.eu2.make.com/02k7rpfp0rg36j1lp5ymx9d2i521fdcr';

// Table name and field containing document IDs
const tableName = 'KB list'; // Replace with your actual table name
const documentField = 'Dokument ID'; // Replace with the correct field name

// Retrieve triggering record's ID
const { recordId } = input.config();

// Access the table and the record
const table = base.getTable(tableName);
const record = await table.selectRecordAsync(recordId);

// Get the document ID from the record
const documentID = record.getCellValue(documentField);

if (!documentID) {
    output.set('message', 'No document ID found in the specified field.');
    return;
}

// Construct the final URL
const finalURL = `${webhookBaseURL}?recordId=${recordId}&documentID=${encodeURIComponent(documentID)}`;

output.set('message', `Generated URL: ${finalURL}`);

// Optionally send a request to the URL (e.g., if you want to call a webhook)
await fetch(finalURL, {
    method: 'GET'
});

