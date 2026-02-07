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

// get the button
var vBtn = document.getElementById("vBtn");

// make sure user is logged in
onAuthStateChanged(auth, function (user) {
  if (!user) {
    window.location.href = "sign-in.html";
    return;
  }

  // button goes to success page
  vBtn.onclick = function () {
    window.location.href = "success.html";
  };
});
