let currentStep = 1;
let billingFrequency = "monthly";

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

function clearSteps() {
  stepWrappers.forEach((wrapper) => {
    wrapper.style.display = "none";
  });
}

function updateUI() {
  currentStep === 1
    ? (btnGoBack.style.display = "none")
    : (btnGoBack.style.display = "block");
  clearSteps();
  const currWrapper = getStepWrapper();
  currWrapper.style.display = "block";
}

function updateCurrentStepBtn() {
  const newCurrentBtn = stepBtns.filter(
    (s) => s.dataset.step === currentStep.toString()
  );
  newCurrentBtn[0].checked = true;
}

function getStepWrapper() {
  return stepWrappers.filter((w) => w.id === getStepIdString())[0];
}

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

function getStepIdString() {
  const checkedBtn = stepBtns.filter((btn) => btn.checked);
  const stepIdString = checkedBtn[0].value;
  return stepIdString;
}

btnGoBack.addEventListener("click", decrementCurrent);
btnNext.addEventListener("click", incrementCurrent);

stepBtns.forEach((input) => {
  input.addEventListener("change", handleUpdateCurrent);
});
