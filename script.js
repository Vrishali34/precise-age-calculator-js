function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  // --- Total days alive ---
  // ms in one day = 1000ms * 60sec * 60min * 24hr
  const msInOneDay = 1000 * 60 * 60 * 24;
  const totalDaysAlive = Math.floor((today - birthDate) / msInOneDay);

  // --- Years / Months / Days breakdown ---
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // if days went negative, borrow days from the previous month
  if (days < 0) {
    // day 0 trick: gives the LAST day of the month before today's month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1; // pay back the borrowed month
  }

  // if months went negative, borrow a year
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // --- Total months alive ---
  // convert years into months, then add leftover months
  const totalMonthsAlive = years * 12 + months;

  // --- Days until next birthday ---
  let nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  // if this year's birthday already passed, target next year instead
  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const daysUntilNextBirthday = Math.ceil((nextBirthday - today) / msInOneDay);

  // --- Day of week born ---
  // getDay() returns 0-6 (0 = Sunday), so we use it as an index into this array
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayBorn = dayNames[birthDate.getDay()];

  // --- Print everything ---
  console.log(`${years} years, ${months} months, ${days} days`);
  console.log("Total days alive:", totalDaysAlive);
  console.log("Total months alive:", totalMonthsAlive);
  console.log("Days until next birthday:", daysUntilNextBirthday);
  console.log("Day of week born:", dayBorn);
}

calculateAge("2000-06-15");