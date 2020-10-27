const { remote } = require('electron');
const mainProcess = remote.require('./main.js');

window.addEventListener('DOMContentLoaded', () => {
    const configLink = document.getElementById("createConfigLink");
    if (configLink != null) {
        configLink.addEventListener("click", () => {
            console.log("DOM: clicked on link");
            mainProcess.onUrlClick();
        });
    }

    const floodLog = document.querySelector(".floodLog");
    if (floodLog != null) {
        floodLog.addEventListener('input', () => {
            console.log(`DOM: Typed ${floodLog.value}`);
            mainProcess.onInputTyping(floodLog.value);
        });
    }

    const nextPage = document.getElementById("nextPage");
    if (nextPage != null) {
        nextPage.addEventListener('click', (e) => {
            e.preventDefault();
            mainProcess.goToSecondPage();
        });
    }
    const prevPage = document.getElementById("prevPage");
    if (prevPage != null) {
        prevPage.addEventListener('click', (e) => {
            e.preventDefault();
            mainProcess.goToFirstPage();
        });
    }
});