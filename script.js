// Populate day and month dropdowns.
// Year is a free-typed number input to support any historical year.
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");

for (let day = 1; day <= 31; day++) {
  const option = document.createElement("option");
  option.value = day;
  option.textContent = day;
  dayInput.appendChild(option);
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

monthNames.forEach(function (name, index) {
  const option = document.createElement("option");
  option.value = index + 1; // Jan = 1, needed for YYYY-MM-DD format
  option.textContent = name;
  monthInput.appendChild(option);
});

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  if (isNaN(birthDate.getTime())) {
    resultDiv.innerHTML = `<div class="error-message">Invalid date entered. Please pick a valid date.</div>`;
    return;
  }

  if (birthDate > today) {
    resultDiv.innerHTML = `<div class="error-message">Birth date is in the future. Please enter a valid past date.</div>`;
    return;
  }

  if (birthDate.getFullYear() < 1) {
    resultDiv.innerHTML = `<div class="error-message">Please enter a valid year.</div>`;
    return;
  }

  const msInOneDay = 1000 * 60 * 60 * 24;
  const totalDaysAlive = Math.floor((today - birthDate) / msInOneDay);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Borrow from the previous month if days went negative.
  // new Date(year, month, 0) rolls back to the last day of that month.
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

  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // Compare date-only (ignore time-of-day) so a birthday today reads as 0 days left.
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (nextBirthday < todayDateOnly) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const daysUntilNextBirthday = Math.round((nextBirthday - todayDateOnly) / msInOneDay);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayBorn = dayNames[birthDate.getDay()];

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

const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", function () {
  const day = dayInput.value;
  const month = monthInput.value;
  const year = yearInput.value;

  if (!day || !month || !year) {
    resultDiv.innerHTML = `<div class="error-message">Please fill in day, month, and year.</div>`;
    return;
  }

  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");
  const dobValue = `${year}-${paddedMonth}-${paddedDay}`;

  calculateAge(dobValue);
});

// Allow Enter to submit from any input field.
[dayInput, monthInput, yearInput].forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      calculateBtn.click();
    }
  });
});

// Clear stale results as soon as an input changes.
[dayInput, monthInput, yearInput].forEach(function (input) {
  input.addEventListener("input", function () {
    resultDiv.innerHTML = "";
  });
});

dayInput.focus();