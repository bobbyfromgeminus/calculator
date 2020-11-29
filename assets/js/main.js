'use strict';

const projector = document.querySelector('.projector');                                             //  kijelző
const errorProjector = document.querySelector('.error-projector');                                  //  hibakijelző
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
const writeOpr = (i) => (isNaN(parseFloat(projector.textContent)) === true) ? errorProjector.classList.add('display-error') : projector.textContent = projector.textContent + ' ' + oprButtons[i].textContent + ' ';

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
    errorProjector.classList.remove('display-error');                                               //  hibakijelző elrejtése
}

//  EREDMÉNY SZÁMÍTÁSA
const getResult = () => {
    let result = 0;                                                                                 //  eredmény változó
    const projectorContent = projector.textContent;                                                 //  kijelző tartalma
    separateArray(splitArray(projectorContent));                                                    //  kijelző tartalmának felbontása és szeparálása
    result = numArray[0];                                                                           //  eredmény értékének növelése a szám tömb 0. elemével
    oprArray.forEach((item, index) => result = operatorsObject[item](result, numArray[index+1]));   //  műveleti tömb iterálása, műveletek elvégzése
    projector.textContent = result;                                                                 //  eredmény kiírása
    clearArrays();                                                                                  //  szám és operátor tömbök kiürítése
}

//  ESEMÉNYKEZELŐK IIFE-KÉNT MEGHÍVVA
(() => numButtons.forEach((element, index) => element.addEventListener('click', () => writeNum(index))))();
(() => oprButtons.forEach((element, index) => element.addEventListener('click', () => writeOpr(index))))();
(() => clrButton.addEventListener('click', clearProjector))();
(() => resButton.addEventListener('click', getResult))();