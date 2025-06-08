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

const summaryPlanName = document.getElementById("summary-plan-name");
const summaryPlanPrice = document.getElementById("summary-plan-price");
const summaryTotal = document.getElementById("summary-total");
const summaryTotalBillFreq = document.getElementById(
  "summary-total-billing-freq"
);
const addOnSpanOnline = document.getElementById("add-on-span-online-service");
const addOnSpanStorage = document.getElementById("add-on-span-larger-storage");
const addOnSpanCustom = document.getElementById(
  "add-on-span-customizable-profile"
);

const monthly = {
  "Arcade plan": "$9/mo",
  "Advanced plan": "$12/mo",
  "Pro plan": "$15/mo",
  "online-service": "1/mo",
  "larger-storage": "2/mo",
  "customizable-profile": "2/mo",
};

const yearly = {
  "Arcade plan": "$90/yr",
  "Advanced plan": "$120/yr",
  "Pro plan": "$150/yr",
  "online-service": "10/yr",
  "larger-storage": "20/yr",
  "customizable-profile": "20/yr",
};

class SignUpObj {
  constructor() {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.plan = "";
    this.billFreq = "monthly";
    this.addOns = [];
  }

  generateSummary() {
    const summaryAddOns = Array.from(
      document.getElementsByClassName("summary-add-on-wrapper")
    );
    summaryAddOns.forEach((addOn) => {
      addOn.style.display = "none";
    });

    this.addOns.forEach((addOn) => {
      let addOnPrice;
      switch (this.billFreq) {
        case "monthly":
          addOnPrice = monthly[addOn];
          break;
        case "yearly":
          addOnPrice = yearly[addOn];
          break;
      }

      document.getElementById(`summary-span-${addOn}`).innerText = addOnPrice;
      document.getElementById(`summary-add-on-${addOn}`).style.display = "flex";
    });

    summaryPlanName.innerText = this.plan;

    let planPrice;
    switch (this.billFreq) {
      case "monthly":
        planPrice = monthly[this.plan];
        break;
      case "yearly":
        planPrice = yearly[this.plan];
        break;
    }
    summaryPlanPrice.innerText = planPrice;
    summaryTotalBillFreq.innerText =
      this.billFreq === "monthly" ? "month" : "year";
    summaryTotal.innerText = this.generateSummaryTotal();
  }
  generateSummaryTotal() {
    return "blah" + (this.billFreq === "monthly" ? "/mo" : "/yr");
  }
}

const signUpObj = new SignUpObj();

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

function stepOneFieldsComplete() {
  return stepOneName.validity.valid &&
    stepOneEmail.validity.valid &&
    stepOnePhone.validity.valid
    ? true
    : false;
}

// sets the new current step
const emptyFieldWarning = document.getElementById("step-one-warning");

function handleUpdateCurrent(e) {
  const newCurrent = parseInt(e.target.dataset.step);
  currentStep = newCurrent;
  if (currentStep === 4) signUpObj.generateSummary();
  updateUI();
  signUpObj.billFreq = billingFrequency;
}

function decrementCurrent() {
  if (stepOneFieldsComplete()) {
    currentStep--;
    updateCurrentStepBtn();
    updateUI();
    document.querySelector("aside").style.pointerEvents = "auto";
  }
}

function incrementCurrent() {
  if (stepOneFieldsComplete()) {
    currentStep < 4 && currentStep++;
    if (currentStep === 4) signUpObj.generateSummary();
    updateCurrentStepBtn();
    updateUI();
    document.querySelector("aside").style.pointerEvents = "auto";
    // console.log(signUpObj);
    return;
  }
  emptyFieldWarning.style.display = "block";
}

// get the id to use for the current step wrapper to be displayed
function getStepIdString() {
  const checkedBtn = stepBtns.filter((btn) => btn.checked);
  const stepIdString = checkedBtn[0].value;
  return stepIdString;
}

// this resets the buttons to inactive if there is an empty field
const persInfoArr = [stepOneName, stepOneEmail, stepOnePhone];

function handleInfoFieldChange(e) {
  emptyFieldWarning.style.display = "none";
  const field = e.target;
  const value = field.value;
  const fieldName = field.name;
  signUpObj[fieldName] = value;

  if (e.target.value === "") {
    document.querySelector("aside").style.pointerEvents = "none";
  }
}

persInfoArr.forEach((field) => {
  field.addEventListener("input", handleInfoFieldChange);
});

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
    signUpObj.billFreq = "yearly";
  } else {
    billingFrequency = "monthly";
    slide.style.right = "1.125rem";
    planYearlyText.classList.remove("slider-active");
    planMonthlyText.classList.add("slider-active");
    updatePlanCardPrices();
    updateAddOnPrices();
    signUpObj.billFreq = "monthly";
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
  if (billingFrequency === "monthly") {
    plan1Price.innerText = monthly["Arcade plan"];
    plan2Price.innerText = monthly["Advanced plan"];
    plan3Price.innerText = monthly["Pro plan"];
    // remove the two free months text to the plan cards
    Array.from(twoFreeSpans).forEach((span) => span.classList.toggle("hide"));
    return;
  }

  plan1Price.innerText = yearly["Arcade plan"];
  plan2Price.innerText = yearly["Advanced plan"];
  plan3Price.innerText = yearly["Pro plan"];
  // add the two free months text to the plan cards
  Array.from(twoFreeSpans).forEach((span) => span.classList.toggle("hide"));
}

// this lets you click anywhere in the card to make that selection "checked"
const planCards = Array.from(document.getElementsByClassName("plan-card"));
planCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    const input = e.target
      .closest(".plan-card")
      .querySelector("input[type='radio']");
    input.checked = true;
    const planName = input.value;
    signUpObj.plan = planName;
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

    // this adds/removes the add-on to/from the signUpObj
    const addOn = input.value;
    const alreadyHasIt = signUpObj.addOns.includes(addOn);
    if (!alreadyHasIt) {
      signUpObj.addOns.push(addOn);
    } else {
      const idx = signUpObj.addOns.indexOf(addOn);
      signUpObj.addOns.splice(idx, 1);
    }
  });
});

const addOnPriceOnline = document.getElementById("add-on-span-online-service");
const addOnPriceStorage = document.getElementById("add-on-span-larger-storage");
const addOnPriceCustom = document.getElementById(
  "add-on-span-customizable-profile"
);

function updateAddOnPrices() {
  if (billingFrequency === "monthly") {
    addOnPriceOnline.innerText = monthly["online-service"];
    addOnPriceStorage.innerText = monthly["larger-storage"];
    addOnPriceCustom.innerText = monthly["customizable-profile"];
    return;
  }

  addOnPriceOnline.innerText = yearly["online-service"];
  addOnPriceStorage.innerText = yearly["larger-storage"];
  addOnPriceCustom.innerText = yearly["customizable-profile"];
}
updateAddOnPrices();
// step four summary jump back to the plans with the link
const changePlanLink = document.getElementById("jump-to-plans");

function handleChangePlanLink() {
  currentStep = 2;
  updateCurrentStepBtn();
  updateUI();
}

changePlanLink.addEventListener("click", handleChangePlanLink);

//handle the button when step 4 is displayed
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
