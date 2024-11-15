"use strict";

var nameInputEl = document.getElementById("name"); // Input-fält för namn
var sizeSelectEl = document.getElementById("size"); // Select för storlek
var descriptionInputEl = document.getElementById("description"); // Input för beskrivning
var checkboxEl = document.getElementById("recommended"); // Checkbox för lång päls
var addCatBtn = document.getElementById("addCat"); // Knapp för att lägga till katt
var catTableBody = document.getElementById("catTBody");
var nameErrMsg = document.getElementById("nameErr");
var descriptionErrMsg = document.getElementById("descErr");

window.onload = init;
nameInputEl.addEventListener("keyup", checkInput, false);
descriptionInputEl.addEventListener("keyup", checkInput, false);
addCatBtn.addEventListener("click", addCat, false);

function init() {
    addCatBtn.disabled = true;

    if (localStorage.getItem("visited") === null) {
        let sampleData = [
            { name: "Pelle", size: "Medium", description: "Pelle har ingen svans för en råtta bet av den när han var liten.", recommended: "Ja" },
            {
                name: "Måns", size: "Medium", description: "Måns är en elak katt som brukar reta Pelle.",
            },
            { name: "Oliver", size: "Liten", description: "Gänget följer med på köpet.", recommended: "Ja" },
            { name: "Gustav", size: "Stor", description: "Orange. Älskar att äta lasagne", recommended: "Ja" },
            { name: "Mäster katten", size: "Medium", description: "Har stövlar.", recommended: "Ja" }
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
    if (name != "") {
        nameErrMsg.innerHTML = "";
    } else nameErrMsg.innerHTML = "Namn måste anges.";

    if (description != "") {
        descriptionErrMsg.innerHTML = "";
    } else descriptionErrMsg.innerHTML = "Beskrivning måste anges.";

    if (description.length > 150) {
        descriptionErrMsg.innerHTML = "Beskrivning får max vara 150 tecken."
        disableAddCatBtn();
    }

    // Om input OK, aktivera "lägg till katt"-knapp
    if (name != "" && description != "" && description.length <= 150) {
        addCatBtn.disabled = false;
        addCatBtn.classList.remove("opacity-50");
        addCatBtn.classList.remove("cursor-not-allowed");
        addCatBtn.classList.add("hover:bg-orange-800");
    } else {
        disableAddCatBtn();
    }
}

function disableAddCatBtn() {
    addCatBtn.disabled = true;
    addCatBtn.classList.add("opacity-50");
    addCatBtn.classList.add("cursor-not-allowed");
    addCatBtn.classList.remove("hover:bg-orange-800");
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

    nameInputEl.value = "";
    descriptionInputEl.value = "";
    disableAddCatBtn();
}


// Läs in data från localStorage
function loadStorage() {
    catTableBody.innerHTML = ""; // Tömmer tabellen innan ny utskrift

    const savedData = JSON.parse(localStorage.getItem('catData')); //Hämta ut data från localStorage
    if (savedData !== null) { // Om data finns
        for (let i = 0; i < savedData.length; i++) {
            let newRow = document.createElement("tr"); // Ny rad i tabell

            let nameData = document.createElement("td"); // Ny tabell-data element
            let nameText = document.createTextNode(savedData[i].name);
            nameData.appendChild(nameText);
            nameData.classList.add("p-4"); // Lägg till padding (TailwindCSS)
            newRow.appendChild(nameData);

            let sizeData = document.createElement("td"); // Ny tabell-data element
            let sizeText = document.createTextNode(savedData[i].size);
            sizeData.appendChild(sizeText);
            sizeData.classList.add("p-4");
            newRow.appendChild(sizeData);


            let descriptionData = document.createElement("td"); // Ny tabell-data element
            let descriptionText = document.createTextNode(savedData[i].description);
            descriptionData.appendChild(descriptionText);
            descriptionData.classList.add("p-4");
            newRow.appendChild(descriptionData);

            let recData = document.createElement("td"); // Ny tabell-data element
            let recText = document.createTextNode(savedData[i].recommended ? "Ja" : "Nej");
            recData.appendChild(recText);
            recData.classList.add("p-4");
            newRow.appendChild(recData);

            // Skapa ta bort-knapp
            let removeData = document.createElement("td");
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Radera";
            removeBtn.classList.add("bg-red-500", "text-white", "text-sm", "p-2", "rounded", "hover:bg-red-700", "focus:outline-none");
            removeBtn.onclick = function () {
                removeCat(i);
            };
            removeData.classList.add("py-4", "text-center");
            removeData.appendChild(removeBtn);
            newRow.appendChild(removeData);

            newRow.classList.add("hover:bg-blue-100", "hover:bg-opacity-50");
            newRow.classList.add("border-b")
            catTableBody.appendChild(newRow);
        }

    }
    else console.log("fel vid inläsning");
}

function removeCat(index) {
    let savedCats = JSON.parse(localStorage.getItem("catData"));
    savedCats.splice(index, 1);
    localStorage.setItem("catData", JSON.stringify(savedCats));
    loadStorage();
}

