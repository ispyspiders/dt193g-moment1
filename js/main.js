"use strict";

var nameInputEl = document.getElementById("name"); // Input-fält för namn
var sizeSelectEl = document.getElementById("size"); // Select för storlek
var descriptionInputEl = document.getElementById("description"); // Input för beskrivning
var checkboxEl = document.getElementById("recommended"); // Checkbox för lång päls
var addCatBtn = document.getElementById("addCat"); // Knapp för att lägga till katt
var clearStorageBtn = document.getElementById("clearStorageBtn"); // Knapp för att rensa tabell och localStorage
var catTableBody = document.getElementById("catTable").getElementsByTagName("tbody");


window.onload = init;
nameInputEl.addEventListener("keyup", checkInput, false);
descriptionInputEl.addEventListener("keyup", checkInput, false);
addCatBtn.addEventListener("click", addCat, false);
clearStorageBtn.addEventListener("click", clearStorage, false);

function init() {
    addCatBtn.disabled = true;

if(localStorage.getItem("visited")===null){
      let sampleData = [
            { name: "Pelle", size: "medium", description: "Pelle har ingen svans för en råtta bet av den när han var liten.", recommended: "Ja" },
            {
                name: "Måns", size: "medium", description: "Måns är en elak katt som brukar reta Pelle.",
            },
            { name: "Oliver", size: "liten", description: "Gänget följer med på köpet.", recommended: "Ja" },
            { name: "Gustav", size: "stor", description: "Orange. Älskar att äta lasagne", recommended: "Ja" },
            { name: "Mäster katten", size: "medium", description: "Har stövlar.", recommended: "Ja" }
        ]

        localStorage.setItem('catData', JSON.stringify(sampleData));
        localStorage.setItem("visited", true);
}


    loadStorage();
}


// Kontrollera input
function checkInput() {
    var name = nameInputEl.value;
    var description = descriptionInputEl.value;
    // Om input OK, aktivera "lägg till katt"-knapp
    if (name != "" && description != "") {
        addCatBtn.disabled = false;
    } else {
        addCatBtn.disabled = true;
    }
}

// Lägg till katt i localStorage och läs in till tabell 
function addCat(event) {
    event.preventDefault();
    saveCatData();
    loadStorage();
}

// Spara data till localStorage från formulär
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

// Visa data i tabell
function displayInCatTable(catData) {
    if (!Array.isArray(catData)) {
        catData = [];
    }
    const tableBody = document.getElementById('catTable').getElementsByTagName('tbody')[0];

    // Rensa innan tabell fylls på
    tableBody.innerHTML = "";

    // Lägg till rad för varje sparat objekt
    catData.forEach(function (item, index) {
        if (item && item.name && item.size && item.description !== undefined) {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = item.name;
            row.insertCell(1).textContent = item.size;
            row.insertCell(2).textContent = item.description;
            row.insertCell(3).textContent = item.recommended ? "Ja" : "Nej";
        }
    });
}

// Läs in data från localStorage
function loadStorage() {
    const savedData = JSON.parse(localStorage.getItem('catData')) || [];
    if (savedData.length > 0) {
        displayInCatTable(savedData);
    }
}

// Radera alla rader från tabellen
function deleteAllRows() {
    while (catTableBody.firstChild) {
        catTableBody.removeChild(catTableBody.firstChild);
    }
}

// Tar bort tabelldata ur tabell och localStorage, laddar om sidan
function clearStorage() {
    deleteAllRows();
    localStorage.removeItem("catData");
    location.reload();
}