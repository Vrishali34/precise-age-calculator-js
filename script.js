function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  const msInOneDay = 1000 * 60 * 60 * 24; // ms * sec * min * hr = ms in a day
  const totalDaysAlive = Math.floor((today - birthDate) / msInOneDay);

  console.log("Birth date:", birthDate);
  console.log("Today:", today);
  console.log("Total days alive:", totalDaysAlive);
}

calculateAge("2000-06-15");