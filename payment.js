// Display QR payment page
// Allow user to manually confirm payment
// Automatically proceed to confirmation page after a short delay

document.addEventListener("DOMContentLoaded", function () {
    // Select the Once paid confirmation button
    var paidBtn = document.getElementById("paidBtn");

    // Automatically redirect to confirmation page after a few seconds
    var autoRedirect = setTimeout(function () {
        window.location.href = "confirmation.html";
    }, 5000); // 5 seconds delay

    // If user clicks the button, proceed immediately
    if (paidBtn) {
        paidBtn.addEventListener("click", function () {

            // Stop auto redirect if user clicks manually
            clearTimeout(autoRedirect);

            // Proceed to confirmation page
            window.location.href = "confirmation.html";
        });
    }
});