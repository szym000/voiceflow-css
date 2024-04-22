export const documentDetails = {
    name: 'ext_documentDetails', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically

        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
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