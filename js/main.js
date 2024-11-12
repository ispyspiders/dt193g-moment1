"use strict";

var nameInputEl = document.getElementById("name"); // Input-fält för namn
var sizeSelectEl = document.getElementById("size"); // Select för storlek
var descriptionInputEl = document.getElementById("description"); // Input för beskrivning
var checkboxEl = document.getElementById("recommended"); // Checkbox för lång päls
var addCatBtn = document.getElementById("addCat"); // Knapp för att lägga till katt

window.onload = init;
nameInputEl.addEventListener("keyup", checkInput, false);
descriptionInputEl.addEventListener("keyup", checkInput, false);
addCatBtn.addEventListener("click", addCat, false);


function init() {
    addCatBtn.disabled = true;
    loadStorage();
}

function checkInput() {
    var name = nameInputEl.value;
    var description = descriptionInputEl.value;
    if (name != "" && description != "") {
        addCatBtn.disabled = false;
    } else {
        addCatBtn.disabled = true;
    }
}

function addCat(event) {
    event.preventDefault();

    saveCatData();
    loadStorage();

}


function saveCatData() {
    // Hämta värden från fomulär
    const name = nameInputEl.value;
    const size = sizeSelectEl.value;
    const description = descriptionInputEl.value;
    const recommended = checkboxEl.checked;

    // Skapa ett objekt med formulärdata
    const catData = {
        name: name,
        size: size,
        description: description,
        recommended: recommended
    };

    // Läs in catData från localstorage om den finns, annars tom array
    let savedCats = JSON.parse(localStorage.getItem('catData')) || [];

    // Lägg till nytt objekt i array
    savedCats.push(catData);

    // Spara till localStorage
    localStorage.setItem('catData', JSON.stringify(savedCats));

}

function displayInCatTable(catData) {
    if (!Array.isArray(catData)) {
        catData = [];
    }
    const tableBody = document.getElementById('catTable').getElementsByTagName('tbody')[0];

    // Rensa innan tabell fylls på
    tableBody.innerHTML = "";

    // Lägg till rad för varje sparat objekt
    catData.forEach(function (item, index) {
        if(item && item.name && item.size && item.description !== undefined){
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = item.name;
            row.insertCell(1).textContent = item.size;
            row.insertCell(2).textContent = item.description;
            row.insertCell(3).textContent = item.recommended ? "Ja" : "Nej";
        }
    });
}

function loadStorage() {
    const savedData = JSON.parse(localStorage.getItem('catData')) || [];
    if (savedData.length > 0) {
        displayInCatTable(savedData);
    }
}
