const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const buttonCalculate = document.querySelector('.button');
const dateResult = document.querySelector('.dateResult');

function calculate() {
    let heightValue = height.value;
    let weightValue = weight.value;
    if (heightValue != "" && weightValue != "") {
        heightValue = parseInt(heightValue) / 100;
        weightValue = parseInt(weightValue);
        let result = weightValue / (heightValue ** 2);
        dateResult.value = result.toFixed(2);
    } else {
        dateResult.value = 0.0;
    }
}

buttonCalculate.addEventListener('click', () => { calculate() });