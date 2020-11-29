'use strict';

const projector = document.querySelector('.projector');                                             //  kijelző
const infoProjector = document.querySelector('.info-projector');                                    //  hibakijelző
const numButtons = document.querySelectorAll('.num');                                               //  szám gombok
const oprButtons = document.querySelectorAll('.operation');                                         //  művelet gombok
const clrButton = document.querySelector('.clear');                                                 //  törlés gomb
const resButton = document.querySelector('.result');                                                //  eredmény gomb
const numArray = new Array;                                                                         //  számok tömbje
const oprArray = new Array;                                                                         //  műveletek tömbje

// OPERÁTOROK MŰVELETEI EGY OBJEKTUMBAN
const operatorsObject = {
    '+': (num1, num2) => (num1 + num2),                                                             //  összeadás
    '-': (num1, num2) => (num1 - num2),                                                             //  kivonás
    'x': (num1, num2) => (num1 * num2),                                                             //  szorzás
    '÷': (num1, num2) => (num1 / num2)                                                              //  osztás
};

//  SZÁMOK KIÍRÁSA A KIJELZŐRE
const writeNum = (i) => projector.textContent = projector.textContent + numButtons[i].textContent;

//  OPERÁTOROK KIÍRÁSA A KIJELZŐRE - VIZSGÁLATTAL KIEGÉSZÍTVE: NEM KEZDHETÜNK MŰVELETTEL
const writeOpr = (i) => (isNaN(parseFloat(projector.textContent)) === true) ? writeError() : projector.textContent = projector.textContent + ' ' + oprButtons[i].textContent + ' ';

//  KIJELZŐ TARTALMÁNAK SZÉTVÁGÁSA TÖMBBÉ
const splitArray = (element) => element.split(' ');

//  KIJELZŐ TÖMB SZÉTVÁLOGATÁSA SZÁMOKRA ÉS OPERÁTOROKRA
const separateArray = (arr) => arr.forEach((element, index) => (index % 2 === 0) ? numArray.push(parseFloat(element)) : oprArray.push(element));

//  KIJELZŐ TÖRLÉSE
const clearProjector = () => projector.textContent = '';

//  TÖMBÖK KIÜRÍTÉSE
const clearArrays = () => {
    numArray.splice(0, numArray.length);                                                            //  szám tömb kiürítése
    oprArray.splice(0, oprArray.length);                                                            //  operátor tömb kiürítése
    infoProjector.classList.remove('display-error');                                                //  hibakijelző elrejtése
    infoProjector.classList.remove('display-line');                                                 //  hibakijelző elrejtése
}

const writeError = () => {
    infoProjector.textContent = 'Hiba: nem kezdhetsz műveleti jellel!';                             //  hibaüzenet átadása
    infoProjector.classList.add('display-error')                                                    //  info kijelző error állapotának átadása
}

//  EREDMÉNY SZÁMÍTÁSA
const getResult = () => {
    let result = 0;                                                                                 //  eredmény változó
    const projectorContent = projector.textContent;                                                 //  kijelző tartalma
    separateArray(splitArray(projectorContent));                                                    //  kijelző tartalmának felbontása és szeparálása
    result = numArray[0];                                                                           //  eredmény értékének növelése a szám tömb 0. elemével
    oprArray.forEach((item, index) => result = operatorsObject[item](result, numArray[index+1]));   //  műveleti tömb iterálása, műveletek elvégzése
    infoProjector.textContent = `${projectorContent} =`;                                            //  műveleti sor kiírása az info sávra
    infoProjector.classList.add('display-line');                                                    //  info sáv megjelenítése a műveleti sorral
    projector.textContent = result;                                                                 //  eredmény kiírása
}

//  ESEMÉNYKEZELŐK IIFE-KÉNT MEGHÍVVA
(() => numButtons.forEach((element, index) => element.addEventListener('click', () => writeNum(index))))();
(() => oprButtons.forEach((element, index) => element.addEventListener('click', () => writeOpr(index))))();
(() => infoProjector.addEventListener('webkitAnimationEnd', clearArrays))();
(() => clrButton.addEventListener('click', clearProjector))();
(() => resButton.addEventListener('click', getResult))();