export const documentDetails = {
    name: 'ext_documentDetails', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `

      <label for="documentDetails">Ihre Informationen/Angaben</label>
      <textarea class="textareaField" id="documentDetails" name="documentDetails" required placeholder="z.B. eine Kopie der Rechnung mit der Nummer 12345"></textarea>
      
      <input type="submit" class="submitButton" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="backButton" value="❮ Zurück">
      <input type="button" class="cancelButton" value="✕ Abbrechen">
      </div>
`;

 // Function to check input validity
 const checkInput = () => {
    const documentDetails = formContainer.querySelector('#documentDetails').value;

    const submitButton = formContainer.querySelector('.submitButton');
    if (documentDetails.trim() !== '') {
      submitButton.disabled = false;
      submitButton.classList.add('activeButton');
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('activeButton');
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
    const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });

   window.VG_ADMIN.interact({
      type: 'complete',
      payload: {
        documentDetails: documentDetails.value
      },
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.cancelButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.backButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
};

export const apothekeAbholung = {
    name: 'ext_apothekeAbholung', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `

        <label for="apothekeAbholung">Apotheke</label>
        <textarea class="textareaField" id="apothekeAbholung" name="apothekeAbholung" required placeholder="z.B. easyApotheke, Hauptstraße 1, 69224 Dortmund"></textarea>
        
        <input type="submit" class="submitButton" value="Weiter">
        
        <div class="button-wrapper">
        <input type="button" class="backButton" value="❮ Zurück">
        <input type="button" class="cancelButton" value="✕ Abbrechen">
        </div>
`;

 // Function to check input validity
 const checkInput = () => {
    const apothekeAbholung = formContainer.querySelector('#apothekeAbholung').value;

    const submitButton = formContainer.querySelector('.submitButton');
    if (apothekeAbholung.trim() !== '') {
      submitButton.disabled = false;
      submitButton.classList.add('activeButton');
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('activeButton');
      submitButton.style.cursor = 'not-allowed';
    }
  };

  // Attach event listeners to inputs to validate in real-time
  formContainer.querySelector('#apothekeAbholung').addEventListener('input', checkInput);

  formContainer.addEventListener('submit', function (event) {
    event.preventDefault();
    const apothekeAbholung = formContainer.querySelector('#apothekeAbholung');

    if (!apothekeAbholung.checkValidity()) {
      apothekeAbholung.classList.add('invalid');
      return;
    }
    const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });

   window.VG_ADMIN.interact({
      type: 'complete',
      payload: {
        apothekeAbholung: apothekeAbholung.value
      },
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.cancelButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.backButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
};

export const patientDataForm = {
    name: 'ext_patientDataForm',
    render: ({ trace, element }) => {
      setTimeout(() => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm');
  
      formContainer.innerHTML = `
        <style>
          .inputText, .inputEmail, .inputPhone, .inputDate {
            font-family: inherit !important;
            width: 300px !important;
            border: 1px solid #ccc !important;
            background: #fff !important;
            margin: 5px 0 10px 0 !important;
            outline: none !important;
            height: 20px !important;
            padding: 16px !important;
            border-radius: 6px !important;
            display: block !important;
            font-size: 16px !important;
            min-height: 34px !important;
          }
          .inputText:focus, .inputEmail:focus, .inputPhone:focus, .inputDate:focus {
            border: 1px solid #ccc !important;
          }
          input::placeholder {
            font-family: inherit; color: #ccc !important;
          }
          input:focus::placeholder {
            color: transparent;
          }
          .invalid {
            border-color: red !important;
          }
  
          .checkbox-container {
            gap: 3px !important;
            display: flex !important;
            align-items: center !important;
            margin-bottom: 20px !important;
            margin-top: 20px !important;
          }
          
          .checkbox-container input[type="checkbox"] {
            width: 20px !important;
            height: 20px !important;
            cursor: pointer !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            appearance: none !important;
            border: 1px solid #ddd !important;
            background-color: white !important;
            position: relative !important;
            transition: background-color 0.3s !important, border-color 0.3s !important;
          }
          
          .checkbox-container input[type="checkbox"]:checked {
            background-color: hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity))) !important;
            border-color: hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity))) !important;
          }
          
          .checkbox-container input[type="checkbox"]:checked::after {
            content: "\\2713" !important;
            color: white !important;
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            font-size: 16px !important;
            font-weight: bold !important;
          }
          
          .data-link {
            color: hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity))) !important;
            text-decoration: none !important;
          }
          
          .data-link:hover {
            text-decoration: underline !important;
          }
          
        </style>
  
        <label for="name">Name</label>
        <input type="text" class="name inputText" name="name" required placeholder="z.B. Max Mustermann">
  
        <label for="birthday">Geburtstag</label>
        <input type="date" class="birthday inputDate" name="birthday" placeholder="TT.MM.JJJJ" required>
  
        <label for="email">E-mail</label>
        <input type="email" class="email inputEmail" name="email" placeholder="z.B. mustermann@beispiel.de" pattern="[a-z0-9._%+\\-]+@[a-z0-9\\-]+\\.[a-z]{2,}$" title="Ungültige E-Mail-Adresse">

        <label for="phone">Telefon</label>
        <input type="tel" class="phone inputPhone" name="phone" placeholder="z.B. +491234567890" pattern="\\+?\\d{7,}" title="Ungültige Telefonnummer, bitte geben Sie mindestens 10 Ziffern ein">

  
        <div class="checkbox-container">
        <input type="checkbox" class="accept-terms" id="dataProtection" name="dataProtection" required>
         Ich akzeptiere die  <a href="#" class="data-link">Datenschutzbestimmungen</a>
        </div>
        
        <input type="submit" class="submitButton" value="Weiter">
        <div class="button-wrapper">
        
        <input type="button" class="backButton" value="❮ Zurück">
        <input type="button" class="cancelButton" value="✕ Abbrechen">
        
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
      
        const submitButton = formContainer.querySelector('.submitButton');
        if (isFormValid) {
          submitButton.disabled = false;
          submitButton.classList.add('activeButton');
          submitButton.style.cursor = 'pointer';
        } else {
          submitButton.disabled = true;
          submitButton.classList.remove('activeButton');
          submitButton.style.cursor = 'not-allowed';
        }
      };
  
      formContainer.querySelectorAll('.inputText, .inputEmail, .inputPhone, .inputDate, input[type="checkbox"]').forEach(input => {
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
        const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });
  
        window.VG_ADMIN.interact({
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
      formContainer.querySelector('.cancelButton').addEventListener('click', function () {
        window.VG_ADMIN.interact({
          type: 'cancel',
          payload: {}
        });
      });
      
      // Handle cancel button click
      formContainer.querySelector('.backButton').addEventListener('click', function () {
        window.VG_ADMIN.interact({
          type: 'back',
          payload: {}
        });
      });
  
      element.appendChild(formContainer);
        }, 1000); // Delay in milliseconds
    },
};

export const newAppointmentDetails = {
    name: 'ext_newAppointmentDetails', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `
        <style>
        
      </style>

      <label for="newAppointmentDetails">Anfrage für neuen Termin</label>
      <textarea class="textareaField" id="newAppointmentDetails" name="newAppointmentDetails" required placeholder="z.B. immer Nachmittags, immer Montags, usw."></textarea>
      
      <input type="submit" class="submitButton" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="backButton" value="❮ Zurück">
      <input type="button" class="cancelButton" value="✕ Abbrechen">
      </div>
`;

 // Function to check input validity
 const checkInput = () => {
    const newAppointmentDetails = formContainer.querySelector('#newAppointmentDetails').value;

    const submitButton = formContainer.querySelector('.submitButton');
    if (newAppointmentDetails.trim() !== '') {
      submitButton.disabled = false;
      submitButton.classList.add('activeButton');
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('activeButton');
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
    const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });

   window.VG_ADMIN.interact({
      type: 'complete',
      payload: {
        newAppointmentDetails: newAppointmentDetails.value
      },
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.cancelButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.backButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
};

export const DateExtension = {
    name: 'ext_date',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'ext_date' || trace.payload.name === 'ext_date',
    render: ({ trace, element }) => {
      const formContainer = document.createElement('form');
      formContainer.classList.add('extensionsForm'); // Add a class to the form
  
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
          #currentAppointment {
            margin-bottom: 10px !important;
          }
          .inputDateTime {
            margin-bottom: 10px !important;
            font-family: inherit !important;
            width: 250px !important;
            display: block !important;
            border: none !important;
            background: #fff !important;
            margin: 5px 0 !important;
            outline: none !important;
            padding: 10px !important;
            border-radius: 6px !important;
          }
          .inputDateTime:focus {
            border: 1px solid #71c9ce !important;
          }
          
        </style>
  
        <label for="currentAppointment">Datum und Zeit auswählen</label>
        <input type="datetime-local" class="inputDateTime" id="currentAppointment" name="currentAppointment" min="${minDateString}" max="${maxDateString}" required>
        
        <input type="submit" class="submitButton" value="Weiter" disabled>
        
        <div class="button-wrapper">
          <input type="button" class="backButton activeButton" value="❮ Zurück">
          <input type="button" class="cancelButton activeButton" value="✕ Abbrechen">
        </div>
      `;
  
      const datetimeInput = formContainer.querySelector('#currentAppointment');
      const submitButton = formContainer.querySelector('.submitButton');
  
      // Enable the submit button only when a valid date is selected
      datetimeInput.addEventListener('input', function () {
        submitButton.disabled = !this.value;
       if (this.value) {
          submitButton.classList.add('activeButton');
          submitButton.style.cursor = 'pointer';
        } else {
          submitButton.classList.remove('activeButton');
          submitButton.style.cursor = 'not-allowed';
        }
      });
  
      formContainer.addEventListener('submit', function (event) {
        event.preventDefault();
        const datetime = datetimeInput.value;
        let [date, time] = datetime.split('T');

        const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });
  
        window.VG_ADMIN.interact({
          type: 'complete',
          payload: { date: date, time: time },
        });
      });
  
      // Set up click handlers for cancel and back buttons
      formContainer.querySelector('.cancelButton').addEventListener('click', function () {
        window.VG_ADMIN.interact({
          type: 'cancel',
          payload: {}
        });
      });
  
      formContainer.querySelector('.backButton').addEventListener('click', function () {
        window.VG_ADMIN.interact({
          type: 'back',
          payload: {}
        });
      });
  
      element.appendChild(formContainer);
    },
  };

export const uberweisungAnfordern = {
    name: 'ext_uberweisungAnfordern', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `
        <style>
        
      </style>

      <label for="uberweisungAnfordern">Benötigte Überweisung</label>
      <textarea class="textareaField" id="uberweisungAnfordern" name="uberweisungAnfordern" required placeholder="z.B. Überweisung MRT linke Hand"></textarea>
      
      <input type="submit" class="submitButton" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="backButton" value="❮ Zurück">
      <input type="button" class="cancelButton" value="✕ Abbrechen">
      </div>
`;

 // Function to check input validity
 const checkInput = () => {
    const uberweisungAnfordern = formContainer.querySelector('#uberweisungAnfordern').value;

    const submitButton = formContainer.querySelector('.submitButton');
    if (uberweisungAnfordern.trim() !== '') {
      submitButton.disabled = false;
      submitButton.classList.add('activeButton');
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('activeButton');
      submitButton.style.cursor = 'not-allowed';
    }
  };

  // Attach event listeners to inputs to validate in real-time
  formContainer.querySelector('#uberweisungAnfordern').addEventListener('input', checkInput);

  formContainer.addEventListener('submit', function (event) {
    event.preventDefault();
    const uberweisungAnfordern = formContainer.querySelector('#uberweisungAnfordern');

    if (!uberweisungAnfordern.checkValidity()) {
      uberweisungAnfordern.classList.add('invalid');
      return;
    }
    const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });

   window.VG_ADMIN.interact({
      type: 'complete',
      payload: {
        uberweisungAnfordern: uberweisungAnfordern.value
      },
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.cancelButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.backButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
};

export const auAnfordern = {
    name: 'ext_auAnfordern', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `
        <style>
        
      </style>

      <label for="auAnfordern">Benötigte Krankschreibung</label>
      <textarea class="textareaFieldExtended" id="auAnfordern" name="auAnfordern" required placeholder="z.B. Ich leide seit zwei Tagen unter starken Kopfschmerzen und erhöhter Temperatur bis zu 38,5°C, die meine Konzentrationsfähigkeit stark beeinträchtigen. Diese Symptome hindern mich daran, meine beruflichen Aufgaben effektiv zu erfüllen. Ich bitte um eine Krankschreibung für die nächsten fünf Tage, um mich ausreichend erholen zu können."></textarea>
      
      <input type="submit" class="submitButton" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="backButton" value="❮ Zurück">
      <input type="button" class="cancelButton" value="✕ Abbrechen">
      </div>
`;

 // Function to check input validity
 const checkInput = () => {
    const auAnfordern = formContainer.querySelector('#auAnfordern').value;

    const submitButton = formContainer.querySelector('.submitButton');
    if (auAnfordern.trim() !== '') {
      submitButton.disabled = false;
      submitButton.classList.add('activeButton');
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('activeButton');
      submitButton.style.cursor = 'not-allowed';
    }
  };

  // Attach event listeners to inputs to validate in real-time
  formContainer.querySelector('#auAnfordern').addEventListener('input', checkInput);

  formContainer.addEventListener('submit', function (event) {
    event.preventDefault();
    const auAnfordern = formContainer.querySelector('#auAnfordern');

    if (!auAnfordern.checkValidity()) {
      auAnfordern.classList.add('invalid');
      return;
    }
    const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });

   window.VG_ADMIN.interact({
      type: 'complete',
      payload: {
        auAnfordern: auAnfordern.value
      },
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.cancelButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.backButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
}; 

export const rezeptAnfordern = {
    name: 'ext_rezeptAnfordern', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `
        <style>
        
      </style>

      <label for="rezeptAnfordern">Medikamente und Dosierung</label>
      <textarea class="textareaField" id="rezeptAnfordern" name="rezeptAnfordern" required placeholder="z.B. Ibuprofen 600mg"></textarea>
      
      <input type="submit" class="submitButton" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="backButton" value="❮ Zurück">
      <input type="button" class="cancelButton" value="✕ Abbrechen">
      </div>
`;

 // Function to check input validity
 const checkInput = () => {
    const rezeptAnfordern = formContainer.querySelector('#rezeptAnfordern').value;

    const submitButton = formContainer.querySelector('.submitButton');
    if (rezeptAnfordern.trim() !== '') {
      submitButton.disabled = false;
      submitButton.classList.add('activeButton');
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('activeButton');
      submitButton.style.cursor = 'not-allowed';
    }
  };

  // Attach event listeners to inputs to validate in real-time
  formContainer.querySelector('#rezeptAnfordern').addEventListener('input', checkInput);

  formContainer.addEventListener('submit', function (event) {
    event.preventDefault();
    const rezeptAnfordern = formContainer.querySelector('#rezeptAnfordern');

    if (!rezeptAnfordern.checkValidity()) {
      rezeptAnfordern.classList.add('invalid');
      return;
    }
    const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });

   window.VG_ADMIN.interact({
      type: 'complete',
      payload: {
        rezeptAnfordern: rezeptAnfordern.value
      },
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.cancelButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.backButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
}; 

export const befundAnfordern = {
    name: 'ext_befundAnfordern', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `
        <style>
        
      </style>

      <label for="befundAnfordern">Benötigte Befunde</label>
      <textarea class="textareaField" id="befundAnfordern" name="befundAnfordern" required placeholder="z.B. Laborwerte letzte Blutuntersuchung"></textarea>
      
      <input type="submit" class="submitButton" value="Weiter">
      
      <div class="button-wrapper">
      <input type="button" class="backButton" value="❮ Zurück">
      <input type="button" class="cancelButton" value="✕ Abbrechen">
      </div>
`;

 // Function to check input validity
 const checkInput = () => {
    const befundAnfordern = formContainer.querySelector('#befundAnfordern').value;

    const submitButton = formContainer.querySelector('.submitButton');
    if (befundAnfordern.trim() !== '') {
      submitButton.disabled = false;
      submitButton.classList.add('activeButton');
      submitButton.style.cursor = 'pointer';
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove('activeButton');
      submitButton.style.cursor = 'not-allowed';
    }
  };

  // Attach event listeners to inputs to validate in real-time
  formContainer.querySelector('#befundAnfordern').addEventListener('input', checkInput);

  formContainer.addEventListener('submit', function (event) {
    event.preventDefault();
    const befundAnfordern = formContainer.querySelector('#befundAnfordern');

    if (!befundAnfordern.checkValidity()) {
      befundAnfordern.classList.add('invalid');
      return;
    }
    const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
            buttons.forEach(button => {
                button.disabled = true;
                button.classList.remove('activeButton');
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
            });

   window.VG_ADMIN.interact({
      type: 'complete',
      payload: {
        befundAnfordern: befundAnfordern.value
      },
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.cancelButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.backButton').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
}; 

export const patientDataFormKid = {
  name: 'ext_patientDataFormKid',
  render: ({ trace, element }) => {
      // Function to render the form
      console.log(`trace from extension: `, trace)
      const formContainer = document.createElement('form'); // Create a form element dynamically
      formContainer.classList.add('extensionsForm');

    formContainer.innerHTML = `
      <style>
        .inputText, .inputEmail, .inputPhone, .inputDate {
          font-family: inherit !important;
          width: 300px !important;
          border: 1px solid #ccc !important;
          background: #fff !important;
          margin: 5px 0 10px 0 !important;
          outline: none !important;
          height: 20px !important;
          padding: 16px !important;
          border-radius: 6px !important;
          display: block !important;
          font-size: 16px !important;
          min-height: 34px !important;
        }
        .inputText:focus, .inputEmail:focus, .inputPhone:focus, .inputDate:focus {
          border: 1px solid #ccc !important;
        }
        input::placeholder {
          font-family: inherit; color: #ccc !important;
        }
        input:focus::placeholder {
          color: transparent;
        }
        .invalid {
          border-color: red !important;
        }

        .checkbox-container {
          gap: 3px !important;
          display: flex !important;
          align-items: center !important;
          margin-bottom: 20px !important;
          margin-top: 20px !important;
        }
        
        .checkbox-container input[type="checkbox"] {
          width: 20px !important;
          height: 20px !important;
          cursor: pointer !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
          border: 1px solid #ddd !important;
          background-color: white !important;
          position: relative !important;
          transition: background-color 0.3s !important, border-color 0.3s !important;
        }
        
        .checkbox-container input[type="checkbox"]:checked {
          background-color: hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity))) !important;
          border-color: hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity))) !important;
        }
        
        .checkbox-container input[type="checkbox"]:checked::after {
          content: "\\2713" !important;
          color: white !important;
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          font-size: 16px !important;
          font-weight: bold !important;
        }
        
        .data-link {
          color: hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity))) !important;
          text-decoration: none !important;
        }
        
        .data-link:hover {
          text-decoration: underline !important;
        }

        .hr-custom {
          margin: 25px 0 20px 0 !important;
        }
        
      </style>

      <label for="name">Name des Kindes</label>
      <input type="text" class="name inputText" name="name" required placeholder="z.B. Tom Mustermann">
      
      <label for="birthday">Geburtstag des Kindes</label>
      <input type="date" class="birthday inputDate" name="birthday" placeholder="TT.MM.JJJJ" required>

      <hr class="hr-custom">
      
      <label for="name">Ihre Name</label>
      <input type="text" class="eltern inputText" name="eltern" required placeholder="z.B. Max Mustermann">
      
      <label for="email">E-mail</label>
      <input type="email" class="email inputEmail" name="email" placeholder="z.B. mustermann@beispiel.de" pattern="[a-z0-9._%+\\-]+@[a-z0-9\\-]+\\.[a-z]{2,}$" title="Ungültige E-Mail-Adresse">

      <label for="phone">Telefon</label>
      <input type="tel" class="phone inputPhone" name="phone" placeholder="z.B. +491234567890" pattern="\\+?\\d{7,}" title="Ungültige Telefonnummer, bitte geben Sie mindestens 10 Ziffern ein">


      <div class="checkbox-container">
      <input type="checkbox" class="accept-terms" id="dataProtection" name="dataProtection" required>
       Ich akzeptiere die  <a href="#" class="data-link">Datenschutzbestimmungen</a>
      </div>
      
      <input type="submit" class="submitButton" value="Weiter">
      <div class="button-wrapper">
      
      <input type="button" class="backButton" value="❮ Zurück">
      <input type="button" class="cancelButton" value="✕ Abbrechen">
      
      </div>
    `;

    const checkInputs = () => {
      const name = formContainer.querySelector('.name').value;
      const eltern = formContainer.querySelector('.eltern').value;
      const birthday = formContainer.querySelector('.birthday').value;
      const email = formContainer.querySelector('.email').value;
      const phone = formContainer.querySelector('.phone').value;
    
      // Additional: Check if the checkbox is checked
      const isTermsAccepted = formContainer.querySelector('.accept-terms').checked;
    
      const isEmailOrPhoneValid = email !== '' || phone !== '';
      const isFormValid = name && eltern && birthday && isEmailOrPhoneValid && isTermsAccepted;
    
      const submitButton = formContainer.querySelector('.submitButton');
      if (isFormValid) {
        submitButton.disabled = false;
        submitButton.classList.add('activeButton');
        submitButton.style.cursor = 'pointer';
      } else {
        submitButton.disabled = true;
        submitButton.classList.remove('activeButton');
        submitButton.style.cursor = 'not-allowed';
      }
    };

    formContainer.querySelectorAll('.inputText, .inputEmail, .inputPhone, .inputDate, input[type="checkbox"]').forEach(input => {
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
      const eltern = formContainer.querySelector('.eltern');

      if (
        !name.checkValidity() ||
        !birthday.checkValidity() ||
        !email.checkValidity() ||
        !eltern.checkValidity() ||
        !phone.checkValidity()
      ) {
        name.classList.add('invalid');
        eltern.classList.add('invalid');
        birthday.classList.add('invalid');
        email.classList.add('invalid');
        phone.classList.add('invalid');
        return;
      }
      const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
          buttons.forEach(button => {
              button.disabled = true;
              button.classList.remove('activeButton');
              button.style.opacity = '0.5';
              button.style.cursor = 'not-allowed';
          });

      window.VG_ADMIN.interact({
        type: 'complete',
        payload: {
          name: name.value,
          eltern: eltern.value,
          birthday: birthday.value,
          email: email.value,
          phone: phone.value
        },
      });
    });

    // Handle cancel button click
    formContainer.querySelector('.cancelButton').addEventListener('click', function () {
      window.VG_ADMIN.interact({
        type: 'cancel',
        payload: {}
      });
    });
    
    // Handle cancel button click
    formContainer.querySelector('.backButton').addEventListener('click', function () {
      window.VG_ADMIN.interact({
        type: 'back',
        payload: {}
      });
    });

    element.appendChild(formContainer);
  },
};

export const LinksListExtension = {
  name: 'LinksList',
  type: 'response',
  render: ({ trace, element }) => {
    const linksContainer = document.createElement('div');

    // Add CSS styles to the container
    linksContainer.style.backgroundColor = 'rgb(244, 244, 245)';
    linksContainer.style.padding = '2px 16px 16px 16px';
    linksContainer.style.borderRadius = '8px';
    linksContainer.style.width = 'auto';

    const links = trace.payload.links; // Expecting an array of { id: string, text: string, url: string } objects

    // Adding styles including hover effect
    const style = document.createElement('style');
    style.innerHTML = `
      .link-item {
        display: block;
        margin: 14px 0;
        color: inherit;
        font-weight: 400;
        text-decoration: none !important;
        font-family: inherit;
      }
      .link-item:hover {
        text-decoration: underline !important;
      }
      .link-item.disabled {
        pointer-events: none;
        color: gray;
      }
      .backButton {
        display: block;
        margin: 10px 0;
        padding: 10px;
        background-color: #ccc;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;
      }
      .backButton:hover {
        background-color: #bbb;
      }
      .backButtonSos {
        max-width: 50%;
        margin-top: 1rem !important;
      }
      .backButtonSos.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `;
    document.head.appendChild(style);

    const disableLinksAndButton = () => {
      const linkElements = linksContainer.querySelectorAll('.link-item');
      linkElements.forEach(link => {
        link.classList.add('disabled');
      });

      const backButtonSos = linksContainer.querySelector('.backButtonSos');
      if (backButtonSos) {
        backButtonSos.classList.add('disabled');
      }
    };

    links.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.innerText = link.text;
      linkElement.dataset.id = link.id;
      linkElement.classList.add('link-item');

      linkElement.addEventListener('click', (event) => {
        event.preventDefault();
        
        disableLinksAndButton();

        window.VG_ADMIN.interact({
          type: 'complete',
          payload: { selectedLinkId: link.id },
        });
      });

      linksContainer.appendChild(linkElement);
    });

    // Add the back button
    const backButton = document.createElement('input');
    backButton.type = 'button';
    backButton.value = '❮ Zurück';
    backButton.classList.add('backButton', 'backButtonSos');

    backButton.addEventListener('click', () => {
      console.log('Back button clicked.');
      window.VG_ADMIN.interact({
        type: 'back',
        payload: {}
      });
    });

    linksContainer.appendChild(backButton);

    element.appendChild(linksContainer);
  },
};


export const notfallTermin = {
  name: 'ext_notfallTermin', // Extension name
  render: ({ trace, element }) => {
      // Function to render the form
      console.log(`trace from extension: `, trace)
      const formContainer = document.createElement('form'); // Create a form element dynamically
      formContainer.classList.add('extensionsForm'); // Add a class to the form


      // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
      formContainer.innerHTML = `

    <label for="notfallTermin">Ihre Informationen/Angaben</label>
    <textarea class="textareaField" id="notfallTermin" name="notfallTermin" required placeholder="z.B. Das Ende des Bogendrahts meiner Zahnspange hat sich verbogen und verursacht Irritationen im Mund. Es gibt kleine Verletzungen an meiner Wangeninnenseite"></textarea>
    
    <input type="submit" class="submitButton" value="Weiter">
    
    <div class="button-wrapper">
    <input type="button" class="backButton" value="❮ Zurück">
    <input type="button" class="cancelButton" value="✕ Abbrechen">
    </div>
`;

// Function to check input validity
const checkInput = () => {
  const notfallTermin = formContainer.querySelector('#notfallTermin').value;

  const submitButton = formContainer.querySelector('.submitButton');
  if (notfallTermin.trim() !== '') {
    submitButton.disabled = false;
    submitButton.classList.add('activeButton');
    submitButton.style.cursor = 'pointer';
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('activeButton');
    submitButton.style.cursor = 'not-allowed';
  }
};

// Attach event listeners to inputs to validate in real-time
formContainer.querySelector('#notfallTermin').addEventListener('input', checkInput);

formContainer.addEventListener('submit', function (event) {
  event.preventDefault();
  const notfallTermin = formContainer.querySelector('#notfallTermin');

  if (!notfallTermin.checkValidity()) {
    notfallTermin.classList.add('invalid');
    return;
  }
  const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
          buttons.forEach(button => {
              button.disabled = true;
              button.classList.remove('activeButton');
              button.style.opacity = '0.5';
              button.style.cursor = 'not-allowed';
          });

 window.VG_ADMIN.interact({
    type: 'complete',
    payload: {
      notfallTermin: notfallTermin.value
    },
  });
});

// Handle cancel button click
formContainer.querySelector('.cancelButton').addEventListener('click', function () {
 window.VG_ADMIN.interact({
    type: 'cancel',
    payload: {}
  });
});

// Handle cancel button click
formContainer.querySelector('.backButton').addEventListener('click', function () {
 window.VG_ADMIN.interact({
    type: 'back',
    payload: {}
  });
});

      element.appendChild(formContainer); // Append the form to the specified DOM element
  },
};

export const kostenDetails = {
  name: 'ext_kostenDetails', // Extension name
  render: ({ trace, element }) => {
      // Function to render the form
      console.log(`trace from extension: `, trace)
      const formContainer = document.createElement('form'); // Create a form element dynamically
      formContainer.classList.add('extensionsForm'); // Add a class to the form


      // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
      formContainer.innerHTML = `

    <label for="kostenDetails">Ihre Nachricht</label>
    <textarea class="textareaField" id="kostenDetails" name="kostenDetails" required placeholder="z.B. Deckt meine Versicherung die gesamten Kosten für die kieferorthopädische Nachsorge nach der Behandlung, inklusive der Anpassung und Erneuerung von Retentionsgeräten?"></textarea>
    
    <input type="submit" class="submitButton" value="Weiter">
    
    <div class="button-wrapper">
    <input type="button" class="backButton" value="❮ Zurück">
    <input type="button" class="cancelButton" value="✕ Abbrechen">
    </div>
`;

// Function to check input validity
const checkInput = () => {
  const kostenDetails = formContainer.querySelector('#kostenDetails').value;

  const submitButton = formContainer.querySelector('.submitButton');
  if (kostenDetails.trim() !== '') {
    submitButton.disabled = false;
    submitButton.classList.add('activeButton');
    submitButton.style.cursor = 'pointer';
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('activeButton');
    submitButton.style.cursor = 'not-allowed';
  }
};

// Attach event listeners to inputs to validate in real-time
formContainer.querySelector('#kostenDetails').addEventListener('input', checkInput);

formContainer.addEventListener('submit', function (event) {
  event.preventDefault();
  const kostenDetails = formContainer.querySelector('#kostenDetails');

  if (!kostenDetails.checkValidity()) {
    kostenDetails.classList.add('invalid');
    return;
  }
  const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
          buttons.forEach(button => {
              button.disabled = true;
              button.classList.remove('activeButton');
              button.style.opacity = '0.5';
              button.style.cursor = 'not-allowed';
          });

 window.VG_ADMIN.interact({
    type: 'complete',
    payload: {
      kostenDetails: kostenDetails.value
    },
  });
});

// Handle cancel button click
formContainer.querySelector('.cancelButton').addEventListener('click', function () {
 window.VG_ADMIN.interact({
    type: 'cancel',
    payload: {}
  });
});

// Handle cancel button click
formContainer.querySelector('.backButton').addEventListener('click', function () {
 window.VG_ADMIN.interact({
    type: 'back',
    payload: {}
  });
});

      element.appendChild(formContainer); // Append the form to the specified DOM element
  },
};

export const abrechnungDetails = {
  name: 'ext_abrechnungDetails', // Extension name
  render: ({ trace, element }) => {
      // Function to render the form
      console.log(`trace from extension: `, trace)
      const formContainer = document.createElement('form'); // Create a form element dynamically
      formContainer.classList.add('extensionsForm'); // Add a class to the form


      // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
      formContainer.innerHTML = `

    <label for="abrechnungDetails">Ihre Nachricht</label>
    <textarea class="textareaField" id="abrechnungDetails" name="abrechnungDetails" required placeholder="z.B. Ich möchte gerne eine Übersicht über die bisherigen Zahlungen und die noch offenen Beträge für meine Zahnspangenbehandlung anfordern."></textarea>
    
    <input type="submit" class="submitButton" value="Weiter">
    
    <div class="button-wrapper">
    <input type="button" class="backButton" value="❮ Zurück">
    <input type="button" class="cancelButton" value="✕ Abbrechen">
    </div>
`;

// Function to check input validity
const checkInput = () => {
  const abrechnungDetails = formContainer.querySelector('#abrechnungDetails').value;

  const submitButton = formContainer.querySelector('.submitButton');
  if (abrechnungDetails.trim() !== '') {
    submitButton.disabled = false;
    submitButton.classList.add('activeButton');
    submitButton.style.cursor = 'pointer';
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('activeButton');
    submitButton.style.cursor = 'not-allowed';
  }
};

// Attach event listeners to inputs to validate in real-time
formContainer.querySelector('#abrechnungDetails').addEventListener('input', checkInput);

formContainer.addEventListener('submit', function (event) {
  event.preventDefault();
  const abrechnungDetails = formContainer.querySelector('#abrechnungDetails');

  if (!abrechnungDetails.checkValidity()) {
    abrechnungDetails.classList.add('invalid');
    return;
  }
  const buttons = formContainer.querySelectorAll('.submitButton, .cancelButton, .backButton, .activeButton');
          buttons.forEach(button => {
              button.disabled = true;
              button.classList.remove('activeButton');
              button.style.opacity = '0.5';
              button.style.cursor = 'not-allowed';
          });

 window.VG_ADMIN.interact({
    type: 'complete',
    payload: {
      abrechnungDetails: abrechnungDetails.value
    },
  });
});

// Handle cancel button click
formContainer.querySelector('.cancelButton').addEventListener('click', function () {
 window.VG_ADMIN.interact({
    type: 'cancel',
    payload: {}
  });
});

// Handle cancel button click
formContainer.querySelector('.backButton').addEventListener('click', function () {
 window.VG_ADMIN.interact({
    type: 'back',
    payload: {}
  });
});

      element.appendChild(formContainer); // Append the form to the specified DOM element
  },
};