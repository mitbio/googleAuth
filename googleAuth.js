// Import the Firebase modules you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDmbLZknKwhTBNtWQpwhXzUTc-AdZ6KjmM",
  authDomain: "contactxextension.firebaseapp.com",
  projectId: "contactxextension",
  storageBucket: "contactxextension.firebasestorage.app",
  messagingSenderId: "797855742573",
  appId: "1:797855742573:web:683f44d3c339597ab15d64",
  measurementId: "G-FKK8GGSGWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Google Auth setup ---
const provider = new GoogleAuthProvider();

// --- Button references ---
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const userInfo = document.getElementById("userInfo");

// --- Sign in ---
if (signInBtn) {
  signInBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      userInfo.textContent = `Welcome, ${user.displayName}`;
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Login error:", error);
    }
  });
}

// --- Sign out ---
if (signOutBtn) {
  signOutBtn.addEventListener("click", async () => {
    await signOut(auth);
    console.log("Signed out");
    userInfo.textContent = "";
  });
}

// --- Detect auth state ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("No user signed in.");
  }
});
