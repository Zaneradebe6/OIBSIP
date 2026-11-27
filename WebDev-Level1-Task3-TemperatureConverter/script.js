const form = document.getElementById("converter");
const input = document.getElementById("value");
const unitSelect = document.getElementById("unit");
const errorBox = document.getElementById("error");
const out = {
  C: document.getElementById("out-C"),
  F: document.getElementById("out-F"),
  K: document.getElementById("out-K"),
};

const NUMBER_PATTERN = /^[-+]?(\d+\.?\d*|\.\d+)$/;

// Convert any unit to Kelvin first, then from Kelvin to the others.
function toKelvin(value, unit) {
  if (unit === "C") return value + 273.15;
  if (unit === "F") return (value - 32) * 5 / 9 + 273.15;
  return value;
}

function fromKelvin(kelvin) {
  const celsius = kelvin - 273.15;
  return {
    C: celsius,
    F: celsius * 9 / 5 + 32,
    K: kelvin,
  };
}

function format(number, unit) {
  let rounded = Number(number.toFixed(2));
  if (Object.is(rounded, -0)) rounded = 0;
  const symbol = unit === "K" ? " K" : " °" + unit;
  return rounded + symbol;
}

function showError(message) {
  errorBox.textContent = message;
  input.classList.add("invalid");
  Object.values(out).forEach((el) => (el.textContent = "–"));
}

function clearError() {
  errorBox.textContent = "";
  input.classList.remove("invalid");
}

function convert(event) {
  event.preventDefault();
  clearError();

  const raw = input.value.trim();

  if (raw === "") {
    showError("Please enter a temperature.");
    return;
  }
  if (!NUMBER_PATTERN.test(raw)) {
    showError("Please enter a valid number (digits only, for example 25 or -3.5).");
    return;
  }

  const unit = unitSelect.value;
  const kelvin = toKelvin(parseFloat(raw), unit);

  // Small tolerance avoids rounding errors right at absolute zero.
  if (kelvin < -1e-9) {
    const limits = { C: "-273.15 °C", F: "-459.67 °F", K: "0 K" };
    showError("That is below absolute zero. The lowest possible value is " + limits[unit] + ".");
    return;
  }

  const results = fromKelvin(Math.max(kelvin, 0));
  out.C.textContent = format(results.C, "C");
  out.F.textContent = format(results.F, "F");
  out.K.textContent = format(results.K, "K");
}

form.addEventListener("submit", convert);
input.addEventListener("input", clearError);
