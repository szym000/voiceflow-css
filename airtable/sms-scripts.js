//[SMS] Automatically update all templates if edited
// Define an asynchronous function to handle the updates
async function updateFieldsInAnfrage() {
    // Setup API access to the tables
    let vorlagenTable = base.getTable("SMS Vorlagen");
    let anfrageTable = base.getTable("Anfrage");

    // Fetch the triggering record details from the Vorlagen table
    let inputConfig = input.config();
    let recordId = inputConfig.recordId;
    let vorlagenRecord = await vorlagenTable.selectRecordAsync(recordId);

    if (!vorlagenRecord) {
        console.error('Triggering record not found.');
        return;
    }

    // Extract the 'Vorlagenname' from the Vorlagen record
    let vorlagenName = vorlagenRecord.getCellValue("Vorlagenname");
    if (!vorlagenName) {
        console.error('Vorlagenname is empty or not found.');
        return;
    }

    // Check for updates in 'Betreff' or 'Nachricht' fields
    let updatedNachricht = vorlagenRecord.getCellValue("Nachricht");

    // Fetch all records from Anfrage to update
    let queryResult = await anfrageTable.selectRecordsAsync();
    let recordsToUpdate = queryResult.records.filter(record => record.getCellValue("SMS Vorlage") && record.getCellValue("SMS Vorlage").name === vorlagenName);

    // Update the filtered records in Anfrage with the new values from Vorlagen
    for (let record of recordsToUpdate) {
        // Construct the message using the 'Name' from the Anfrage record and the updated 'Nachricht'
        let personalMessage = `Sehr geehrte(r) ${record.getCellValue("Name")},\n\n` +
            `${updatedNachricht}\n` +
            `Mit freundlichen Grüßen,\n` +
            `Ihr dentalVisions Team\n\n`;

        let updates = {
            "SMS Nachricht": personalMessage       // Update 'Nachricht' in Anfrage with the personalized message
        };

        // Perform the update if there are changes
        await anfrageTable.updateRecordAsync(record.id, updates);
        console.log(`Updated record ${record.id} in Anfrage with Vorlagenname: ${vorlagenName}`);
    }
}

// Execute the function
updateFieldsInAnfrage();




//[SMS] Terminänderung
// Access the input variables
let inputConfig = input.config();
let recordId = inputConfig.recordId;  // Ensure this is set up to capture the Record ID from the triggering event

// Prepare the message with dynamic content and proper formatting
let message = ``;

// Reference the correct table
let table = base.getTable("Anfrage");  // Replace with your actual table name

// Update only the record that triggered the automation
await table.updateRecordAsync(recordId, {
    "SMS Nachricht": message  // Ensure 'Nachricht' is the exact name of the field in your table
});





//[SMS] Terminabsage
// Access the input variables
let inputConfig = input.config();
let recordId = inputConfig.recordId;  // Ensure this is set up to capture the Record ID from the triggering event

// Assuming 'Abgesagter' is a datetime string in ISO format
// Parse the date and adjust it to Berlin time zone
let abgesagterDate = new Date(inputConfig.Abgesagter);
// Format the date to a more readable format
let formattedDate = abgesagterDate.toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
});

// Prepare the message with dynamic content and proper formatting
let message = `Ihre Terminabsage für den ${formattedDate} wurde bestätigt. Für einen neuen Termin stehen wir Ihnen gerne zur Verfügung.`;
// Reference the correct table
let table = base.getTable("Anfrage");  // Replace with your actual table name

// Update only the record that triggered the automation
await table.updateRecordAsync(recordId, {
    "SMS Nachricht": message  // Ensure 'Nachricht' is the exact name of the field in your table
});




//[SMS] Custom template
// Access the input variables
let inputConfig = input.config();
let recordId = inputConfig.recordId;  // Ensure this is set up to capture the Record ID from the triggering event

// Reference the correct tables
let anfrageTable = base.getTable("Anfrage");
let vorlageTable = base.getTable("SMS Vorlagen");

// Fetch the triggering record to get the templateName from 'E-Mail-Vorlage'
let anfrageRecord = await anfrageTable.selectRecordAsync(recordId);
if (!anfrageRecord) {
    console.error('Triggering record not found.');
    return;  // Exit if no triggering record found
}

// Retrieve the templateName from the 'E-Mail-Vorlage' field in the triggering record
let templateSelectValue = anfrageRecord.getCellValue("SMS Vorlage");
if (!templateSelectValue) {
    console.error('Template name not found in the triggering record.');
    return;  // Exit if template name is not found
}

// Extract the string value from the select field
let templateName = templateSelectValue.name;
console.error("Template Name from Anfrage Record: ", templateName);

// Fetch all templates
let vorlageRecords = await vorlageTable.selectRecordsAsync();
let templateRecord = vorlageRecords.records.find(record => {
    let recordName = record.getCellValue("Vorlagenname");
    console.error("Comparing with Vorlage Record Name: ", recordName);
    return recordName === templateName;
});

if (!templateRecord) {
    console.error('No matching template found.');
    return;  // Exit if no matching template found
}

// Get the 'E-Mail Vorlage' message from the matched template record
let emailVorlage = templateRecord.getCellValue("Nachricht");
if (!emailVorlage) {
    console.error('E-Mail Vorlage field is empty or does not exist in the template record.');
    emailVorlage = "Hier sollte Ihre Nachricht stehen. Bitte aktualisieren Sie die Vorlage oder kontaktieren Sie den Administrator.";  // Default message
}


// Prepare the message with dynamic content and proper formatting using the fetched template
let message = `Sehr geehrte(r) ${anfrageRecord.getCellValue("Name")},\n\n` +
    `${emailVorlage}\n` +
    `Mit freundlichen Grüßen,\n` +
    `Ihr dentalVisions Team\n\n`;

// Update only the record that triggered the automation, including both Nachricht and E-Mail-Betreff
await anfrageTable.updateRecordAsync(recordId, {
    "SMS Nachricht": message,  // Ensure 'Nachricht' is the exact name of the field in your table

});




//[SMS] Dokumentanforderung vor Ort
// Access the input variables
let inputConfig = input.config();
let recordId = inputConfig.recordId;  // Ensure this is set up to capture the Record ID from the triggering event


// Prepare the message with dynamic content and proper formatting
let message = `Ihre angeforderten Unterlagen sind zur Abholung in unserer Praxis bereit. Bitte besuchen Sie uns während der Öffnungszeiten.`;

// Reference the correct table
let table = base.getTable("Anfrage");  // Replace with your actual table name

// Update only the record that triggered the automation
await table.updateRecordAsync(recordId, {
    "SMS Nachricht": message  // Ensure 'Nachricht' is the exact name of the field in your table
});





//[SMS] Dokumentanforderung
// Access the input variables
let inputConfig = input.config();
let recordId = inputConfig.recordId;  // Ensure this is set up to capture the Record ID from the triggering event


// Prepare the message with dynamic content and proper formatting
let message = ``;

// Reference the correct table
let table = base.getTable("Anfrage");  // Replace with your actual table name

// Update only the record that triggered the automation
await table.updateRecordAsync(recordId, {
    "SMS Nachricht": message  // Ensure 'Nachricht' is the exact name of the field in your table
});





//[SMS] Dokumentanforderung post
// Access the input variables
let inputConfig = input.config();
let recordId = inputConfig.recordId;  // Ensure this is set up to capture the Record ID from the triggering event


// Prepare the message with dynamic content and proper formatting
let message = `Ihre angeforderten Unterlagen wurden per Post versendet und sollten in den nächsten Tagen bei Ihnen eintreffen.`;

// Reference the correct table
let table = base.getTable("Anfrage");  // Replace with your actual table name

// Update only the record that triggered the automation
await table.updateRecordAsync(recordId, {
    "SMS Nachricht": message  // Ensure 'Nachricht' is the exact name of the field in your table
});




//[SMS] Empty
// Access the input variables
let inputConfig = input.config();
let recordId = inputConfig.recordId;  // Ensure this is set up to capture the Record ID from the triggering event

// Prepare the message with dynamic content and proper formatting
let message = ``;

// Reference the correct table
let table = base.getTable("Anfrage");  // Replace with your actual table name

// Update only the record that triggered the automation
await table.updateRecordAsync(recordId, {
    "SMS Nachricht": message  // Ensure 'Nachricht' is the exact name of the field in your table
});
