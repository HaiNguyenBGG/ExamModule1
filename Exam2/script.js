function areFractionsEqual(numerator1, denominator1, numerator2, denominator2) {
    return numerator1 * denominator2 === numerator2 * denominator1;
}

function getValidNumber(promptMessage, allowZero = true) {
    let value;
    do {
        value = prompt(promptMessage);
        if (isNaN(value) || value.trim() === "") {
            console.log("Vui lòng nhập một số hợp lệ!");
        } else {
            value = parseInt(value);
            if (!allowZero && value === 0) {
                console.log("Giá trị không được bằng 0. Vui lòng nhập lại!");
                value = NaN;
            }
        }
    } while (isNaN(value));
    return value;
}

function main() {
    let numerator1 = getValidNumber("Nhập tử số của phân số thứ nhất: ");
    let denominator1 = getValidNumber("Nhập mẫu số của phân số thứ nhất (khác 0): ", false);

    let numerator2 = getValidNumber("Nhập tử số của phân số thứ hai: ");
    let denominator2 = getValidNumber("Nhập mẫu số của phân số thứ hai (khác 0): ", false);

    console.log(`Phân số thứ nhất: ${numerator1}/${denominator1}`);
    console.log(`Phân số thứ hai: ${numerator2}/${denominator2}`);

    if (areFractionsEqual(numerator1, denominator1, numerator2, denominator2)) {
        console.log("Hai phân số bằng nhau.");
    } else {
        console.log("Hai phân số không bằng nhau.");
    }
}

main();
