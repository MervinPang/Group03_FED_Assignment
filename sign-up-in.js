import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_9_syOgIBbLWKCrl7-rk3dCnHdHaz8JY",
  authDomain: "dummy-data-fed-grp03.firebaseapp.com",
  projectId: "dummy-data-fed-grp03",
  appId: "1:76383593814:web:b5cae68d8f44416a7562f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* sign in (only in sign-in.html) */
const signInBtn = document.getElementById("signInBtn");
if (signInBtn) {
  signInBtn.onclick = async () => {
    const msg = document.getElementById("signInMsg");
    msg.textContent = "";

    const email = document.getElementById("inEmail").value.trim();
    const password = document.getElementById("inPw").value;

    if (!email || !password) {
      msg.textContent = "Please enter email and password.";
      return;
    }

    try {
      // sign in user
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // get user document from firestore
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      const data = snap.exists() ? snap.data() : {};

      const role = data.role || "customer";

      // redirect based on role
      if (role === "nea") {
        window.location.href = "nea-dashboard.html";
      } else if (role === "vendor") {
        window.location.href = "vendor-dashboard.html";
      } else {
        window.location.href = "profile.html";
      }

    } catch (err) {
      msg.textContent = err.message;
    }
  };
}

/* guest button (only in sign-in.html) */
const guestBtn = document.getElementById("guestBtn");
if (guestBtn) {
  guestBtn.onclick = () => {
    window.location.href = "index.html";
  };
}

/* sign up (only in sign-up.html) */
const signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {
  signUpBtn.onclick = async () => {
    const msg = document.getElementById("signUpMsg");
    msg.textContent = "";

    const username = document.getElementById("upUser").value.trim();
    const email = document.getElementById("upEmail").value.trim();
    const password = document.getElementById("upPw").value;
    const role = document.getElementById("upRole").value;

    if (!username || !email || !password) {
      msg.textContent = "Please fill in all fields.";
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        username,
        role,
        verified: role === "customer"
      });

      if (role === "customer") {
        window.location.href = "profile.html";
      } else {
        window.location.href = "verify.html";
      }
    } catch (err) {
      msg.textContent = err.message;
    }
  };
}
