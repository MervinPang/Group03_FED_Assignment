// Generate an order number 2 digits
// Read cart + checkout info from localStorage
// Save a new order into localStorage("orders")
// Clear cart after saving (so it doesn't duplicate)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_9_syOgIBbLWKCrl7-rk3dCnHdHaz8JY",
    authDomain: "dummy-data-fed-grp03.firebaseapp.com",
    projectId: "dummy-data-fed-grp03",
    appId: "1:76383593814:web:b5cae68d8f44416a7562f7"
};

// Initialize Firebase + DB
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {

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
        var raw = localStorage.getItem("guestOrders");
        if (!raw) return [];
        try {
            var parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    function saveOrderToFirestore(uid, order) {
        // Saves to (users/{uid}/orders) (subcollection)
        return addDoc(collection(db, "users", uid, "orders"), order);
    }

    // Save updated orders array back to localStorage
    function saveOrders(orders) {
        localStorage.setItem("guestOrders", JSON.stringify(orders));
    }

    // Format date as dd/mm/yyyy
    function formatDate(d) {
        var dd = String(d.getDate()).padStart(2, "0");
        var mm = String(d.getMonth() + 1).padStart(2, "0");
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
    }

    function calculateTakeawayFee(cart) {
        var fee = 0;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].packaging === "takeaway") {
                fee += 0.50;
            }
        }
        return fee;
    }

    // Calculate subtotal, total and item count
    function calcTotalsAndItems(cart) {
        var subtotal = 0;
        var itemsCount = 0;
        var items = [];

        // Loop through each shop in cart
        for (var i = 0; i < cart.length; i++) {
            var shop = cart[i];

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

        var takeawayFee = calculateTakeawayFee(cart);

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

    // Generate order number once (prevents change on refresh)
    var savedOrderNo = localStorage.getItem("latestOrderNumber");

    if (!savedOrderNo) {
        savedOrderNo = String(Math.floor(Math.random() * 90) + 10);
        localStorage.setItem("latestOrderNumber", savedOrderNo);
    }

    // Display order number
    if (orderNumberEl) {
        orderNumberEl.textContent = savedOrderNo;
    }

    // Prevent duplicate save on refresh
    var lastSaved = localStorage.getItem("lastSavedOrderNumber");
    if (lastSaved === savedOrderNo) {
        return;
    }

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

    // Also save to firestore (if logged in)
    onAuthStateChanged(auth, function (user) {
        if (!user) return; // Guest does nothing

        saveOrderToFirestore(user.uid, newOrder)
            .then(function () {
                console.log("Order saved to Firestore");
            })
            .catch(function (error) {
                console.log("Firestore save failed:", error);
            });
    });

    // Mark this order as saved
    localStorage.setItem("lastSavedOrderNumber", savedOrderNo);
    localStorage.removeItem("latestOrderNumber");

    // Clear cart after successful order
    localStorage.setItem("cart", JSON.stringify([]));
});