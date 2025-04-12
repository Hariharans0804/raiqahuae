(function () {
    emailjs.init("3j407FgMvhqfynau7");
})();

function validateEnquiryForm() {
    // Clear previous error messages
    document.getElementById('dateError').textContent = '';
    document.getElementById('fullnameError').textContent = '';
    document.getElementById('fulladdressError').textContent = '';
    document.getElementById('jobsitenumberError').textContent = '';
    document.getElementById('phonenumberError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('checkboxError').textContent = '';
    document.getElementById('notesError').textContent = '';

    let isValid = true;

    // Regular expression for a number with at least 10 digits
    let numberPattern = /^[0-9]{10,}$/;

    // Regular expression for a valid email address
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Date
    let date = document.getElementById('date').value;
    if (!date) {
        document.getElementById('dateError').textContent = "Date is required.";
        isValid = false;
    }

    // Validate Full Name
    let fullname = document.getElementById('fullname').value;
    if (!fullname) {
        document.getElementById('fullnameError').textContent = "Full name is required.";
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullname)) {
        document.getElementById('fullnameError').textContent = "Full name can only contain letters and spaces.";
        isValid = false;
    }

    // Validate Full Address
    let address = document.getElementById('fulladdress').value;
    if (!address) {
        document.getElementById('fulladdressError').textContent = "Full address is required.";
        isValid = false;
    }

    // Validate Jobsite Number
    let jobsitenumber = document.getElementById('jobsitenumber').value;
    if (!jobsitenumber) {
        document.getElementById('jobsitenumberError').textContent = "Jobsite Number is required.";
        isValid = false;
    } else if (!numberPattern.test(jobsitenumber)) {
        document.getElementById('jobsitenumberError').textContent = "Input must be a valid number with at least 10 digits.";
        isValid = false;
    }

    // Validate phone Number
    let phonenumber = document.getElementById('phonenumber').value;
    if (!phonenumber) {
        document.getElementById('phonenumberError').textContent = "Phone Number is required.";
        isValid = false;
    } else if (!numberPattern.test(phonenumber)) {
        document.getElementById('phonenumberError').textContent = "Input must be a valid number with at least 10 digits.";
        isValid = false;
    }

    // Validate Email
    let email = document.getElementById('email').value;
    if (!email) {
        document.getElementById('emailError').textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Invalid email address.";
        isValid = false;
    }

    // Validate Checkboxes
    const checkboxes = document.querySelectorAll('input[name="checkbox"]:checked');
    if (checkboxes.length === 0) {
        document.getElementById('checkboxError').textContent = "Please select at least one option.";
        isValid = false;
    }

    // Validate Notes 
    let notes = document.getElementById('notes').value;
    if (!notes) {
        document.getElementById('notesError').textContent = "Notes is required.";
        isValid = false;
    }


    if (isValid) {
        //Send email via Emailjs
        let templateParams = {
            from_name: fullname,
            full_address: address,
            jobsite_number: jobsitenumber,
            phone_number: phonenumber,
            from_email: email,
            services: Array.from(checkboxes).map(cb => cb.value).join(', '),
            notes: notes,
        };

        emailjs.send("service_vwbccbs", "template_y74y5wa", templateParams)
            .then((response) => {
                // alert('Email sent successfully!', response.status, response.text);
                // Reset the form
                document.getElementById('enquiryForm').reset();
            }, (error) => {
                alert('Failed to send email. Please try again later.', error);
            });
    }
}