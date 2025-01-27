export function preventBack() {
  window.history.pushState(null, "", window.location.href);
}

// Disable back navigation on initial load
preventBack();

// Bind event listener for popstate (back button navigation)
window.addEventListener("popstate", function () {
  preventBack(); // Push state again when back button is pressed
});

// Also check if the user tries to go back via keyboard shortcuts or gestures
window.addEventListener("load", function () {
  setTimeout(preventBack, 0);
});

// Prevent back navigation on page unload
window.addEventListener("beforeunload", function () {
  preventBack();
});
