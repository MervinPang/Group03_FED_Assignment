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

    // Order summary elements (from checkout.html)
    var summaryItemsEl = document.getElementById("summaryItems");
    var summarySubtotalEl = document.getElementById("summarySubtotal");
    var summaryTotalEl = document.getElementById("summaryTotal");

    // PayNow or Credit Card
    var selectedMethod = "";

    // Store the calculated total here (so Pay button can show correct amount)
    var currentTotal = 0;

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
            paymentMethod: selectedMethod,
            total: currentTotal
        };

        // Convert object to JSON string before storing
        localStorage.setItem("checkoutInfo", JSON.stringify(checkoutInfo));
    }

    function getCartFromStorage() {
        var raw = localStorage.getItem("cart");
        if (!raw) return [];

        try {
            var parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    // Order summary rendering

    function clearSummary() {
        if (summaryItemsEl) {
            summaryItemsEl.innerHTML = "";
        }
    }

    function renderOneItem(item) {
        // item expected to have: name, price, qty, img (img optional)

        var row = document.createElement("div");
        row.className = "item";

        var left = document.createElement("div");
        left.className = "summary-left";

        var img = document.createElement("img");
        img.className = "image";
        img.src = item.img ? item.img : "images/HawkerHubSG Logo.png";
        img.alt = item.name;

        var text = document.createElement("div");
        text.className = "text";

        var nameEl = document.createElement("p");
        nameEl.className = "food-name";
        nameEl.textContent = item.name;

        var qtyEl = document.createElement("p");
        qtyEl.className = "quantity";
        qtyEl.textContent = "Quantity: " + item.qty;

        text.appendChild(nameEl);
        text.appendChild(qtyEl);

        left.appendChild(img);
        left.appendChild(text);

        var priceEl = document.createElement("p");
        priceEl.className = "price";
        priceEl.textContent = "$" + (Number(item.price) * Number(item.qty)).toFixed(2);

        row.appendChild(left);
        row.appendChild(priceEl);

        return row;
    }

    function renderCheckoutSummary() {
        var cart = getCartFromStorage();
        clearSummary();

        var subtotal = 0;

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].items && Array.isArray(cart[i].items)) {
                // Nested cart
                for (var j = 0; j < cart[i].items.length; j++) {
                    var it = cart[i].items[j];
                    subtotal += Number(it.price) * Number(it.qty);

                    if (summaryItemsEl) {
                        summaryItemsEl.appendChild(renderOneItem(it));
                    }
                }
            } else {
                // Flat cart
                var it2 = cart[i];
                subtotal += Number(it2.price) * Number(it2.qty);

                if (summaryItemsEl) {
                    summaryItemsEl.appendChild(renderOneItem(it2));
                }
            }
        }

        var takeawayFee = 0;

        // Change this key to match YOUR project
        // Example keys you might already be using: "orderType", "takeaway", "isTakeaway"
        var orderType = localStorage.getItem("orderType"); // expected "takeaway" or "dinein"

        if (orderType === "takeaway") {
            takeawayFee = 0.50;
        }

        currentTotal = subtotal + takeawayFee;

        // Update subtotal + total
        if (summarySubtotalEl) summarySubtotalEl.textContent = "$" + subtotal.toFixed(2);
        if (summaryTotalEl) summaryTotalEl.textContent = "$" + currentTotal.toFixed(2);

        // Update Pay button text
        if (payBtn) payBtn.textContent = "Pay $" + currentTotal.toFixed(2);
    }

    // Run summary rendering once on page load
    renderCheckoutSummary();

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