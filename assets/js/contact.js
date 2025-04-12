(function () {
    emailjs.init("3j407FgMvhqfynau7");
})();

function validateContactusForm() {
    // Clear previous error messages
    document.getElementById('fullnameError').textContent = '';
    document.getElementById('mobilenumberError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';


    let isValid = true;

    // Regular expression for a number with at least 10 digits
    let numberPattern = /^[0-9]{10,}$/;

    // Regular expression for a valid email address
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Full Name
    let fullname = document.getElementById('fullname').value;
    if (!fullname) {
        document.getElementById('fullnameError').textContent = "Your name is required.";
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullname)) {
        document.getElementById('fullnameError').textContent = "can only contain letters and spaces.";
        isValid = false;
    }

    // Validate mobile Number
    let mobilenumber = document.getElementById('mobilenumber').value;
    if (!mobilenumber) {
        document.getElementById('mobilenumberError').textContent = "Mobile Number is required.";
        isValid = false;
    } else if (!numberPattern.test(mobilenumber)) {
        document.getElementById('mobilenumberError').textContent = "must be a valid number with at least 10 digits.";
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

    // Validate subject
    let subject = document.getElementById('subject').value;
    if (!subject) {
        document.getElementById('subjectError').textContent = "Your subject is required.";
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(subject)) {
        document.getElementById('subjectError').textContent = "can only contain letters and spaces.";
        isValid = false;
    }

    // Validate message 
    let message = document.getElementById('message').value;
    if (!message) {
        document.getElementById('messageError').textContent = "Message is required.";
        isValid = false;
    }

    if (isValid) {
        //Send email via Emailjs
        let templateParams = {
            from_name: fullname,
            email: email,
            mobile: mobilenumber,
            subject: subject,
            message: message,
        };

        emailjs.send("service_4dbwkue", "template_nwz49bg", templateParams)
            .then((response) => {
                // alert('Email sent successfully!', response.status, response.text);
                // Reset the form
                document.getElementById('contactusForm').reset();
            }, (error) => {
                alert('Failed to send email. Please try again later.', error);
            });
    }
}