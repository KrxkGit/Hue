import {hexDecimalConvertObj, rgbHsvConvertObj} from "./convert.js";

const initColorElem = document.querySelector('#select-color');
const angleElem = document.querySelector('#angle');
const resultColorElem = document.querySelector('#result-color');

const calcFormElemList = document.querySelectorAll('.form-container');

calcFormElemList.forEach((elem) => {
    elem.addEventListener('submit', onSubmit);
})

function onSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const initColor = form['select-color'].value;
    const angle = form['angle'].value;

    const hsv = rgbHsvConvertObj.rgbToHsv(initColor);
    const updateHsv = rgbHsvConvertObj.rotateHue(hsv, angle);
    console.log(hsv);
    console.log(updateHsv);

    const hsvConvertRes = rgbHsvConvertObj.hsvToRgb(...Object.values(updateHsv));
    console.log(hsvConvertRes);

    const hexConvertRes = hexDecimalConvertObj.rgbToHex(...Object.values(hsvConvertRes));
    resultColorElem.value = hexConvertRes;
    console.log(resultColorElem.value)
}
