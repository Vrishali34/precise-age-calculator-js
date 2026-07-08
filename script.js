// --- Populate day and month dropdowns ---

const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");

// Fill days 1-31
for (let day = 1; day <= 31; day++) {
  const option = document.createElement("option");
  option.value = day;
  option.textContent = day;
  dayInput.appendChild(option);
}

// Fill months as names, but store the NUMBER (1-12) as the value
const monthNames = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];

monthNames.forEach(function (name, index) {
  const option = document.createElement("option");
  option.value = index + 1; // Jan = 1, since we build "YYYY-MM-DD" strings later
  option.textContent = name;
  monthInput.appendChild(option);
});


function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  // --- FIX 1: Invalid date check ---
  if (isNaN(birthDate.getTime())) {
    resultDiv.innerHTML = `<div class="error-message">Invalid date entered. Please pick a valid date.</div>`;
    return;
  }

  // --- FIX 2: Future date check ---
  if (birthDate > today) {
    resultDiv.innerHTML = `<div class="error-message">Birth date is in the future. Please enter a valid past date.</div>`;
    return;
  }

  // --- FIX 4 (updated): Year must be a real, positive year ---
  // We removed the old "must be after 1900" rule since it blocked
  // legitimate historical dates (e.g. calculating an ancient king's age).
  // We only reject year 0 or negative, which aren't valid calendar years.
  if (birthDate.getFullYear() < 1) {
    resultDiv.innerHTML = `<div class="error-message">Please enter a valid year.</div>`;
    return;
  }

  // --- Total days alive ---
  const msInOneDay = 1000 * 60 * 60 * 24;
  const totalDaysAlive = Math.floor((today - birthDate) / msInOneDay);

  // --- Years / Months / Days breakdown ---
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalMonthsAlive = years * 12 + months;

  // --- Days until next birthday ---
  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (nextBirthday < todayDateOnly) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const daysUntilNextBirthday = Math.round((nextBirthday - todayDateOnly) / msInOneDay);

  // --- Day of week born ---
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayBorn = dayNames[birthDate.getDay()];

  // --- Write results into the page as stat cards ---
  resultDiv.innerHTML = `
    <div class="stat-card highlight">
      <span class="stat-number">${years}y ${months}m ${days}d</span>
      <span class="stat-label">Time lived</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${totalDaysAlive.toLocaleString()}</span>
      <span class="stat-label">Total days alive</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${totalMonthsAlive.toLocaleString()}</span>
      <span class="stat-label">Total months alive</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${daysUntilNextBirthday}</span>
      <span class="stat-label">Days until next birthday</span>
    </div>
    <div class="stat-card">
      <span class="stat-number">${dayBorn}</span>
      <span class="stat-label">Day of week born</span>
    </div>
  `;
}

// --- DOM wiring ---
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", function () {
  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;

  // Basic check: make sure something was actually picked/typed in all 3 fields
  if (!day || !month || !year) {
    resultDiv.innerHTML = `<div class="error-message">Please fill in day, month, and year.</div>`;
    return;
  }

  // Zero-pad day/month so "5" becomes "05" — required for YYYY-MM-DD format
  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  const dobValue = `${year}-${paddedMonth}-${paddedDay}`;
  calculateAge(dobValue);
});