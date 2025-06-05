let currentStep = 1;

const btnGoBack = document.getElementById("btn-back");
const btnNext = document.getElementById("btn-next");

const btnStepOne = document.getElementById("radio-step-one");
const btnStepTwo = document.getElementById("radio-step-two");
const btnStepThree = document.getElementById("radio-step-three");
const btnStepFour = document.getElementById("radio-step-four");

const stepBtns = [btnStepOne, btnStepTwo, btnStepThree, btnStepFour];

const stepOneWrapper = document.getElementById("step-one");
const stepTwoWrapper = document.getElementById("step-two");
const stepThreeWrapper = document.getElementById("step-three");
const stepFourWrapper = document.getElementById("step-four");

const stepWrappers = [
  stepOneWrapper,
  stepTwoWrapper,
  stepThreeWrapper,
  stepFourWrapper,
];

class SignUpObj {
  constructor() {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.plan = "";
    this.addOns = [];
  }

  generateSummary() {}
}

// **********starts the code for switching steps*******************
// clear out current step
function clearSteps() {
  stepWrappers.forEach((wrapper) => {
    wrapper.style.display = "none";
  });
}

// updates the radio btn in the sidebar
function updateCurrentStepBtn() {
  const newCurrentBtn = stepBtns.filter(
    (s) => s.dataset.step === currentStep.toString()
  );
  newCurrentBtn[0].checked = true;
}

// get the step wrapper for the current checked radio btn
function getStepWrapper() {
  return stepWrappers.filter((w) => w.id === getStepIdString())[0];
}

// sets the new current step
function handleUpdateCurrent(e) {
  const newCurrent = parseInt(e.target.dataset.step);
  currentStep = newCurrent;
  updateUI();
}

function decrementCurrent() {
  currentStep--;
  updateCurrentStepBtn();
  updateUI();
}

function incrementCurrent() {
  currentStep < 4 && currentStep++;
  updateCurrentStepBtn();
  updateUI();
}

// get the id to use for the current step wrapper to be displayed
function getStepIdString() {
  const checkedBtn = stepBtns.filter((btn) => btn.checked);
  const stepIdString = checkedBtn[0].value;
  return stepIdString;
}

function updateUI() {
  currentStep === 1
    ? (btnGoBack.style.display = "none")
    : (btnGoBack.style.display = "block");
  clearSteps();
  const currWrapper = getStepWrapper();
  currWrapper.style.display = "block";
}

btnGoBack.addEventListener("click", decrementCurrent);
btnNext.addEventListener("click", incrementCurrent);

stepBtns.forEach((input) => {
  input.addEventListener("change", handleUpdateCurrent);
});
// **********ends the code for switching steps************

// ***********billing frequency slider********************
const planSlider = document.getElementById("plan-slider");
const slide = document.getElementById("slide");
const planMonthlyText = document.getElementById("plan-monthly");
const planYearlyText = document.getElementById("plan-yearly");
let billingFrequency = "monthly";

function handleBillingFrequency() {
  if (billingFrequency === "monthly") {
    billingFrequency = "yearly";
    slide.style.right = ".3rem";
    planMonthlyText.classList.remove("slider-active");
    planYearlyText.classList.add("slider-active");
  } else {
    billingFrequency = "monthly";
    slide.style.right = "1.7rem";
    planYearlyText.classList.remove("slider-active");
    planMonthlyText.classList.add("slider-active");
  }
}

planSlider.addEventListener("click", handleBillingFrequency);

// ********** end the billing frequency slider*****************
