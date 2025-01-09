const input1 = document.querySelector("#day");
const input2 = document.querySelector("#month");
const input3 = document.querySelector("#year");
const imgClick = document.querySelector("#submit");
const errSpanBefore = document.querySelectorAll('input[type="text"] + span');
const h1Years = document.querySelector(".years");
const h1Months = document.querySelector(".months");
const h1days = document.querySelector(".days");

function showError(input, message) {
  const errorSpan = input.nextElementSibling;
  const seconErrorSpan = errorSpan.nextElementSibling;
  seconErrorSpan.textContent = message;
  input.previousElementSibling.style.color = "var(--Light-red)"; // Targets the label
}

const hideError = (input) => {
  const errorSpan = input.nextElementSibling;
  const seconErrorSpan = errorSpan.nextElementSibling;
  seconErrorSpan.textContent = "";
  seconErrorSpan.style.visibility = "visible";
};

const validateInput = (input, minValue, maxValue, message) => {
  if (input.value < minValue || input.value > maxValue || input.value.trim() === "") {
    showError(input, message);
    return false;
  } else if (isNaN(input.value)) {
    showError(input, "Enter numbers only");
    return false;
  } else {
    hideError(input);
    return true;
  }
};

imgClick.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission by default

  const dayValid = validateInput(input1, 1, 31, "Must be a valid day");
  const monthValid = validateInput(input2, 1, 12, "Must be a valid month");
  const yearValid = validateInput(input3, 1900, 2025, "Must be a valid year");

  if (!dayValid || !monthValid || !yearValid) {
    return; // Stop further processing if any validation fails
  }

  // Calculate the age
  const currentDate = new Date();
  const birthDate = new Date(input3.value, input2.value - 1, input1.value);

  if (birthDate > currentDate) {
    showError(input3, "Are you for the future?");
    return;
  }

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust for negative months/days
  if (days < 0) {
    months--;
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate(); // Last day of the previous month
    days += lastMonthDate;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  h1Years.innerHTML = years;
  h1Months.innerHTML = months;
  h1days.innerHTML = days;
});
