import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

// get elements
var pUsername = document.getElementById("pUsername");
var pEmail = document.getElementById("pEmail");
var pRole = document.getElementById("pRole");

var langSelect = document.getElementById("langSelect");
var togFeedback = document.getElementById("togFeedback");
var togOrder = document.getElementById("togOrder");

var saveBtn = document.getElementById("saveBtn");
var logoutBtn = document.getElementById("logoutBtn");

// load from local storage
function loadSettings() {
  var savedLang = localStorage.getItem("lang") || "English";
  var savedFb = localStorage.getItem("fb") === "1";
  var savedOd = localStorage.getItem("od") === "1";

  langSelect.value = savedLang;
  togFeedback.checked = savedFb;
  togOrder.checked = savedOd;
}

loadSettings();

// save settings
saveBtn.onclick = function () {
  localStorage.setItem("lang", langSelect.value);
  localStorage.setItem("fb", togFeedback.checked ? "1" : "0");
  localStorage.setItem("od", togOrder.checked ? "1" : "0");

  alert("Saved!");
};

// check if user is logged in and load profile info
onAuthStateChanged(auth, async function (user) {
  if (!user) {
    window.location.href = "sign-in.html";
    return;
  }

  // show email from firebase 
  pEmail.textContent = user.email || "No email";

  // get username and role from firestore
  var snap = await getDoc(doc(db, "users", user.uid));
  var data = snap.exists() ? snap.data() : {};

  pUsername.textContent = data.username || "User";
  pRole.value = data.role || "customer";
});

// sign out button
logoutBtn.onclick = async function () {
  await signOut(auth);
  window.location.href = "index.html";
};
