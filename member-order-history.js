import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

async function loadMemberOrders() {
    const user = auth.currentUser;
    if (!user) return;

    // Structure (users/{uid}/orders/{orderDoc})
    const ordersRef = collection(db, "users", user.uid, "orders");
    const snap = await getDocs(ordersRef);

    const orders = snap.docs.map(doc => doc.data());

    // order-history.js must set: window.renderOrdersFromData = renderOrdersFromData;
    if (window.renderOrdersFromData) {
        window.renderOrdersFromData(orders);
    }
}

loadMemberOrders();
