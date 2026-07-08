function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  const msInOneDay = 1000 * 60 * 60 * 24;
  const totalDaysAlive = Math.floor((today - birthDate) / msInOneDay);

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

  // If this year's birthday date has already passed (or is today, no diff),
  // move the target to next year instead.
  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const daysUntilNextBirthday = Math.ceil((nextBirthday - today) / msInOneDay);

  console.log(`${years} years, ${months} months, ${days} days`);
  console.log("Total days alive:", totalDaysAlive);
  console.log("Total months alive:", totalMonthsAlive);
  console.log("Days until next birthday:", daysUntilNextBirthday);
}

calculateAge("2000-06-15");