const API_KEY = '2b9ccfaf1748e772c84ba8ab';
const apiURL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/COP`;

const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInpunt = document.getElementById('amount');
const resultInpunt = document.getElementById('result');
const convertButton = document.getElementById('convert');

let rates;
let count = [];

// Obtenemos las tasas de cambio de la API
fetch(apiURL).then(response => response.json()).then(data => {
    rates = data.conversion_rates;
    populateSelects();
    cargar();
}).catch(error => { console.error(error) });

// Agregamos las opciones al select
function populateSelects() {
    for (const currency in rates) {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = currency;
        fromSelect.appendChild(option);
        toSelect.appendChild(option.cloneNode(true));
        count.push(currency);
    }
}

function cargar(){
    let random = parseInt(Math.random() * count.length);
    console.log(count[random]);
    const fromCurrency = fromSelect.value;
    toSelect.value = [count[random]];
    amountInpunt.value = rates[fromCurrency];
    resultInpunt.value = rates[count[random]];
}

// Realizamos la conversión y actualizams el campo de resultado
function convertCurrency() {
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;
    const amount = parseFloat(amountInpunt.value);

    if (isNaN(amount)) {
        resultInpunt.value = '';
        return;
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    
    const result = amount / fromRate * toRate;
    resultInpunt.value = result.toFixed(2);
}

convertButton.addEventListener('click', convertCurrency);