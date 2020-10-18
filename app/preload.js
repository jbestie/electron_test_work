window.addEventListener('DOMContentLoaded', () => {
    const configLink = document.getElementById("createConfigLink");
    if (configLink != null) {
        document.getElementById("createConfigLink").addEventListener("click", () => {
            console.log("Clicked on Cat configuration creation link!");
        });
    }

    const floodLog = document.querySelector(".floodLog");
    if (floodLog != null) {
        document.querySelector(".floodLog").addEventListener('input', () => {
            console.log(floodLog.value);
        });
    }
});