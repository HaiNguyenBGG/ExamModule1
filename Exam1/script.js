function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function main() {
    let n;
    do {
        n = parseInt(prompt("Nhập số phần tử của mảng (1 <= n <= 50): "));
    } while (isNaN(n) || n <= 0 || n > 50);
    let a = [];
    let i = 0;
    while (i < n) {
        let value = parseInt(prompt(`Nhập phần tử thứ ${i + 1}: `));
        if (!isNaN(value)) {
            a.push(value);
            i++;
        } else {
            console.log("Vui lòng nhập một số nguyên hợp lệ!");
        }
    }

    let b = a.filter(isPrime);

    console.log("Mảng a vừa nhập:", a);
    console.log("Mảng b chứa các số nguyên tố:", b);
}

main();