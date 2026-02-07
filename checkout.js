// Allow users to select a payment method (PayNow / Credit Card)
// Disable Pay button until a method is chosen
// Validate required user inputs (name and phone)
// Save checkout details in localStorage (JSON)
// Redirect user to payment page

document.addEventListener("DOMContentLoaded", function () {

    // Select payment method buttons (NodeList)
    var paymentButtons = document.querySelectorAll(".payment-button");

    // Select Pay button and error message element
    var payBtn = document.getElementById("payBtn");
    var paymentError = document.getElementById("paymentError");

    // Select user input fields
    var custName = document.getElementById("custName");
    var custPhone = document.getElementById("custPhone");
    var instructions = document.getElementById("instructions");

    // PayNow or Credit Card
    var selectedMethod = "";

    // Pay button disabled until payment method selected
    payBtn.disabled = true;

    // Hide payment error message on page load
    if (paymentError) {
        paymentError.hidden = true;
    }

    // Hide payment error
    function clearPaymentError() {
        if (paymentError) {
            paymentError.hidden = true;
        }
    }

    // Show payment error
    function showPaymentError() {
        if (paymentError) {
            paymentError.hidden = false;
        }
    }

    // Set only one payment button as active
    function setActivePaymentButton(clickedBtn) {
        // Remove active from all buttons
        for (var i = 0; i < paymentButtons.length; i++) {
            paymentButtons[i].classList.remove("active");
        }
        // Add active to selected button
        clickedBtn.classList.add("active");
    }

    // Validate customer name
    function isValidName(name) {
        return name.trim().length >= 2;
    }

    // Validate phone number
    function isValidPhone(phone) {
        return /^\d{8}$/.test(phone.trim());
    }

    // Save basic checkout info to localStorage as JSON string
    function saveCheckoutInfo() {
        var checkoutInfo = {
            name: custName ? custName.value.trim() : "",
            phone: custPhone ? custPhone.value.trim() : "",
            instructions: instructions ? instructions.value.trim() : "",
            paymentMethod: selectedMethod
        };

        // Convert object to JSON string before storing
        localStorage.setItem("checkoutInfo", JSON.stringify(checkoutInfo));
    }

    // Payment Method Selection
    for (var j = 0; j < paymentButtons.length; j++) {
        paymentButtons[j].addEventListener("click", function () {

            // Highlight selected button
            setActivePaymentButton(this);

            // Read method from data-method attribute
            selectedMethod = this.getAttribute("data-method");

            // Enable Pay button once user selected
            payBtn.disabled = false;

            // Clear any payment method error message
            clearPaymentError();
        });
    }

    // Pay Button Click
    payBtn.addEventListener("click", function () {

        // Ensure select payment method
        if (!selectedMethod) {
            showPaymentError();
            return;
        }

        // Validate required fields (Name + Phone)
        if (custName && !isValidName(custName.value)) {
            alert("Please enter your name (at least 2 characters).");
            custName.focus();
            return;
        }

        if (custPhone && !isValidPhone(custPhone.value)) {
            alert("Please enter a valid 8-digit phone number.");
            custPhone.focus();
            return;
        }

        // Save checkout info
        saveCheckoutInfo();

        // Redirect to payment page
        window.location.href = "payment.html";
    });
});