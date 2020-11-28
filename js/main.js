'use strict';

const projector = document.querySelector('.projector');             //  kijelző
const numButtons = document.querySelectorAll('.num');               //  szám gombok
const oprButtons = document.querySelectorAll('.operation');         //  művelet gombok
const clrButton = document.querySelector('.clear');                 //  törlés gomb
const resButton = document.querySelector('.result');                //  eredmény gomb
const numArray = new Array;                                         //  számok tömbje
const oprArray = new Array;                                         //  műveletek tömbje

// operátorok műveletei egy objektumban
const operatorsObject = (opr, num1, num2) => {
    if (opr === '+') return (num1 + num2);
    else if (opr === '-') return (num1 - num2);
    else if (opr === 'x') return (num1 * num2);
    else if (opr === '÷') return (num1 / num2);
}

// Számok kiírása a kijelzőre
const writeNum = (i) => projector.textContent = projector.textContent + numButtons[i].textContent;

// Operátorok kiírása a kijelzőre
const writeOpr = (i) => projector.textContent = projector.textContent + ' ' + oprButtons[i].textContent + ' ';

// kijelző törlése
const clearProjector = () => projector.textContent = '';

// Eredmény számítása
const getResult = () => {
    let result = 0;
    const projectorContent = projector.textContent;
    separateArray(splitArray(projectorContent));
    // az eredmény értékét növelem a szám tömb 0. elemével
    result = numArray[0];
    // majd iterálom a műveleti tömböt és elvégzem a műveleteket a részeredmény és a műveletnél egyel nagyobb indexű szám között
    oprArray.forEach((element, index) => result = operatorsObject(element, result, numArray[index+1]));
    projector.textContent = result;
    // szám és operátor tömb kiürítése
    numArray.splice(0, numArray.length); 
    oprArray.splice(0, oprArray.length);
}

// Kijelző tartalmának szétvágása tömbbé
const splitArray = (element) => element.split(' ');

// Kijelző tömb szétválogatása számokra és operátorokra
const separateArray = (arr) => arr.forEach((element, index) => (index % 2 === 0) ? numArray.push(parseFloat(element)) : oprArray.push(element));
//                                                                                                   ^ itt majd vizsgálnom kell, hogy biztonságos-e a szám

// Eseménykezelők
const numButtonEvent = () => numButtons.forEach((element, index) => element.addEventListener('click', () => writeNum(index)));
const oprButtonEvent = () => oprButtons.forEach((element, index) => element.addEventListener('click', () => writeOpr(index)));
const clrButtonEvent = () => clrButton.addEventListener('click', clearProjector);
const resButtonEvent = () => resButton.addEventListener('click', getResult);

numButtonEvent();
oprButtonEvent();
clrButtonEvent();
resButtonEvent();