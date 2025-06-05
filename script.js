let currentStep = 1;

const btnGoBack = document.getElementById("btn-back");
const btnNext = document.getElementById("btn-next");

const btnStepOne = document.getElementById("radio-step-one");
const btnStepTwo = document.getElementById("radio-step-two");
const btnStepThree = document.getElementById("radio-step-three");
const btnStepFour = document.getElementById("radio-step-four");

const stepBtns = [btnStepOne, btnStepTwo, btnStepThree, btnStepFour];

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

function updateUI() {
  currentStep === 1
    ? (btnGoBack.style.display = "none")
    : (btnGoBack.style.display = "block");
}

function handleUpdateCurrent(e) {
  const newCurrent = parseInt(e.target.dataset.step);
  currentStep = newCurrent;
  updateUI();
  console.log("current:" + currentStep);
}

function decrementCurrent() {
  currentStep > 1 && currentStep--;
  updateUI();
}
function incrementCurrent() {
  currentStep < 5 && currentStep++;
  updateUI();
}

btnGoBack.addEventListener("click", decrementCurrent);
btnNext.addEventListener("click", incrementCurrent);

stepBtns.forEach((input) => {
  input.addEventListener("change", handleUpdateCurrent);
});
