function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  // --- FIX 1: Invalid date check ---
  // If new Date() couldn't parse the string, birthDate.getTime() returns NaN.
  // isNaN() catches that before we try to do any math with a broken date.
  if (isNaN(birthDate.getTime())) {
    console.log("Invalid date entered. Please use a real date like '2000-06-15'.");
    return; // stop the function here, don't run the rest
  }

  // --- FIX 2: Future date check ---
  // Doesn't make sense to calculate an "age" for someone not born yet.
  if (birthDate > today) {
    console.log("Birth date is in the future. Please enter a valid past date.");
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

  // --- FIX 3: "DOB = today" edge case ---
  // Compare only the DATE part (ignore time-of-day), so if today IS the
  // birthday, we get 0 days left instead of wrongly jumping to next year.
  // We do this by zeroing out today's time before comparing.
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

  console.log(`${years} years, ${months} months, ${days} days`);
  console.log("Total days alive:", totalDaysAlive);
  console.log("Total months alive:", totalMonthsAlive);
  console.log("Days until next birthday:", daysUntilNextBirthday);
  console.log("Day of week born:", dayBorn);
}

// --- Test cases ---
calculateAge("2000-06-15"); // normal case
calculateAge("2030-01-01"); // future date -> should show error message
calculateAge("2026-07-08"); // today's date -> should show 0 days until next birthday
calculateAge("not-a-date"); // invalid string -> should show error message