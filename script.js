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

const stepOneName = document.getElementById("name");
const stepOneEmail = document.getElementById("email");
const stepOnePhone = document.getElementById("phone");

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

function checkStepOneForEmptyFields() {
  return stepOneName.value && stepOneEmail.value && stepOnePhone.value
    ? true
    : false;
}

// sets the new current step
function handleUpdateCurrent(e) {
  if (checkStepOneForEmptyFields()) {
    const newCurrent = parseInt(e.target.dataset.step);
    currentStep = newCurrent;
    updateUI();
  }
}

function decrementCurrent() {
  if (checkStepOneForEmptyFields()) {
    currentStep--;
    updateCurrentStepBtn();
    updateUI();
  }
}

function incrementCurrent() {
  if (checkStepOneForEmptyFields()) {
    currentStep < 4 && currentStep++;
    console.log(checkStepOneForEmptyFields());
    updateCurrentStepBtn();
    updateUI();
  }
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
  currentStep === 4 && updateBtnConfirm();
  currentStep <= 3 && resetBtnConfirm();
}

btnGoBack.addEventListener("click", decrementCurrent);
btnNext.addEventListener("click", incrementCurrent);

stepBtns.forEach((input) => {
  input.addEventListener("change", handleUpdateCurrent);
});
// **********ends the code for switching steps************

// ***********billing frequency********************
// slider
const planSlider = document.getElementById("plan-slider");
const slide = document.getElementById("slide");
const planMonthlyText = document.getElementById("plan-monthly");
const planYearlyText = document.getElementById("plan-yearly");
let billingFrequency = "monthly";

function handleBillingFrequency() {
  if (billingFrequency === "monthly") {
    billingFrequency = "yearly";
    slide.style.right = ".125rem";
    planMonthlyText.classList.remove("slider-active");
    planYearlyText.classList.add("slider-active");
    updatePlanCardPrices();
    updateAddOnPrices();
  } else {
    billingFrequency = "monthly";
    slide.style.right = "1.125rem";
    planYearlyText.classList.remove("slider-active");
    planMonthlyText.classList.add("slider-active");
    updatePlanCardPrices();
    updateAddOnPrices();
  }
}

planSlider.addEventListener("click", handleBillingFrequency);
// end slider
// update the plan cards
const plan1Price = document.getElementById("plan-span-1");
const plan2Price = document.getElementById("plan-span-2");
const plan3Price = document.getElementById("plan-span-3");
const twoFreeSpans = document.getElementsByClassName("two-free");

function updatePlanCardPrices() {
  const monthlyPricing = ["$9/mo", "$12/mo", "$15/mo"];
  const yearlyPricing = ["$90/yr", "$120/yr", "$150/yr"];

  if (billingFrequency === "monthly") {
    plan1Price.innerText = monthlyPricing[0];
    plan2Price.innerText = monthlyPricing[1];
    plan3Price.innerText = monthlyPricing[2];
    // remove the two free months text to the plan cards
    Array.from(twoFreeSpans).forEach((span) => span.classList.toggle("hide"));
    return;
  }

  plan1Price.innerText = yearlyPricing[0];
  plan2Price.innerText = yearlyPricing[1];
  plan3Price.innerText = yearlyPricing[2];
  // add the two free months text to the plan cards
  Array.from(twoFreeSpans).forEach((span) => span.classList.toggle("hide"));
}

// this lets you click anywhere in the card to make that selection "checked"
const planCards = Array.from(document.getElementsByClassName("plan-card"));
planCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    const input = e.target.querySelector("input[type='radio']");
    input.checked = true;
  });
});

// ********** end billing frequency*****************

// this does the same as the planCards code directly
// above for the add-on cards on step three
const addOnCards = Array.from(
  document.getElementsByClassName("add-on-wrapper")
);
addOnCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    const input = e.target
      .closest(".add-on-wrapper")
      .querySelector("input[type='checkbox']");
    const checkedStatus = input.checked;
    input.checked = !checkedStatus;
  });
});

const addOnPriceOne = document.getElementById("add-on-span-one");
const addOnPriceTwo = document.getElementById("add-on-span-two");
const addOnPriceThree = document.getElementById("add-on-span-three");

function updateAddOnPrices() {
  const monthlyPricing = ["1/mo", "2/mo", "2/mo"];
  const yearlyPricing = ["10/yr", "20/yr", "20/yr"];

  if (billingFrequency === "monthly") {
    addOnPriceOne.innerText = monthlyPricing[0];
    addOnPriceTwo.innerText = monthlyPricing[1];
    addOnPriceThree.innerText = monthlyPricing[2];
    return;
  }

  addOnPriceOne.innerText = yearlyPricing[0];
  addOnPriceTwo.innerText = yearlyPricing[1];
  addOnPriceThree.innerText = yearlyPricing[2];
}

// step four summary jump back to the plans with the link
const changePlanLink = document.getElementById("jump-to-plans");

function handleChangePlanLink() {
  currentStep = 2;
  updateCurrentStepBtn();
  updateUI();
}

changePlanLink.addEventListener("click", handleChangePlanLink);

// need to handle the button when step 4 is displayed
function updateBtnConfirm() {
  btnNext.innerText = "Confirm";
  btnNext.style.backgroundColor = "hsl(243, 100%, 62%)";
  btnNext.addEventListener("mouseover", handleBtnConfirmHover);
  btnNext.addEventListener("mouseout", handleBtnConfirmHoverReset);
}

function handleBtnConfirmHover() {
  btnNext.style.backgroundColor = "hsl(228, 37.40%, 71.20%)";
}

function handleBtnConfirmHoverReset() {
  btnNext.style.backgroundColor = "hsl(243, 100%, 62%)";
}

function resetBtnConfirm() {
  btnNext.innerText = "Next Step";
  btnNext.removeAttribute("style");
  btnNext.removeEventListener("mouseover", handleBtnConfirmHover);
  btnNext.removeEventListener("mouseout", handleBtnConfirmHoverReset);
}
