let currentStep = 1;

const btnGoBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');

const btnStepOne = document.getElementById('radio-step-one');
const btnStepTwo = document.getElementById('radio-step-two');
const btnStepThree = document.getElementById('radio-step-three');
const btnStepFour = document.getElementById('radio-step-four');

const stepBtns = [btnStepOne, btnStepTwo, btnStepThree, btnStepFour];

const stepOneWrapper = document.getElementById('step-one');
const stepTwoWrapper = document.getElementById('step-two');
const stepThreeWrapper = document.getElementById('step-three');
const stepFourWrapper = document.getElementById('step-four');
const stepFiveWrapper = document.getElementById('step-five');

const stepWrappers = [
  stepOneWrapper,
  stepTwoWrapper,
  stepThreeWrapper,
  stepFourWrapper,
];

const summaryPlanName = document.getElementById('summary-plan-name');
const summaryPlanPrice = document.getElementById('summary-plan-price');
const summaryTotal = document.getElementById('summary-total');
const summaryTotalBillFreq = document.getElementById(
  'summary-total-billing-freq',
);
const addOnSpanOnline = document.getElementById('add-on-span-online-service');
const addOnSpanStorage = document.getElementById('add-on-span-larger-storage');
const addOnSpanCustom = document.getElementById(
  'add-on-span-customizable-profile',
);

const monthly = {
  'Arcade plan': ['$9/mo', 9],
  'Advanced plan': ['$12/mo', 12],
  'Pro plan': ['$15/mo', 15],
  'online-service': ['1/mo', 1],
  'larger-storage': ['2/mo', 2],
  'customizable-profile': ['2/mo', 2],
};

const yearly = {
  'Arcade plan': ['$90/yr', 90],
  'Advanced plan': ['$120/yr', 120],
  'Pro plan': ['$150/yr', 150],
  'online-service': ['10/yr', 10],
  'larger-storage': ['20/yr', 20],
  'customizable-profile': ['20/yr', 20],
};

class SignUpObj {
  constructor() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.plan = '';
    this.billFreq = 'monthly';
    this.addOns = [];
    this.total = 0;
  }

  generateSummary() {
    this.total = 0;

    const summaryAddOns = Array.from(
      document.getElementsByClassName('summary-add-on-wrapper'),
    );
    summaryAddOns.forEach((addOn) => {
      addOn.style.display = 'none';
    });

    this.addOns.forEach((addOn) => {
      let addOnPrice;
      switch (this.billFreq) {
        case 'monthly':
          addOnPrice = monthly[addOn][0];
          this.total += monthly[addOn][1];
          break;
        case 'yearly':
          addOnPrice = yearly[addOn][0];
          this.total += yearly[addOn][1];
          break;
      }

      document.getElementById(`summary-span-${addOn}`).innerText = addOnPrice;
      document.getElementById(`summary-add-on-${addOn}`).style.display = 'flex';
    });

    summaryPlanName.innerText = this.plan;

    let planPrice;
    switch (this.billFreq) {
      case 'monthly':
        planPrice = monthly[this.plan][0];
        this.total += monthly[this.plan][1];
        break;
      case 'yearly':
        planPrice = yearly[this.plan][0];
        this.total += yearly[this.plan][1];
        break;
    }
    summaryPlanPrice.innerText = planPrice;
    summaryTotalBillFreq.innerText =
      this.billFreq === 'monthly' ? 'month' : 'year';
    summaryTotal.innerText = this.generateSummaryTotal();
  }
  generateSummaryTotal() {
    return this.total + (this.billFreq === 'monthly' ? '/mo' : '/yr');
  }

  generateReqObj() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      plan: this.plan,
      billFreq: this.billFreq,
      addOns: this.addOns,
    };
  }
}

const signUpObj = new SignUpObj();

const stepOneName = document.getElementById('name');
const stepOneEmail = document.getElementById('email');
const stepOnePhone = document.getElementById('phone');

const planInputArcade = document.getElementById('plan-arcade');
const planInputAdvanced = document.getElementById('plan-advanced');
const planInputPro = document.getElementById('plan-pro');

const planBtns = [planInputArcade, planInputAdvanced, planInputPro];

const addonInputOne = document.getElementById('add-on-one');
const addonInputTwo = document.getElementById('add-on-two');
const addonInputThree = document.getElementById('add-on-three');

const addOnBtns = [addonInputOne, addonInputTwo, addonInputThree];

function uncheckRadioBtns(elemArr) {
  elemArr.forEach((btn) => {
    btn.checked = false;
  });
}

uncheckRadioBtns(planBtns);
uncheckRadioBtns(addOnBtns);

function isAplanChecked() {
  let count = 0;
  planBtns.forEach((plan) => {
    if (plan.checked === true) {
      count++;
    }
  });
  return count;
}

// **********starts the code for switching steps*******************
// clear out current step
function clearSteps() {
  stepWrappers.forEach((wrapper) => {
    wrapper.style.display = 'none';
  });
}

// updates the radio btn in the sidebar
function updateCurrentStepBtn() {
  const newCurrentBtn = stepBtns.filter(
    (s) => s.dataset.step === currentStep.toString(),
  );
  newCurrentBtn[0].checked = true;
}
updateCurrentStepBtn();

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
const emptyFieldWarning = document.getElementById('step-one-warning');

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
    document.querySelector('aside').style.pointerEvents = 'auto';
  }
}

const btnsWrapper = document.getElementById('steps-buttons-wrapper');
const noPlanWarning = document.getElementById('step-two-warning');

function incrementCurrent() {
  if (stepOneFieldsComplete()) {
    if (currentStep === 2 && !isAplanChecked()) {
      noPlanWarning.style.display = 'block';
      return;
    }
    currentStep < 5 && currentStep++;
    if (currentStep === 4) signUpObj.generateSummary();
    if (currentStep === 5) {
      btnsWrapper.style.visibility = 'hidden';
      btnsWrapper.style.pointerEvents = 'none';
      clearSteps();
      document.querySelector('aside').style.pointerEvents = 'none';

      const radioWrappers = document.querySelectorAll('.radio-wrapper');
      radioWrappers.forEach((rw) => {
        rw.style.visibility = 'hidden';
      });

      stepFiveWrapper.style.display = 'grid';
      handleSendRequest();
      return;
    }
    updateCurrentStepBtn();
    updateUI();
    document.querySelector('aside').style.pointerEvents = 'auto';
    return;
  }
  emptyFieldWarning.style.display = 'block';
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
  emptyFieldWarning.style.display = 'none';
  const field = e.target;
  const value = field.value;
  const fieldName = field.name;
  signUpObj[fieldName] = value;

  if (e.target.value === '') {
    document.querySelector('aside').style.pointerEvents = 'none';
  }
}

persInfoArr.forEach((field) => {
  field.addEventListener('input', handleInfoFieldChange);
});

function updateUI() {
  currentStep === 1
    ? (btnGoBack.style.display = 'none')
    : (btnGoBack.style.display = 'block');
  clearSteps();
  const currWrapper = getStepWrapper();
  currWrapper.style.display = 'block';
  currentStep === 4 && updateBtnConfirm();
  currentStep <= 3 && resetBtnConfirm();
}

btnGoBack.addEventListener('click', decrementCurrent);
btnNext.addEventListener('click', incrementCurrent);

stepBtns.forEach((input) => {
  input.addEventListener('change', handleUpdateCurrent);
});
// **********ends the code for switching steps************

// ***********billing frequency********************
// slider
const planSlider = document.getElementById('plan-slider');
const slide = document.getElementById('slide');
const planMonthlyText = document.getElementById('plan-monthly');
const planYearlyText = document.getElementById('plan-yearly');
let billingFrequency = 'monthly';

function handleBillingFrequency() {
  if (billingFrequency === 'monthly') {
    billingFrequency = 'yearly';
    slide.style.right = '.125rem';
    planMonthlyText.classList.remove('slider-active');
    planYearlyText.classList.add('slider-active');
    updatePlanCardPrices();
    updateAddOnPrices();
    signUpObj.billFreq = 'yearly';
  } else {
    billingFrequency = 'monthly';
    slide.style.right = '1.125rem';
    planYearlyText.classList.remove('slider-active');
    planMonthlyText.classList.add('slider-active');
    updatePlanCardPrices();
    updateAddOnPrices();
    signUpObj.billFreq = 'monthly';
  }
}

planSlider.addEventListener('click', handleBillingFrequency);
// end slider
// update the plan cards
const plan1Price = document.getElementById('plan-span-1');
const plan2Price = document.getElementById('plan-span-2');
const plan3Price = document.getElementById('plan-span-3');
const twoFreeSpans = document.getElementsByClassName('two-free');

function updatePlanCardPrices() {
  if (billingFrequency === 'monthly') {
    plan1Price.innerText = monthly['Arcade plan'][0];
    plan2Price.innerText = monthly['Advanced plan'][0];
    plan3Price.innerText = monthly['Pro plan'][0];
    // remove the two free months text to the plan cards
    Array.from(twoFreeSpans).forEach((span) => span.classList.toggle('hide'));
    return;
  }

  plan1Price.innerText = yearly['Arcade plan'][0];
  plan2Price.innerText = yearly['Advanced plan'][0];
  plan3Price.innerText = yearly['Pro plan'][0];
  // add the two free months text to the plan cards
  Array.from(twoFreeSpans).forEach((span) => span.classList.toggle('hide'));
}

// this lets you click anywhere in the card to make that selection "checked"
const planCards = Array.from(document.getElementsByClassName('plan-card'));
planCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const input = e.target
      .closest('.plan-card')
      .querySelector("input[type='radio']");
    input.checked = true;
    const planName = input.value;
    signUpObj.plan = planName;
    noPlanWarning.style.display = 'none';
  });
});

// ********** end billing frequency*****************

// this does the same as the planCards code directly
// above for the add-on cards on step three
const addOnCards = Array.from(
  document.getElementsByClassName('add-on-wrapper'),
);
addOnCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const input = e.target
      .closest('.add-on-wrapper')
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

const addOnPriceOnline = document.getElementById('add-on-span-online-service');
const addOnPriceStorage = document.getElementById('add-on-span-larger-storage');
const addOnPriceCustom = document.getElementById(
  'add-on-span-customizable-profile',
);

function updateAddOnPrices() {
  if (billingFrequency === 'monthly') {
    addOnPriceOnline.innerText = monthly['online-service'][0];
    addOnPriceStorage.innerText = monthly['larger-storage'][0];
    addOnPriceCustom.innerText = monthly['customizable-profile'][0];
    return;
  }

  addOnPriceOnline.innerText = yearly['online-service'][1];
  addOnPriceStorage.innerText = yearly['larger-storage'][1];
  addOnPriceCustom.innerText = yearly['customizable-profile'][1];
}
updateAddOnPrices();
// step four summary jump back to the plans with the link
const changePlanLink = document.getElementById('jump-to-plans');

function handleChangePlanLink() {
  currentStep = 2;
  updateCurrentStepBtn();
  updateUI();
}

changePlanLink.addEventListener('click', handleChangePlanLink);

//handle the button when step 4 is displayed
function updateBtnConfirm() {
  btnNext.innerText = 'Confirm';
  btnNext.style.backgroundColor = 'hsl(243, 100%, 62%)';
  btnNext.addEventListener('mouseover', handleBtnConfirmHover);
  btnNext.addEventListener('mouseout', handleBtnConfirmHoverReset);
}

function handleBtnConfirmHover() {
  btnNext.style.backgroundColor = 'hsl(228, 37.40%, 71.20%)';
}

function handleBtnConfirmHoverReset() {
  btnNext.style.backgroundColor = 'hsl(243, 100%, 62%)';
}

function resetBtnConfirm() {
  btnNext.innerText = 'Next Step';
  btnNext.removeAttribute('style');
  btnNext.removeEventListener('mouseover', handleBtnConfirmHover);
  btnNext.removeEventListener('mouseout', handleBtnConfirmHoverReset);
}

function handleSendRequest() {
  const reqObj = signUpObj.generateReqObj();
  console.log(reqObj);
}
