class SOTIETKIEM {
    constructor(maSo, loaiTietKiem, hoTen, cmnd, ngayMoSo, soTienGui) {
        this.maSo = maSo;
        this.loaiTietKiem = loaiTietKiem;
        this.hoTen = this.capitalizeWords(hoTen);
        this.cmnd = cmnd;
        this.ngayMoSo = ngayMoSo;
        this.soTienGui = soTienGui;
    }

    capitalizeWords(name) {
        return name
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    toHTMLRow() {
        return `
            <tr>
                <td>${this.maSo}</td>
                <td>${this.loaiTietKiem}</td>
                <td>${this.hoTen}</td>
                <td>${this.cmnd}</td>
                <td>${this.ngayMoSo}</td>
                <td>${this.soTienGui.toLocaleString()} VNĐ</td>
            </tr>
        `;
    }
}

const sotietkiemList = [
    new SOTIETKIEM("STK01", "Kỳ hạn", "Nguyen Van A", "123456789", "2024-05-01", 5000000),
    new SOTIETKIEM("STK02", "Không kỳ hạn", "Le Thi B", "987654321", "2024-03-15", 3000000),
    new SOTIETKIEM("STK03", "Kỳ hạn", "Tran Thi C", "135792468", "2024-09-08", 10000000),
];

function handleSubmit() {
    const maSo = document.getElementById("maSo").value.trim();
    const loaiTietKiem = document.getElementById("loaiTietKiem").value.trim();
    const hoTen = document.getElementById("hoTen").value.trim();
    const cmnd = document.getElementById("cmnd").value.trim();
    const ngayMoSo = document.getElementById("ngayMoSo").value;
    const soTienGui = parseFloat(document.getElementById("soTienGui").value);

    if (!maSo || maSo.length > 5) {
        alert("Mã sổ phải có tối đa 5 ký tự!");
        return;
    }
    if (sotietkiemList.some(item => item.maSo === maSo)) {
        alert("Mã sổ đã tồn tại! Vui lòng nhập mã khác.");
        return;
    }
    if (!loaiTietKiem || loaiTietKiem.length > 10) {
        alert("Loại tiết kiệm phải có tối đa 10 ký tự!");
        return;
    }
    if (!hoTen || hoTen.length > 30) {
        alert("Họ tên khách hàng phải có tối đa 30 ký tự!");
        return;
    }
    if (sotietkiemList.some(item => item.cmnd === cmnd)) {
        alert("CMND đã tồn tại! Vui lòng kiểm tra lại.");
        return;
    }
    if (!cmnd || cmnd.length > 15 || isNaN(cmnd)) {
        alert("CMND phải là số và có tối đa 15 ký tự!");
        return;
    }
    if (!ngayMoSo || !/^\d{4}-\d{2}-\d{2}$/.test(ngayMoSo)) {
        alert("Ngày mở sổ phải đúng định dạng YYYY-MM-DD!");
        return;
    }
    if (isNaN(soTienGui) || soTienGui <= 0) {
        alert("Số tiền gửi phải là số lớn hơn 0!");
        return;
    }

    const soTietKiem = new SOTIETKIEM(maSo, loaiTietKiem, hoTen, cmnd, ngayMoSo, soTienGui);
    sotietkiemList.push(soTietKiem);

    renderTable();

    document.getElementById("soTietKiemForm").reset();

    alert("Thông tin đã được lưu thành công!");
}

function renderTable() {
    const resultTable = document.getElementById("resultTable");
    const tbody = resultTable.querySelector("tbody");

    sotietkiemList.sort((a, b) => a.maSo.localeCompare(b.maSo));

    if (sotietkiemList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Danh sách trống</td></tr>`;
    } else {
        tbody.innerHTML = sotietkiemList.map(item => item.toHTMLRow()).join("");
    }

    resultTable.style.display = "table";
}


function handleDelete() {
    const maSo = prompt("Nhập mã sổ cần xóa:");
    if (!maSo) {
        alert("Bạn chưa nhập mã sổ!");
        return;
    }

    const index = sotietkiemList.findIndex(item => item.maSo === maSo.trim());
    if (index === -1) {
        alert("Mã sổ không tồn tại!");
        return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa sổ tiết kiệm với mã "${maSo}"?`)) {
        sotietkiemList.splice(index, 1);
        renderTable();
        alert(`Sổ tiết kiệm với mã "${maSo}" đã được xóa!`);
    }
}

document.addEventListener("DOMContentLoaded", renderTable);

function reloadPage() {
    location.reload();
}
