// Selection

const inputSection = document.getElementById("input-section");
const outputSection = document.getElementById("output-section");
const QR = document.getElementById("qr");
const form = document.getElementById("form");
const url = document.getElementById("url");
const errMessage = document.getElementById("errMessage");
const downloadBTN = document.getElementById("downloadBtn");
const shareBTN = document.getElementById("shareBtn");

// Input section

form.addEventListener("submit", e => {
    e.preventDefault();

    const REGEX = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
    const validation = REGEX.test(url.value);

    if(validation) {
        QR.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${url.value}`;
        errMessage.innerHTML = "";
        inputSection.style.display = "none";
        outputSection.style.display = "flex";
    } else {
        errMessage.innerHTML = "Please enter a valid url";
    }
});

// Output section

downloadBTN.addEventListener("click", async () => {
    const response = await fetch(QR.src);
    const blob = await response.blob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "qrcode.jpg";
    downloadLink.click();
});

shareBTN.addEventListener("click", () => {
    if(navigator.share) {
        navigator.share({
            title: "Share QR Code",
            text: "QR Code",
            url: url.value
        })
    } else navigator.clipboard.writeText();
});