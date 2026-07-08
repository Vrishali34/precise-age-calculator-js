function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  // --- FIX 1: Invalid date check ---
  // If new Date() couldn't parse the string, birthDate.getTime() returns NaN.
  if (isNaN(birthDate.getTime())) {
    resultDiv.innerHTML = "Invalid date entered. Please pick a valid date.";
    return;
  }

  // --- FIX 2: Future date check ---
  if (birthDate > today) {
    resultDiv.innerHTML = "Birth date is in the future. Please enter a valid past date.";
    return;
  }

  // --- FIX 4: Unreasonably old date check ---
  // Safety net in case the native date picker's year field misfires
  // (e.g. typing gets interrupted and it commits "0001" instead of "2001")
  const oldestReasonableYear = 1900;
  if (birthDate.getFullYear() < oldestReasonableYear) {
    resultDiv.innerHTML = `Please enter a year after ${oldestReasonableYear}.`;
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
    // "day 0" trick: gives the LAST day of the month before today's month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // --- Total months alive ---
  const totalMonthsAlive = years * 12 + months;

  // --- Days until next birthday ---
  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // --- FIX 3: "DOB = today" edge case ---
  // Compare only the DATE part (ignore time-of-day)
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

  // --- Write results into the page ---
  resultDiv.innerHTML = `
    <p>${years} years, ${months} months, ${days} days</p>
    <p>Total days alive: ${totalDaysAlive}</p>
    <p>Total months alive: ${totalMonthsAlive}</p>
    <p>Days until next birthday: ${daysUntilNextBirthday}</p>
    <p>Day of week born: ${dayBorn}</p>
  `;
}

// --- DOM wiring ---
const dobInput = document.getElementById("dobInput");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", function () {
  const dobValue = dobInput.value; // e.g. "2000-06-15"
  calculateAge(dobValue);
});