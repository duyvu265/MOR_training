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
        // Xử lý trường hợp nút "(" và ")"
        if (buttonText === "(" && resultArea.innerText === "0") {
            resultArea.innerText = buttonText;
        } else if (buttonText === ")" && resultArea.innerText !== "0") {
            resultArea.innerText += buttonText;
        }
        // Xử lý trường hợp chèn "." vào số hợp lệ
        else if (/[\d.]/.test(buttonText)) {
            // Kiểm tra xem có thêm "." vào số hiện tại không
            let lastNum = resultArea.innerText.split(/[-+\/*()]/).pop();
            if (!lastNum.includes(".")) {
                resultArea.innerText += buttonText;
            }
        }
        // Xử lý trường hợp chèn các toán tử
        else if (/[-+\/*]/.test(buttonText)) {
            // Kiểm tra xem có thể thay thế toán tử cuối cùng không
            let lastChar = resultArea.innerText.slice(-1);
            if (/[+\/*]/.test(lastChar) && /[-+\/*]/.test(buttonText)) {
                // Thay thế toán tử cuối cùng bằng toán tử mới
                resultArea.innerText = resultArea.innerText.slice(0, -1) + buttonText;
            } else if (lastChar !== "-" || !/[-+\/*]/.test(buttonText)) {
                // Tránh việc chèn nhiều dấu "-" hoặc nhiều toán tử liên tiếp
                resultArea.innerText += buttonText;
            }
        }
    }
}
