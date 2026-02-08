import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_9_syOgIBbLWKCrl7-rk3dCnHdHaz8JY",
    authDomain: "dummy-data-fed-grp03.firebaseapp.com",
    projectId: "dummy-data-fed-grp03",
    appId: "1:76383593814:web:b5cae68d8f44416a7562f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Run logic after the page has fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Check authentication state (member vs guest)
    onAuthStateChanged(auth, async function (user) {
        if (!user) {
            // Not logged in will fallback to guest page
            window.location.href = "order.html";
            return;
        }

        // Reference to the logged-in user's orders subcollection in Firestore
        var ordersRef = collection(db, "users", user.uid, "orders");

        // Fetch all orders belonging to the logged-in user
        var snap = await getDocs(ordersRef);
    
        // Convert Firestore documents into a plain JavaScript array
        var orders = [];
        snap.forEach(function (docSnap) {
            orders.push(docSnap.data());
        });

        // Use your shared renderer from order-history.js
        // Allowing same UI for guest and members
        if (window.renderOrdersFromData) {
            window.renderOrdersFromData(orders);
        }
    });
});