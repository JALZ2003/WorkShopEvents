const API_KEY = '2b9ccfaf1748e772c84ba8ab';
const apiURL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/COP`;

const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInpunt = document.getElementById('amount');
const resultInpunt = document.getElementById('result');
const convertButton = document.getElementById('convert');

let rates;
let count = [];


amountInpunt.addEventListener('input', () => {
    convertCurrency(amountInpunt, fromSelect, toSelect, resultInpunt);
});

resultInpunt.addEventListener('input', () => {
    convertCurrency(resultInpunt, toSelect, fromSelect, amountInpunt);
});

fromSelect.addEventListener('change', () => { selects(fromSelect, toSelect) });

toSelect.addEventListener('change', () => { selects(fromSelect, toSelect) });

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

function cargar() {
    let random = parseInt(Math.random() * count.length);
    const fromCurrency = fromSelect.value;
    toSelect.value = [count[random]];
    amountInpunt.value = rates[fromCurrency];
    resultInpunt.value = rates[count[random]];
}

// Realizamos la conversión y actualizams el campo de resultado
function convertCurrency(value, fromCurrency, toCurrency, result) {
    const amount = parseFloat(value.value);
    if (isNaN(amount)) {
        result.value = '';
        return;
    }
    const fromRate = rates[fromCurrency.value];
    const toRate = rates[toCurrency.value];
    const operation = operations(amount, fromRate, toRate);
    result.value = operation.toFixed(2);
}

function selects(fromSelect, toSelect) {
    console.log(fromSelect.value, toSelect.value);
    amountInpunt.value = rates[fromSelect.value];
    resultInpunt.value = rates[toSelect.value];
}

let operations = (amount, fromRate, toRate) => { return amount / fromRate * toRate };