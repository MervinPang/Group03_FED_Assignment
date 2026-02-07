// Display order confirmation details
// Generate and show an order number

document.addEventListener("DOMContentLoaded", function () {
    // Select the element that displays the order number
    var orderNumberEl = document.getElementById("orderNumber");

    // Generate a random 2 digit order number
    var orderNumber = Math.floor(Math.random() * 90) + 10;

    // Display the generated order number on the page
    if (orderNumberEl) {
        orderNumberEl.textContent = orderNumber;
    }
});