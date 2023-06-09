import React from "react";
import * as XLSX from "xlsx";

export const createExcelTemplate = () => {
    // Dữ liệu mẫu
    const templateData = {
        bankName: "",
        desc: "",
        ques: [
            {
                title: "",
                ans1: "",
                ans2: "",
                ans3: "",
                ans4: "",
                solution: "",
            },
        ],
    };

    // Tạo workbook mới
    const workbook = XLSX.utils.book_new();

    // Tạo sheet
    const sheetName = "Bank Template";
    const sheetData = [];

    // Thêm dữ liệu từ mẫu
    sheetData.push(["Bank Name:", templateData.bankName]);
    sheetData.push(["Description:", templateData.desc]);
    sheetData.push([]);
    sheetData.push([
        "Question Title",
        "Answer 1",
        "Answer 2",
        "Answer 3",
        "Answer 4",
        "Solution",
    ]);

    // Thêm dòng trống cho việc nhập liệu
    sheetData.push(["", "", "", "", "", ""]);

    // Tạo worksheet từ dữ liệu sheet
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Thiết lập độ rộng cột
    const columnWidths = [
        { wch: 30 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 10 },
    ];
    worksheet["!cols"] = columnWidths;

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Lưu file template
    XLSX.writeFile(workbook, "bank_template.xlsx");
};
