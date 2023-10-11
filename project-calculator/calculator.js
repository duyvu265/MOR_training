function ClickButton() {
    let resultArea = document.getElementById("result");
    let buttonText = event.target.innerText;

    if (buttonText === "CE") {
        resultArea.innerText = "0";
    } else if (buttonText === "=") {
        try {
            resultArea.innerText = eval(resultArea.innerText);
        } catch (error) {
            resultArea.innerText = "Error";
        }
    } else {
        if (buttonText === "(" && resultArea.innerText === "0") {
            resultArea.innerText = buttonText;
        } else if (buttonText === ")" && resultArea.innerText !== "0") {
            resultArea.innerText += buttonText;
        }
        else if (/[\d.]/.test(buttonText)) {
            let lastNum = resultArea.innerText.split(/[-+\/*()]/).pop();
            if (!lastNum.includes(".")) {
                resultArea.innerText += buttonText;
            }
        }
        else if (/[-+\/*]/.test(buttonText)) {
            let lastChar = resultArea.innerText.slice(-1);
            if (/[+\/*]/.test(lastChar) && /[-+\/*]/.test(buttonText)) {
                resultArea.innerText = resultArea.innerText.slice(0, -1) + buttonText;
            } else if (lastChar !== "-" || !/[-+\/*]/.test(buttonText)) {
                resultArea.innerText += buttonText;
            }
        }
    }
}
