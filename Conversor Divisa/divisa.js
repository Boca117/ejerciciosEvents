let pesos = document.getElementById("pesos")
let dolar = document.getElementById("dolar")
const conversion = 4052.01

function pesoADolar() {
    dolar.value = parseFloat(pesos.value / conversion) 
}

function dolarAPeso() {
    pesos.value = parseFloat(dolar.value * conversion)
}

pesos.addEventListener("input", pesoADolar)
dolar.addEventListener("input", dolarAPeso)