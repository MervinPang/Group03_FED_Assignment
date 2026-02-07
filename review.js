import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_9_syOgIBbLWKCrl7-rk3dCnHdHaz8JY",
    authDomain: "dummy-data-fed-grp03.firebaseapp.com",
    projectId: "dummy-data-fed-grp03",
    appId: "1:76383593814:web:b5cae68d8f44416a7562f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* this page is for tian-tian */
const stallId = "tian-tian";

/* where reviews will appear */
const reviewList = document.getElementById("reviewList");

/* load reviews */
async function loadReviews() {
    /* clear existing content */
    reviewList.innerHTML = "";

    // stalls to tian-tian to reviews
    const ref = collection(db, "stalls", stallId, "reviews");
    // get all reviews
    const snap = await getDocs(ref);

    if (snap.empty) {
        reviewList.innerHTML = "<p>No reviews yet.</p>";
        return;
    }

    // loop through reviews
    snap.forEach(function (doc) {
        // get reviews from firebase
        const data = doc.data();

        // if the values are missing this is the default
        const name = data.name || "User";
        const stars = data.stars || 0;
        const text = data.text || "";

        // create review card
        const card = document.createElement("div");
        card.className = "review-card";

        // insert review content
        card.innerHTML =
            "<div class='review-name'>" + name + "</div>" +
            "<div class='review-stars'>Rating: " + stars + "</div>" +
            "<div class='review-text'>" + text + "</div>";

        reviewList.appendChild(card);
    });
}

loadReviews();
