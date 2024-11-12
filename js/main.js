"use strict";

var nameInputEl = document.getElementById("name"); // Input-fält för namn
var sizeSelectEl = document.getElementById("size"); // Select för storlek
var descriptionInputEl = document.getElementById("description"); // Input för beskrivning
var checkboxEl = document.getElementById("recommended"); // Checkbox för lång päls
var addCatBtn = document.getElementById("addCat"); // Knapp för att lägga till katt

window.onload = init;
nameInputEl.addEventListener("keyup", checkInput, false);
descriptionInputEl.addEventListener("keyup", checkInput, false);

function init() {
    addCatBtn.disabled = true;
}

function checkInput() {
    var name = nameInputEl.value;
    var description = descriptionInputEl.value;
    if (name != "" && description != "") {
        addCatBtn.disabled = false;
        // Lägg till katt

    } else {
        addCatBtn.disabled = true;
    }
}



