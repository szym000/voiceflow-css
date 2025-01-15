const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`

export const patientDataForm = {
  name: 'patientDataForm',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_patientDataForm' || trace.payload.name === 'ext_patientDataForm',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form');

    formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.9em;
          color: #888;
        }
        input[type="text"], input[type="email"], input[type="tel"], input[type="date"] {
          font-family: inherit;
          width: 284px;
          border: 1px solid #ccc;
          background: #fff;
          margin: 5px 0 10px 0;
          outline: none;
          height: 20px;
          padding: 8px;
          border-radius: 6px;
          display: block;
        }
        input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus, input[type="date"]:focus {
          border: 1px solid #71c9ce;
        }
        input::placeholder {
          font-family: inherit; color: #ccc;
        }
        input:focus::placeholder {
          color: transparent;
        }
        .invalid {
          border-color: red;
        }
        .submit {
          width: 100%;
          background-color: grey;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: not-allowed;
          opacity: 0.5;
        }
        .cancel, .back {
          width: 100%;
          background-color: #64AFB4;
          color: #fff;
          padding: 7px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
          transition: background-color .4s;
          border: none;
        }
        
        .active {
          background-color: #64AFB4;
          cursor: pointer;
          opacity: 1;
          transition: background-color .4s;
        }
        .active:hover, .cancel:hover, .back:hover {
          background-color: #71C9CE;
        }
        .button-wrapper {
            margin-top: 10px;
            gap: 10px;
            display: flex;
            justify-content: space-around;
            align-items: normal;
            width: 100%;
        }

        /* Styling for the checkbox container */
.checkbox-container {
  gap: 3px;
  display: flex;
  align-items: center; /* Aligns the checkbox with the text vertically */
  margin-bottom: 20px; /* Bottom margin */
  margin-top: 20px;
}

/* Styling for the checkbox input */
.checkbox-container input[type="checkbox"] {
  width: 20px; /* Larger checkbox */
  height: 20px; /* Larger checkbox */
  cursor: pointer; /* Pointer cursor on hover */
  -webkit-appearance: none; /* Removes default styling */
  -moz-appearance: none; /* Removes default styling */
  appearance: none; /* Removes default styling */
  border: 1px solid #ddd; /* Custom border */
  background-color: white; /* Background color */
  position: relative; /* Needed for absolute positioning of the pseudo-element */
  transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for colors */
}

/* Styling for the checkbox when checked */
.checkbox-container input[type="checkbox"]:checked {
  background-color: #64AFB4; /* Custom background color */
  border-color: #64AFB4; /* Border color matches background */
}

/* Styling for the checkmark */
.checkbox-container input[type="checkbox"]:checked::after {
  content: "\\2713"; /* Unicode character for checkmark */
  color: white; /* White checkmark */
  position: absolute;
  left: 50%; /* Center the checkmark horizontally */
  top: 50%; /* Center the checkmark vertically */
  transform: translate(-50%, -50%); /* Adjust positioning to true center */
  font-size: 16px; /* Size of the checkmark */
  font-weight: bold; /* Makes the checkmark more visible */
}

/* Styling for the data protection link */
.data-link {
  color: #0000EE; /* Standard link color */
  text-decoration: none; /* No underline */
}

.data-link:hover {
  text-decoration: underline; /* Underline on hover */
}
      </style>

      <label for="name">Name</label>
      <input type="text" class="name" name="name" required placeholder="z.B. Max Mustermann">

      <label for="birthday">Geburtstag</label>
      <input type="date" class="birthday" name="birthday" required>

      <label for="email">E-mail</label>
      <input type="email" class="email inputEmail" name="email" placeholder="z.B. mustermann@beispiel.de" pattern="[a-z0-9._%+\\-]+@[a-z0-9\\-]+\\.[a-z]{2,}$" title="Ungültige E-Mail-Adresse">

      <label for="phone">Telefon</label>
      <input type="tel" class="phone inputPhone" name="phone" placeholder="z.B. +491234567890" pattern="\\+?\\d{7,}" title="Ungültige Telefonnummer, bitte geben Sie mindestens 10 Ziffern ein">

      <label for="dataProtection" class="checkbox-container">
      <input type="checkbox" class="accept-terms" id="dataProtection" name="dataProtection" required>
       Ich akzeptiere die  <a href="#" class="data-link">Datenschutzbestimmungen</a>
      </label>
      
      <input type="submit" class="submit" value="Weiter">
      <div class="button-wrapper">
      
      <input type="button" class="back" value="❮ Zurück">
      <input type="button" class="cancel" value="✕ Abbrechen">
      
      </div>
    `;

    const checkInputs = () => {
      const name = formContainer.querySelector('.name').value;
      const birthday = formContainer.querySelector('.birthday').value;
      const email = formContainer.querySelector('.email').value;
      const phone = formContainer.querySelector('.phone').value;
    
      // Additional: Check if the checkbox is checked
      const isTermsAccepted = formContainer.querySelector('.accept-terms').checked;
    
      const isEmailOrPhoneValid = email !== '' || phone !== '';
      const isFormValid = name && birthday && isEmailOrPhoneValid && isTermsAccepted;
    
      const submitButton = formContainer.querySelector('.submit');
      if (isFormValid) {
        submitButton.disabled = false;
        submitButton.classList.add('active');
        submitButton.style.cursor = 'pointer';
      } else {
        submitButton.disabled = true;
        submitButton.classList.remove('active');
        submitButton.style.cursor = 'not-allowed';
      }
    };

    formContainer.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input[type="checkbox"]').forEach(input => {
      if (input.type === "checkbox") {
        input.addEventListener('change', checkInputs);
      } else {
        input.addEventListener('input', checkInputs);
      }
    });

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = formContainer.querySelector('.name');
      const birthday = formContainer.querySelector('.birthday');
      const email = formContainer.querySelector('.email');
      const phone = formContainer.querySelector('.phone');

      if (
        !name.checkValidity() ||
        !birthday.checkValidity() ||
        !email.checkValidity() ||
        !phone.checkValidity()
      ) {
        name.classList.add('invalid');
        birthday.classList.add('invalid');
        email.classList.add('invalid');
        phone.classList.add('invalid');
        return;
      }

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          name: name.value,
          birthday: birthday.value,
          email: email.value,
          phone: phone.value
        },
      });
    });

    // Handle cancel button click
    formContainer.querySelector('.cancel').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'cancel',
        payload: {}
      });
    });
    
    // Handle cancel button click
    formContainer.querySelector('.back').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'back',
        payload: {}
      });
    });

    element.appendChild(formContainer);
  },
};


export const documentDetails = {
  name: 'documentDetails',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_documentDetails' || trace.payload.name === 'ext_documentDetails',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form');

    formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.9em;
          color: #888;
        }
        textarea {
          font-family: inherit;
          display: block;
          width: 284px;
          height: 100px;
          border-radius: 8px;
          padding: 8px;
          font-size: 0.9em;
          resize: vertical;
          border: 1px solid #ccc;
          margin-bottom: 10px;
        }
        textarea:focus, textarea:focus-visible {
          outline: 1px solid #71c9ce;
        }
        textarea::placeholder {
        font-family: inherit; color: #ccc;
        }
        textarea:focus::placeholder {
          color: transparent;
        }
        .submit-doc {
          width: 100%;
          background-color: grey;
          color: white;
          border: none;
          padding: 10px;
          font-weight: 600;
          border-radius: 8px;
          font-size: 15px;
          cursor: not-allowed;
          opacity: 0.5;
        }
        .cancel-doc, .back-doc {
          width: 100%;
          background-color: #64AFB4;
          color: #fff;
          font-weight: 600;
          padding: 7px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
          transition: background-color .4s;
          border: none;
        }

        .active-doc {
          background-color: #64AFB4;
          cursor: pointer;
          opacity: 1;
          transition: background-color .4s;
        }
        .active-doc:hover, .cancel-doc:hover, .back-doc:hover {
          background-color: #71C9CE;
        }
        .button-wrapper {
          margin-top: 10px;
            gap: 10px;
            display: flex;
            justify-content: space-around;
            align-items: normal;
            width: 100%;
        }
      </style>

      <label for="documentDetails">Ihre Informationen/Angaben</label>
      <textarea id="documentDetails" name="documentDetails" required placeholder="z.B. eine Kopie der Rechnung mit der Nummer 12345"></textarea>
      
      <input type="submit" class="submit-doc" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="back-doc" value="❮ Zurück">
      <input type="button" class="cancel-doc" value="✕ Abbrechen">
      </div>
    `;

    // Function to check input validity
    const checkInput = () => {
      const documentDetails = formContainer.querySelector('#documentDetails').value;

      const submitButton = formContainer.querySelector('.submit-doc');
      if (documentDetails.trim() !== '') {
        submitButton.disabled = false;
        submitButton.classList.add('active-doc');
        submitButton.style.cursor = 'pointer';
      } else {
        submitButton.disabled = true;
        submitButton.classList.remove('active-doc');
        submitButton.style.cursor = 'not-allowed';
      }
    };

    // Attach event listeners to inputs to validate in real-time
    formContainer.querySelector('#documentDetails').addEventListener('input', checkInput);

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      const documentDetails = formContainer.querySelector('#documentDetails');

      if (!documentDetails.checkValidity()) {
        documentDetails.classList.add('invalid');
        return;
      }

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          documentDetails: documentDetails.value
        },
      });
    });

    // Handle cancel button click
    formContainer.querySelector('.cancel-doc').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'cancel',
        payload: {}
      });
    });

    // Handle cancel button click
    formContainer.querySelector('.back-doc').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'back',
        payload: {}
      });
    });

    element.appendChild(formContainer);
  },
};


export const newAppointmentDetails = {
  name: 'newAppointmentDetails',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_newAppointmentDetails' || trace.payload.name === 'ext_newAppointmentDetails',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form');

    formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.9em;
          color: #888;
        }
        textarea {
          font-family: inherit;
          display: block;
          width: 284px;
          height: 100px;
          border-radius: 8px;
          padding: 8px;
          font-size: 0.9em;
          resize: vertical;
          border: 1px solid #ccc;
          margin-bottom: 10px;
        }
        textarea:focus, textarea:focus-visible {
          outline: 1px solid #71c9ce;
        }
        textarea::placeholder {
        font-family: inherit; color: #ccc;
        }
        textarea:focus::placeholder {
          color: transparent;
        }
        .submit-app {
          width: 100%;
          background-color: grey;
          color: white;
          border: none;
          padding: 10px;
          font-weight: 600;
          border-radius: 8px;
          font-size: 15px;
          cursor: not-allowed;
          opacity: 0.5;
        }
        .cancel-app, .back-app {
          width: 100%;
          background-color: #64AFB4;
          color: #fff;
          font-weight: 600;
          padding: 7px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
          transition: background-color .4s;
          border: none;
        }

        .active-app {
          background-color: #64AFB4;
          cursor: pointer;
          opacity: 1;
          transition: background-color .4s;
        }
        .active-app:hover, .cancel-app:hover, .back-app:hover {
          background-color: #71C9CE;
        }
        .button-wrapper {
          margin-top: 10px;
            gap: 10px;
            display: flex;
            justify-content: space-around;
            align-items: normal;
            width: 100%;
        }
      </style>

      <label for="newAppointmentDetails">Anfrage für neuen Termin</label>
      <textarea id="newAppointmentDetails" name="newAppointmentDetails" required placeholder="z.B. immer Nachmittags, immer Montags, usw."></textarea>
      
      <input type="submit" class="submit-app" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="back-app" value="❮ Zurück">
      <input type="button" class="cancel-app" value="✕ Abbrechen">
      </div>
    `;

    // Function to check input validity
    const checkInput = () => {
      const newAppointmentDetails = formContainer.querySelector('#newAppointmentDetails').value;

      const submitButton = formContainer.querySelector('.submit-app');
      if (newAppointmentDetails.trim() !== '') {
        submitButton.disabled = false;
        submitButton.classList.add('active-app');
        submitButton.style.cursor = 'pointer';
      } else {
        submitButton.disabled = true;
        submitButton.classList.remove('active-app');
        submitButton.style.cursor = 'not-allowed';
      }
    };

    // Attach event listeners to inputs to validate in real-time
    formContainer.querySelector('#newAppointmentDetails').addEventListener('input', checkInput);

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      const newAppointmentDetails = formContainer.querySelector('#newAppointmentDetails');

      if (!newAppointmentDetails.checkValidity()) {
        newAppointmentDetails.classList.add('invalid');
        return;
      }

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          newAppointmentDetails: newAppointmentDetails.value
        },
      });
    });

    // Handle cancel button click
    formContainer.querySelector('.cancel-app').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'cancel',
        payload: {}
      });
    });

    // Handle cancel button click
    formContainer.querySelector('.back-app').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'back',
        payload: {}
      });
    });

    element.appendChild(formContainer);
  },
};



export const FileUploadExtension = {
  name: 'FileUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_fileUpload' || trace.payload.name === 'ext_fileUpload',
  render: ({ trace, element }) => {
    const fileUploadContainer = document.createElement('div')
    fileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' style='display: none;'>
    `

    const fileInput = fileUploadContainer.querySelector('input[type=file]')
    const fileUploadBox = fileUploadContainer.querySelector('.my-file-upload')

    fileUploadBox.addEventListener('click', function () {
      fileInput.click()
    })

    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0]
      console.log('File selected:', file)

      fileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

      var data = new FormData()
      data.append('file', file)

      fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Upload failed: ' + response.statusText)
          }
        })
        .then((result) => {
          fileUploadContainer.innerHTML =
            '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
          console.log('File uploaded:', result.data.url)
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: {
              file: result.data.url.replace(
                'https://tmpfiles.org/',
                'https://tmpfiles.org/dl/'
              ),
            },
          })
        })
        .catch((error) => {
          console.error(error)
          fileUploadContainer.innerHTML = '<div>Error during upload</div>'
        })
    })

    element.appendChild(fileUploadContainer)
  },
}


export const DateExtension = {
  name: 'Date',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_date' || trace.payload.name === 'ext_date',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form');

    // Define date range constraints
    let currentDate = new Date();
    let minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 1);
    let maxDate = new Date();
    maxDate.setMonth(currentDate.getMonth() + 2);

    // Format date constraints for input
    let minDateString = minDate.toISOString().slice(0, 16);
    let maxDateString = maxDate.toISOString().slice(0, 16);

    formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.9em;
          color: #888;
        }
        #meeting-time {
          margin-bottom: 10px;
        }
        input[type="datetime-local"] {
          margin-bottom: 10px;
          font-family: inherit;
          width: 230px;
          display: block;
          border: none;
          background: #fff;
          margin: 5px 0;
          outline: none;
          padding: 8px;
          border-radius: 6px;
        }
        input[type="datetime-local"]:focus {
          border: 1px solid #71c9ce;
        }
        .submit-date {
          width: 100%;
          background-color: grey;
          color: white;
          border: none;
          padding: 10px;
          font-weight: 600;
          border-radius: 8px;
          font-size: 15px;
          cursor: not-allowed;
          opacity: 0.5;
        }
        .cancel-date, .back-date {
          width: 100%;
          background-color: #64AFB4;
          color: #fff;
          padding: 7px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
          transition: background-color .4s;
          border: none;
        }
        .active-date {
          background-color: #64AFB4;
          cursor: pointer;
          opacity: 1;
          transition: background-color .4s;
        }
        .active-date:hover, .cancel-date:hover, .back-date:hover {
          background-color: #71C9CE;
        }
        .button-wrapper {
            margin-top: 10px;
            gap: 10px;
            display: flex;
            justify-content: space-around;
            align-items: normal;
            width: 100%;
        }
      </style>

      <label for="meeting-time">Datum und Zeit auswählen</label>
      <input type="datetime-local" id="meeting-time" name="meeting-time" min="${minDateString}" max="${maxDateString}" required>
      
      <input type="submit" class="submit-date" value="Weiter" disabled>
      
      <div class="button-wrapper">
        <input type="button" class="back-date active-date" value="❮ Zurück">
        <input type="button" class="cancel-date active-date" value="✕ Abbrechen">
      </div>
    `;

    const datetimeInput = formContainer.querySelector('#meeting-time');
    const submitButton = formContainer.querySelector('.submit-date');

    // Enable the submit button only when a valid date is selected
    datetimeInput.addEventListener('input', function () {
      submitButton.disabled = !this.value;
     if (this.value) {
        submitButton.classList.add('active-date');
        submitButton.style.cursor = 'pointer';
      } else {
        submitButton.classList.remove('active-date');
        submitButton.style.cursor = 'not-allowed';
      }
    });

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault();
      const datetime = datetimeInput.value;
      let [date, time] = datetime.split('T');

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { date: date, time: time },
      });
    });

    // Set up click handlers for cancel and back buttons
    formContainer.querySelector('.cancel-date').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'cancel',
        payload: {}
      });
    });

    formContainer.querySelector('.back-date').addEventListener('click', function () {
      window.voiceflow.chat.interact({
        type: 'back',
        payload: {}
      });
    });

    element.appendChild(formContainer);
  },
};



export const FeedbackExtension = {
  name: 'Feedback',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_feedback' || trace.payload.name === 'ext_feedback',
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement('div')

    feedbackContainer.innerHTML = `
          <style>
            .vfrc-feedback {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .vfrc-feedback--description {
                font-size: 0.8em;
                color: grey;
                pointer-events: none;
            }

            .vfrc-feedback--buttons {
                display: flex;
            }

            .vfrc-feedback--button {
                margin: 0;
                padding: 0;
                margin-left: 0px;
                border: none;
                background: none;
                opacity: 0.2;
            }

            .vfrc-feedback--button:hover {
              opacity: 0.5; /* opacity on hover */
            }

            .vfrc-feedback--button.selected {
              opacity: 0.6;
            }

            .vfrc-feedback--button.disabled {
                pointer-events: none;
            }

            .vfrc-feedback--button:first-child svg {
                fill: none; /* color for thumb up */
                stroke: none;
                border: none;
                margin-left: 6px;
            }

            .vfrc-feedback--button:last-child svg {
                margin-left: 4px;
                fill: none; /* color for thumb down */
                stroke: none;
                border: none;
                transform: rotate(180deg);
            }
          </style>
          <div class="vfrc-feedback">
            <div class="vfrc-feedback--description">Was this helpful?</div>
            <div class="vfrc-feedback--buttons">
              <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
              <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            </div>
          </div>
        `

    feedbackContainer
      .querySelectorAll('.vfrc-feedback--button')
      .forEach((button) => {
        button.addEventListener('click', function (event) {
          const feedback = this.getAttribute('data-feedback')
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { feedback: feedback },
          })

          feedbackContainer
            .querySelectorAll('.vfrc-feedback--button')
            .forEach((btn) => {
              btn.classList.add('disabled')
              if (btn === this) {
                btn.classList.add('selected')
              }
            })
        })
      })

    element.appendChild(feedbackContainer)
  },
}

export const PharmacySelectorExtension = {
  name: 'PharmacySelector',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'select_pharmacy' || trace.payload.name === 'select_pharmacy',
  render: ({ trace, element }) => {
    const container = document.createElement('div');
    container.innerHTML = `
      <style>
        input[type="text"] {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          box-sizing: border-box;
          border: 2px solid #ccc;
          border-radius: 4px;
        }
        .pharmacy-list {
          z-index: 9999;
          list-style-type: none;
          padding: 0;
        }
        .pharmacy-list li {
          padding: 8px;
          background: #f9f9f9;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }
      </style>

      <input type="text" id="pharmacySearch" placeholder="Enter pharmacy name...">
      <ul class="pharmacy-list" id="pharmacyList"></ul>
    `;

    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAmEeWEzakKtekDfQtxz3iVuCg9-0mefec&libraries=places';
    document.head.appendChild(script);

    script.onload = () => {
      const searchInput = container.querySelector('#pharmacySearch');
      const pharmacyList = container.querySelector('#pharmacyList');
      let autocomplete;

      function initializeAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(searchInput, {
          types: ['establishment'],
          fields: ['place_id', 'name', 'formatted_address'],
          componentRestrictions: {country: 'us'}
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          pharmacyList.innerHTML = '';
          if (!place.place_id) {
            console.log('Please select an option from the dropdown list.');
            return;
          }
          displayPlace(place);
        });
      }

      function displayPlace(place) {
        const li = document.createElement('li');
        li.textContent = `${place.name}, ${place.formatted_address}`;
        li.addEventListener('click', () => {
          console.log(`Selected: ${place.name}`);
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { place_id: place.place_id, name: place.name },
          });
        });
        pharmacyList.appendChild(li);
      }

      if (!window.google) {
        console.error('Google Maps API failed to load.');
      } else {
        initializeAutocomplete();
      }
    };

    element.appendChild(container);
  },
};



export const ext_selectEvent = {
  name: 'EventSelector',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'select_event' || trace.payload.name === 'select_event',
  render: async ({ trace, element }) => {
    const containerId = 'event-selector-container';

    // Check if the container already exists
    let container = element.querySelector(`#${containerId}`);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      element.appendChild(container);
    }

    container.innerHTML = `
      <style>
        input[type="text"] {
          width: 100%;
          padding: 8px;
          margin: 8px 0;
          box-sizing: border-box;
          border: 2px solid #ccc;
          border-radius: 4px;
        }
        .event-list {
          z-index: 9999;
          list-style-type: none;
          padding: 0;
          max-height: 200px;
          overflow-y: auto;
        }
        .event-list li {
          padding: 8px;
          background: #f9f9f9;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }
        .event-list li:hover {
          background: #eee;
        }
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #666;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>

      <input type="text" id="eventSearch" placeholder="Search by event title">
      <div id="loading" class="loading">
      Loading...
        <div class="spinner"></div>
      </div>
      <ul class="event-list" id="eventList" style="display: none;"></ul>
    `;

    const eventSearchInput = container.querySelector('#eventSearch');
    const eventListElement = container.querySelector('#eventList');
    const loadingElement = container.querySelector('#loading');
    let events = [];

    // Fetch events from the WordPress API
    async function fetchEvents() {
      try {
        const response = await fetch('https://wwwdev.embl.org/about/info/course-and-conference-office/wp-json/custom/v1/events?per_page=100');
        if (!response.ok) throw new Error('Failed to fetch events');
        return await response.json();
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
    }

    // Render event list based on the fetched events and user input
    function renderEventList(filter = '') {
      eventListElement.innerHTML = '';
      const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(filter.toLowerCase())
      );

      if (filteredEvents.length === 0) {
        eventListElement.innerHTML = '<li>No events found</li>';
      } else {
        filteredEvents.forEach(event => {
          const li = document.createElement('li');
          li.textContent = event.title;
          li.addEventListener('click', () => {
            console.log(`Selected: ${event.title}`);
            window.voiceflow.chat.interact({
              type: 'complete',
              payload: { event_id: event.id, event_title: event.title },
            });
          });
          eventListElement.appendChild(li);
        });
      }
    }

    // Initialize the event search functionality
    async function initializeEventSearch() {
      events = await fetchEvents();
      loadingElement.style.display = 'none';
      eventListElement.style.display = 'block';

      renderEventList();

      eventSearchInput.addEventListener('input', (e) => {
        renderEventList(e.target.value);
      });
    }

    initializeEventSearch();
  },
};
