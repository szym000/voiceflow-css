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
        .extensionsForm {
             background-color: rgb(244, 244, 245) !important;
             padding: 16px !important;
             border-radius: 8px !important;
        }
        label {
          font-size: 0.9em !important;
          color: #888 !important;
        }
        .textareaField {
          font-family: inherit !important;
          display: block !important;
          width: 284px !important;
          height: 100px !important;
          border-radius: 8px !important;
          padding: 8px !important;
          font-size: 0.9em !important;
          resize: vertical !important;
          border: 1px solid #ccc !important;
          margin-bottom: 10px !important;
        }
        .textareaField:focus, textarea:focus-visible {
          outline: 1px solid #71c9ce !important;
        }
        .textareaField::placeholder {
        font-family: inherit; color: #ccc !important;
        }
        .textareaField:focus::placeholder {
          color: transparent !important;
        }
        .submit-doc {
          width: 100% !important;
          background-color: grey !important;
          color: white !important;
          border: none !important;
          padding: 10px !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          font-size: 15px !important;
          cursor: not-allowed !important;
          opacity: 0.5 !important;
        }
        .cancel-doc, .back-doc {
          width: 100% !important;
          background-color: #64AFB4 !important;
          color: #fff !important;
          font-weight: 600 !important;
          padding: 7px !important;
          border-radius: 8px !important;
          cursor: pointer !important;
          font-size: 15px !important;
          transition: background-color .4s !important;
          border: none !important;
        }

        .active-doc {
          background-color: #64AFB4 !important;
          cursor: pointer !important;
          opacity: 1 !important;
          transition: background-color .4s !important;
        }
        .active-doc:hover, .cancel-doc:hover, .back-doc:hover {
          background-color: #71C9CE !important;
        }
        .button-wrapper {
          margin-top: 10px !important;
            gap: 10px !important;
            display: flex !important;
            justify-content: space-around !important;
            align-items: normal !important;
            width: 100% !important;
        }
      </style>

      <label for="documentDetails">Ihre Informationen/Angaben</label>
      <textarea class="textareaField" id="documentDetails" name="documentDetails" required placeholder="z.B. eine Kopie der Rechnung mit der Nummer 12345"></textarea>
      
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
    const buttons = formContainer.querySelectorAll('.submit-doc, .cancel-doc, .back-doc, .active-doc');
            buttons.forEach(button => {
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
  formContainer.querySelector('.cancel-doc').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'cancel',
      payload: {}
    });
  });

  // Handle cancel button click
  formContainer.querySelector('.back-doc').addEventListener('click', function () {
   window.VG_ADMIN.interact({
      type: 'back',
      payload: {}
    });
  });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
};