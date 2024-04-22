export const documentDetails = {
    name: 'ext_documentDetails', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm'); // Add a class to the form


        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `
        <style>
        
      </style>

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






export const patientDataForm = {
    name: 'ext_patientDataForm',
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically
        formContainer.classList.add('extensionsForm');
  
      formContainer.innerHTML = `
        <style>
          .inputText, .inputEmail, .inputPhone, .inputDate {
            font-family: inherit !important;
            width: 284px !important;
            border: 1px solid #ccc !important;
            background: #fff !important;
            margin: 5px 0 10px 0 !important;
            outline: none !important;
            height: 20px !important;
            padding: 16px !important;
            border-radius: 6px !important;
            display: block !important;
          }
          .inputText:focus, .inputEmail:focus, .inputPhone:focus, .inputDate:focus {
            border: 1px solid #71c9ce !important;
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
            background-color: #64AFB4 !important;
            border-color: #64AFB4 !important;
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
            color: #64AFB4 !important;
            text-decoration: none !important;
          }
          
          .data-link:hover {
            text-decoration: underline !important;
          }
          
        </style>
  
        <label for="name">Name</label>
        <input type="text" class="name inputText" name="name" required placeholder="z.B. Max Mustermann">
  
        <label for="birthday">Geburtstag</label>
        <input type="date" class="birthday inputDate" name="birthday" required>
  
        <label for="email">E-mail</label>
        <input type="email" class="email inputEmail" name="email" placeholder="z.B. mustermann@beispiel.de" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Ungültige E-Mail-Adresse">
  
        <label for="phone">Telefon</label>
        <input type="tel" class="phone inputPhone" name="phone" placeholder="z.B. +491234567890" pattern="\+?\d{7,}" title="Ungültige Telefonnummer, bitte geben Sie mindestens 10 Ziffern ein">
  
        <label for="dataProtection" class="checkbox-container">
        <input type="checkbox" class="accept-terms" id="dataProtection" name="dataProtection" required>
         Ich akzeptiere die  <a href="#" class="data-link">Datenschutzbestimmungen</a>
        </label>
        
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
    },
  };