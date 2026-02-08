import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_9_syOgIBbLWKCrl7-rk3dCnHdHaz8JY",
    authDomain: "dummy-data-fed-grp03.firebaseapp.com",
    projectId: "dummy-data-fed-grp03",
    appId: "1:76383593814:web:b5cae68d8f44416a7562f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    onAuthStateChanged(auth, async function (user) {
        if (user) {
            // MEMBER -> Firestore
            localStorage.removeItem("guestOrders");
            await import("./order-history.js");
            await import("./member-order-history.js");
        } else {
            // GUEST -> localStorage (must enable cookies)
            var cookiesEnabled = localStorage.getItem("cookiesEnabled");
            if (cookiesEnabled !== "true") {
                window.location.href = "order.html";
                return;
            }
            await import("./order-history.js");
        }
    });
});
