function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    //this logic is for - if I put date 28 of one month and till next months 5 so answer comes -ve when we substract thats why we borrow 
    // Days in the month BEFORE today's month.
    // new Date(year, month, 0) rolls back to the last day of the previous month.
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1; // we borrowed a month, so pay it back here
  }

  if (months < 0) {
    months += 12;
    years -= 1; // borrowed a year
  }

  console.log(`${years} years, ${months} months, ${days} days`);
}

calculateAge("2000-06-15");