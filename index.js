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

// get elements
var trendingRow = document.getElementById("trendingRow");
var allRow = document.getElementById("allRow");
var searchInput = document.getElementById("searchInput");
var pills = document.getElementsByClassName("pill");

// default page state (first thing you see)
var stalls = [];
var selectedCuisine = "all";
var searchText = "";

// load stalls from firebase
async function loadStalls() {
  stalls = [];

  // get all values from stalls
  var snapshot = await getDocs(collection(db, "stalls"));

  snapshot.forEach(function (docItem) {
    stalls.push(docItem.data());
  });

  showStalls();
}

// show the stalls on page
function showStalls() {
  trendingRow.innerHTML = "";
  allRow.innerHTML = "";

  for (var i = 0; i < stalls.length; i++) {
    var stall = stalls[i];

    // make sure the fields exist (so it won't crash)
    var stallName = (stall.name || "").toLowerCase();
    var stallCuisine = (stall.cuisine || "").toLowerCase();
    var stallImg = stall.img || "images/HawkerHubSG Logo.png";
    var stallRating = stall.rating || "N/A";
    var isTrending = stall.trending === true;

    // filter by cuisine
    if (selectedCuisine !== "all" && stallCuisine !== selectedCuisine) {
      continue;
    }

    // filter by search
    if (searchText !== "" && stallName.indexOf(searchText) === -1) {
      continue;
    }

    // build card
    var card = document.createElement("div");
    card.className = "card";

    // go to order page
    card.onclick = function () {
      window.location.href = "order.html.html";
    };

    card.innerHTML =
      '<img class="card-img" src="' + stallImg + '" alt="' + (stall.name || "Stall") + '">' +
      "<h3>" + (stall.name || "Unknown Stall") + "</h3>" +
      "<p>Cuisine: " + (stall.cuisine || "Unknown") + "</p>" +
      "<p>Rating: " + stallRating + "</p>";

    // Add to trending if needed
    if (isTrending) {
      var trendingCard = card.cloneNode(true);
      trendingRow.appendChild(trendingCard);
    }

    // Add to all stalls
    allRow.appendChild(card);
  }
}

// search box
searchInput.onkeyup = function () {
  searchText = searchInput.value.toLowerCase().trim();
  showStalls();
};

// cuisine filter
for (var i = 0; i < pills.length; i++) {
  pills[i].onclick = function () {
    // remove active from all
    for (var j = 0; j < pills.length; j++) {
      pills[j].classList.remove("active");
    }

    // set active to clicked pill
    this.classList.add("active");

    // store selected cuisine
    selectedCuisine = this.getAttribute("data-cuisine");
    showStalls();
  };
}

// Start the page
loadStalls();
