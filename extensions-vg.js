export const documentDetails = {
    name: 'ext_documentDetails', // Extension name
    render: ({ trace, element }) => {
        // Function to render the form
        console.log(`trace from extension: `, trace)
        const formContainer = document.createElement('form'); // Create a form element dynamically

        // Set the inner HTML of the form, simplifying it to only include input fields and a submit button
        formContainer.innerHTML = `
<label for="name">Name:</label>
<input type="text" class="name" name="name"><br><br>
<label for="email">Email:</label>
<input type="email" class="email" name="email"><br><br>
<label for="phone">Phone Number:</label>
<input type="tel" class="phone" name="phone"><br><br>
<input type="submit" class="submit" value="Submit">
`;

        // Attach an event listener to the form for handling the submit event
        formContainer.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission behavior
            // Extract values from the form fields
            const name = formContainer.querySelector('.name').value;
            const email = formContainer.querySelector('.email').value;
            const phone = formContainer.querySelector('.phone').value;
            // Simplify the logic: Remove the submit button after submission without validation checks
            formContainer.querySelector('.submit').remove();
            // Programmatically submit the form data
            window.VG_ADMIN.interact({ type: 'complete', payload: { name, email, phone } });
        });

        element.appendChild(formContainer); // Append the form to the specified DOM element
    },
};