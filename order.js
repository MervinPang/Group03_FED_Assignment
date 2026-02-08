// Record guest cookie consent using localStorage
// Redirect guest to the guest order history page

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

    onAuthStateChanged(auth, function (user) {
        if (user) {
            window.location.href = "order-history.html";
        }
    });

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
                window.location.href = "order-history.html";
            }, 1500);
        });
    }
});