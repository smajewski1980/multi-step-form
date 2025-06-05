let currentStep = "1";

const btnGoBack = document.getElementById("btn-back");
const btnNext = document.getElementById("btn-next");

const btnStepOne = document.getElementById("radio-step-one");
const btnStepTwo = document.getElementById("radio-step-two");
const btnStepThree = document.getElementById("radio-step-three");
const btnStepFour = document.getElementById("radio-step-four");

const stepBtns = [btnStepOne, btnStepTwo, btnStepThree, btnStepFour];

function handleUpdateCurrent(e) {
  const newCurrent = e.target.dataset.step;
  currentStep = newCurrent;
  console.log("current step:" + currentStep);
}
console.log("current step:" + currentStep);
stepBtns.forEach((input) => {
  input.addEventListener("change", handleUpdateCurrent);
});
