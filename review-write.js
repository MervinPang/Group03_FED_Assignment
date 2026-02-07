import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_9_syOgIBbLWKCrl7-rk3dCnHdHaz8JY",
    authDomain: "dummy-data-fed-grp03.firebaseapp.com",
    projectId: "dummy-data-fed-grp03",
    appId: "1:76383593814:web:b5cae68d8f44416a7562f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* fixed stall */
const stallId = "tian-tian";

/* elements */
const starBox = document.getElementById("starBox");
const reviewText = document.getElementById("reviewText");
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

/* star images */
const emptyStar = "https://cdn-icons-png.flaticon.com/128/1828/1828970.png";
const filledStar = "https://cdn-icons-png.flaticon.com/128/2107/2107957.png";

let selectedStars = 0;

/* star click */
starBox.querySelectorAll("img").forEach(function (star) {
    star.onclick = function () {
        selectedStars = Number(star.dataset.value);

        /* reset all */
        starBox.querySelectorAll("img").forEach(function (img) {
            img.src = emptyStar;
        });

        /* fill selected */
        for (let i = 0; i < selectedStars; i++) {
            starBox.children[i].src = filledStar;
        }
    };
});

/* cancel */
cancelBtn.onclick = function () {
    window.location.href = "review.html";
};

/* check login */
onAuthStateChanged(auth, function (user) {
    if (!user) {
        window.location.href = "sign-in.html";
        return;
    }
    /* submit review */
    submitBtn.onclick = async function () {
        if (selectedStars === 0) {
            msg.textContent = "Please select a rating.";
            return;
        }

        if (reviewText.value.trim() === "") {
            msg.textContent = "Please write a review.";
            return;
        }

        await addDoc(collection(db, "stalls", stallId, "reviews"), {
            name: user.email,
            stars: selectedStars,
            text: reviewText.value.trim()
        });

        window.location.href = "review-success.html";
    };
});
