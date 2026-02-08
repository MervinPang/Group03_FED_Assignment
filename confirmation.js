// Generate an order number 2 digits
// Read cart + checkout info from localStorage
// Save a new order into localStorage("orders")
// Clear cart after saving (so it doesn't duplicate)

document.addEventListener("DOMContentLoaded", function () {

    // Allow order history to be viewed
    localStorage.setItem("cookiesEnabled", "true");

    // Reference to the order number element on the page
    var orderNumberEl = document.getElementById("orderNumber");

    // Get cart from local storage
    function getCart() {
        var raw = localStorage.getItem("cart");

        // If cart does not exist, return empty array
        if (!raw) return [];
        try {
            var parsed = JSON.parse(raw);

            // Ensure parsed data is an array
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            // If JSON is invalid, return empty array
            return [];
        }
    }

    // Get checkout info
    function getCheckoutInfo() {
        var raw = localStorage.getItem("checkoutInfo");
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    // Get all saved orders
    function getOrders() {
        var raw = localStorage.getItem("orders");
        if (!raw) return [];
        try {
            var parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    // Save updated orders array back to localStorage
    function saveOrders(orders) {
        localStorage.setItem("orders", JSON.stringify(orders));
    }

    // Format date as dd/mm/yyyy
    function formatDate(d) {
        var dd = String(d.getDate()).padStart(2, "0");
        var mm = String(d.getMonth() + 1).padStart(2, "0");
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
    }

    // Calculate subtotal, total and item count
    function calcTotalsAndItems(cart) {
        var subtotal = 0;
        var itemsCount = 0;
        var items = [];
        var takeawayFee = 0;

        // Loop through each shop in cart
        for (var i = 0; i < cart.length; i++) {
            var shop = cart[i];

            if (shop.packaging === "takeaway") {
                takeawayFee += 0.50;
            }

            // Loop through items in each shop
            for (var j = 0; j < shop.items.length; j++) {
                var it = shop.items[j];
                subtotal += Number(it.price) * Number(it.qty);
                itemsCount += Number(it.qty);

                // Store item details for order details page
                items.push({
                    name: it.name,
                    qty: it.qty,
                    price: Number(it.price)
                });
            }
        }

        return {
            items: items,
            itemsCount: itemsCount,
            subtotal: subtotal,
            takeawayFee: takeawayFee,
            total: subtotal + takeawayFee
        };
    }

    // If cart is empty, do nothing (prevents duplicates on refresh)
    var cart = getCart();
    if (cart.length === 0) {
        return;
    }

    // Generate 2-digit order number (10–99) every successful checkout
    var savedOrderNo = String(Math.floor(Math.random() * 90) + 10);

    // Display order number on page
    if (orderNumberEl) {
        orderNumberEl.textContent = savedOrderNo;
    }

    // Build new order from cart data
    var cart = getCart();

    // If cart is empty, do nothing
    if (cart.length === 0) {
        return;
    }

    var totals = calcTotalsAndItems(cart);
    var checkoutInfo = getCheckoutInfo();

    var newOrder = {
        orderId: savedOrderNo,
        date: formatDate(new Date()),
        status: "Confirmed",
        prepTime: "15-20 mins",
        itemsCount: totals.itemsCount,
        items: totals.items,
        subtotal: totals.subtotal,
        takeawayFee: totals.takeawayFee,
        total: totals.total,
        customerName: checkoutInfo ? checkoutInfo.name : ""
    };

    // Save order into localStorage
    var orders = getOrders();
    orders.unshift(newOrder); // Latest order appears first
    saveOrders(orders);

    // Mark this order as saved
    localStorage.setItem("lastSavedOrderNumber", savedOrderNo);

    // Clear cart after successful order
    localStorage.setItem("cart", JSON.stringify([]));
});