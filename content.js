// Function to open and select the "Amsterdam" option in the dropdown
function selectAmsterdam() {
  const selectElement = document.querySelector("#mat-select-2");

  if (selectElement) {
    // Open the dropdown by clicking on the mat-select element
    selectElement.click();

    // Wait for the dropdown to open and options to load
    setTimeout(() => {
      // Retry mechanism for selecting Amsterdam if it's not found immediately
      const attemptSelectAmsterdam = setInterval(() => {
        const option = Array.from(document.querySelectorAll(".mat-option-text")).find(
          (el) => el.textContent.trim() === "Amsterdam"
        );

        if (option) {
          // Click on the "Amsterdam" option to select it
          option.click();
          console.log("Selected option: Amsterdam");

          // Stop the retry mechanism once selected
          clearInterval(attemptSelectAmsterdam);

          // Start checking for "no appointments" message after selection
          setTimeout(startCheckingForNoAppointments, 1000); // Wait 3 seconds before checking appointments
        } else {
          console.log("Retrying: Option 'Amsterdam' not found yet.");
        }
      }, 1000); // Retry every 1 second
    }, 2000); // Initial delay to wait for dropdown to open and options to load
  } else {
    console.log("Select element not found.");
  }
}

// Function to start checking for the "no appointments" message
function startCheckingForNoAppointments() {
  console.log("Started checking for 'no appointments' message.");

  // Check for the message every 5 seconds
  setInterval(checkForNoAppointments, 1000);
}

// Function to check if more than one button is active in the calendar
function checkMultipleActiveButtons() {
  // Select all buttons with the class indicating they are active
  const activeButtons = document.querySelectorAll("button.mat-calendar-body-active");

  // Check if there is more than one active button
  if (activeButtons.length > 1) {
    console.log("More than one active button found:", activeButtons.length);
    return true;
  } else {
    console.log("Only one or no active button found.");
    return false;
  }
}

// Function to check for the message and play a beep if detected
function checkForNoAppointments() {
  // Call the function and log the result
  const available = checkMultipleActiveButtons();
  if (available) {
    playBeep();
    console.log("Appointments available.");
  } else {
    console.log("Appointments not available, booking now...");
  }
}

function playBeep() {
  const beep = new Audio(chrome.runtime.getURL("beep.mp3"));
  beep.play().catch(error => {
    console.error("Failed to play beep sound:", error);
  });
}

// Run the select function after the page is fully loaded
window.addEventListener("load", () => {
  // Retry selecting Amsterdam every 2 seconds until it's successful
  const intervalId = setInterval(() => {
    if (document.querySelector("#mat-select-2")) {
      selectAmsterdam();
      clearInterval(intervalId); // Stop trying once Amsterdam is selected
    }
  }, 2000); // Adjust interval as needed
});