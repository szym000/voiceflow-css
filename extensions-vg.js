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
          Button
  
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
        <input type="email" class="email" name="email" placeholder="z.B. mustermann@beispiel.de" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Ungültige E-Mail-Adresse">
  
        <label for="phone">Telefon</label>
        <input type="tel" class="phone" name="phone" placeholder="z.B. +491234567890" pattern="\+?\d{7,}" title="Ungültige Telefonnummer, bitte geben Sie mindestens 10 Ziffern ein">
  
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