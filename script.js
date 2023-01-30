const billInput = document.querySelector('.bill-input');
const buttons = document.querySelectorAll('.buttons');
const buttonSelected = document.getElementsByClassName('active'); 
const customTip = document.querySelector('.tip-custom'); //needs revisiting if function dont work.
const peopleInput = document.querySelector('.people-input');
const errorMessage = document.querySelector('.if-zero-number');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const resetButton = document.querySelector('.reset-btn');
const inputs = document.querySelectorAll('.input');

/*------------------Event Listeners-----------------------*/
billInput.addEventListener("input", calculate);
buttons.forEach((button) => {
  button.addEventListener("click", calculateTip);
})
customTip.addEventListener("click", calculateCustomTip);
peopleInput.addEventListener("input", calculate);
resetButton.addEventListener("click", resetButtonFun);

resetButton.addEventListener('mouseenter', ()=>{
  resetButton.style.backgroundColor = 'hsl(185, 41%, 84%)';
});

resetButton.addEventListener('mouseleave', ()=>{
  resetButton.style.backgroundColor = '';
});

/*-------------------Functions ----------------------------*/
billInput.oninput = function(){
  resetButtonStatus();

  if(customTip.value !== '' && (peopleInput.value !== '' || peopleInput.value > 0) ){
      calculate();
  }
  
}

customTip.oninput = function(){  
  resetButtonStatus();
  
  if((billInput.value !== '' || billInput.value < 0) && (peopleInput.value !== '' || peopleInput.value > 0) ){
      calculate();
  }
}


peopleInput.oninput = function (){ 
  resetButtonStatus();
  if(peopleInput.value <= 0 || peopleInput.value ===""){
    errorMessage.innerHTML = "add the number of people paying";
    errorMessage.style.color = 'red';
    peopleInput.style.borderColor = 'red';
    tipAmount.innerHTML = "---";
    totalAmount.innerHTML = "---";
  }else{
    errorMessage.innerText = ``;
    peopleInput.style.borderColor = '';
    calculate();
}   
}


function calculate(){
  let tipPerPerson;
  let totalPerPerson;
  let tipPercentage;

  if(buttonSelected.length == 0){
    tipPercentage = 0;
}else{ if(customTip.classList.contains('active')){
    tipPercentage = customTip.value;
  }else{
    tipPercentage = buttonSelected[0].value;}
};

tipPerPerson = (billInput.value * tipPercentage * 0.01)/peopleInput.value;
totalPerPerson = (billInput.value/peopleInput.value) + tipPerPerson;
tipPerPerson = tipPerPerson.toFixed(2);
totalPerPerson = totalPerPerson.toFixed(2);

tipAmount.innerHTML = `$${tipPerPerson}`;
totalAmount.innerHTML =  `$${totalPerPerson}`;
}



function calculateTip(){
  buttons.forEach((button) => {
      button.classList.remove('active');
  });
  this.classList.add('active');
  customTip.classList.remove('active');
  calculate();
}

function calculateCustomTip(){
  buttons.forEach((button) => {
      button.classList.remove('active');
  });1
  this.classList.add('active');
  
  if((billInput.value !== '' || billInput.value < 0) && (peopleInput.value !== '' || peopleInput.value > 0) ){
      calculate();
  }
}

function resetButtonStatus(){
  if(customTip.value === '' && billInput.value === '' && peopleInput.value === ''){
    resetButton.disabled = true;
    resetButton.classList.remove('has-reset-activated');
    peopleInput.style.borderColor = '';
}else{
    resetButton.disabled = false;
    resetButton.classList.add('has-reset-activated');       
}
}

function resetButtonFun() {
  buttons.forEach((button) => {
    button.classList.remove('active');
});

inputs.forEach((input) => {
    input.value = '';
});

tipAmount.innerText = '$0.00';
totalAmount.innerText = '$0.00';

resetButton.disabled = true;
errorMessage.innerText = ``;
peopleInput.style.borderColor = ''
resetButton.classList.remove('has-reset-activated');
resetButton.style.backgroundColor = '';
}