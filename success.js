import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_9_syOgIBbLWKCrl7-rk3dCnHdHaz8JY",
  authDomain: "dummy-data-fed-grp03.firebaseapp.com",
  projectId: "dummy-data-fed-grp03",
  appId: "1:76383593814:web:b5cae68d8f44416a7562f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// continue button
const continueBtn = document.getElementById("continueBtn");

// check login and role
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "sign-in.html";
    return;
  }

  // get user data from firebase
  const snap = await getDoc(doc(db, "users", user.uid));
  const data = snap.exists() ? snap.data() : {};
  // if there is no nea or vendor user type become customer
  const role = data.role || "customer";

  // button redirect based on role
  continueBtn.onclick = () => {
    if (role === "nea") {
      window.location.href = "nea-dashboard.html";
    } else if (role === "vendor") {
      window.location.href = "vendor-dashboard.html";
    } else {
      window.location.href = "profile.html";
    }
  };
});