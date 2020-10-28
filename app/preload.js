const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const configLink = document.getElementById("createConfigLink");
    if (configLink != null) {
        configLink.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("DOM: clicked on link");
            ipcRenderer.invoke("onUrlClicked").then(() => {
                console.log("processed onUrlClicked event")
            });
        });
    }

    const floodLog = document.querySelector(".floodLog");
    if (floodLog != null) {
        floodLog.addEventListener('input', () => {
            console.log(`DOM: Typed ${floodLog.value}`);
            ipcRenderer.invoke("onInputTyping", floodLog.value).then(() => {
                console.log("processed onInputTyping event")
            });
        });
    }

    const nextPage = document.getElementById("nextPage");
    if (nextPage != null) {
        nextPage.addEventListener('click', (e) => {
            e.preventDefault();
            ipcRenderer.invoke("goToSecondPage").then(() => {
                console.log("processed goToSecondPage event")
            });
        });
    }
    const prevPage = document.getElementById("prevPage");
    if (prevPage != null) {
        prevPage.addEventListener('click', (e) => {
            e.preventDefault();
            ipcRenderer.invoke("goToFirstPage").then(() => {
                console.log("processed goToFirstPage event")
            });
        });
    }
});