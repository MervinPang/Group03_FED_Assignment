// Read selected order from localStorage
// Fill in order details (number, prep time, items, totals)
// Update the status timeline based on order status

document.addEventListener("DOMContentLoaded", function () {

    // Page elements
    var orderNumberEl = document.getElementById("orderNumber");
    var prepTimeEl = document.getElementById("prepTime");
    var statusMessageEl = document.getElementById("statusMessage");

    var itemsListEl = document.getElementById("itemsList");
    var subtotalEl = document.getElementById("subtotal");
    var takeawayFeeEl = document.getElementById("takeawayFee");
    var totalEl = document.getElementById("total");

    // Timeline elements
    var steps = document.querySelectorAll(".step");
    var lines = document.querySelectorAll(".line");

    // Get selected order from localStorage
    var raw = localStorage.getItem("selectedOrder");

    if (!raw) {
        // If no selected order found, go back to order history
        window.location.href = "order-history.html";
        return;
    }

    var order = null;

    try {
        order = JSON.parse(raw);
    } catch (e) {
        window.location.href = "order-history.html";
        return;
    }

    // ----------------------------
    // Fill basic order information
    // ----------------------------
    if (orderNumberEl) {
        orderNumberEl.textContent = (order.orderId !== undefined) ? order.orderId : "-";
    }

    if (prepTimeEl) {
        // Default prep time if not provided
        prepTimeEl.textContent = order.prepTime ? order.prepTime : "N/A";
    }

    // ----------------------------
    // Fill items list
    // Expected order.items: [{ name, qty, price }, ...]
    // ----------------------------
    if (itemsListEl) {
        itemsListEl.innerHTML = "";

        if (order.items && Array.isArray(order.items) && order.items.length > 0) {
            for (var i = 0; i < order.items.length; i++) {
                var item = order.items[i];

                var row = document.createElement("div");
                row.className = "item-row";

                var nameEl = document.createElement("p");
                nameEl.className = "item-name";

                var qty = (item.qty !== undefined) ? item.qty : 1;
                var itemName = item.name ? item.name : "Item";

                nameEl.textContent = qty + "x " + itemName;

                var priceEl = document.createElement("p");
                priceEl.className = "item-price";

                var price = (item.price !== undefined) ? Number(item.price) : 0;
                priceEl.textContent = "$" + price.toFixed(2);

                row.appendChild(nameEl);
                row.appendChild(priceEl);
                itemsListEl.appendChild(row);
            }
        }
    }

    // ----------------------------
    // Fill totals
    // ----------------------------
    if (subtotalEl) {
        var sub = (order.subtotal !== undefined) ? Number(order.subtotal) : 0;
        subtotalEl.textContent = "$" + sub.toFixed(2);
    }

    if (takeawayFeeEl) {
        var fee = (order.takeawayFee !== undefined) ? Number(order.takeawayFee) : 0;
        takeawayFeeEl.textContent = "$" + fee.toFixed(2);
    }

    if (totalEl) {
        var tot = (order.total !== undefined) ? Number(order.total) : 0;
        totalEl.textContent = "$" + tot.toFixed(2);
    }

    // ----------------------------
    // Update status message + timeline
    // Status suggestion:
    // "pending", "confirmed", "preparing", "ready", "completed"
    // ----------------------------
    var status = order.status ? String(order.status).toLowerCase() : "confirmed";

    // Status messages (simple)
    var message = "Order confirmed! Waiting to be prepared.";

    if (status === "pending") {
        message = "Order placed. Waiting for confirmation.";
    } else if (status === "confirmed") {
        message = "Order confirmed! Waiting to be prepared.";
    } else if (status === "preparing") {
        message = "Your order is being prepared.";
    } else if (status === "ready") {
        message = "Your order is ready for collection.";
    } else if (status === "completed") {
        message = "Order completed! Thank you for your purchase.";
    }

    if (statusMessageEl) {
        statusMessageEl.textContent = message;
    }

    // Timeline mapping:
    // step index: 0 Pending, 1 Confirmed, 2 Preparing, 3 Ready, 4 Completed
    var currentIndex = 1;

    if (status === "pending") currentIndex = 0;
    if (status === "confirmed") currentIndex = 1;
    if (status === "preparing") currentIndex = 2;
    if (status === "ready") currentIndex = 3;
    if (status === "completed") currentIndex = 4;

    // Reset steps and lines
    for (var s = 0; s < steps.length; s++) {
        steps[s].classList.remove("done");
        steps[s].classList.remove("current");
    }

    for (var l = 0; l < lines.length; l++) {
        lines[l].classList.remove("done");
    }

    // Mark completed steps as done
    for (var d = 0; d < currentIndex; d++) {
        if (steps[d]) {
            steps[d].classList.add("done");
        }
        if (lines[d]) {
            lines[d].classList.add("done");
        }
    }

    // Mark current step
    if (steps[currentIndex]) {
        steps[currentIndex].classList.add("current");
    }

    // If completed, mark all as done (including last step)
    if (status === "completed") {
        for (var x = 0; x < steps.length; x++) {
            steps[x].classList.remove("current");
            steps[x].classList.add("done");
        }
        for (var y = 0; y < lines.length; y++) {
            lines[y].classList.add("done");
        }
    }
});