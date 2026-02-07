// Record guest cookie consent using localStorage
// Redirect guest to the guest order history page

document.addEventListener("DOMContentLoaded", function () {
    var enableCookiesBtn = document.getElementById("enableCookiesBtn");
    var successMessage = document.getElementById("successMessage");

    // Hide success message on page load
    if (successMessage) {
        successMessage.hidden = true;
    }

    // Enable cookies button click
    if (enableCookiesBtn) {
        enableCookiesBtn.addEventListener("click", function () {

            // Save cookie consent
            localStorage.setItem("cookiesEnabled", "true");

            // Show success message
            if (successMessage) {
                successMessage.hidden = false;
            }

            // Redirect after a short delay
            setTimeout(function () {
                window.location.href = "guest-orders.html";
            }, 1500);
        });
    }
});