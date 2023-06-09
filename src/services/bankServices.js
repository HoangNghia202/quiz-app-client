import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
export const getAllBank = async (token) => {
    try {
        let res = await axios.get(`${API_URL}/allBank`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
            return {
                data: res.data,
                message: res.message,
                errCode: 0,
            };
        }
    } catch (error) {
        console.log("error", error);
        return {
            data: null,
            message: error.response.data.message,
            errCode: 1,
        };
    }
};

export const getBankById = async (token, id) => {
    try {
        const res = await axios.get(`${API_URL}/bank/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
            return {
                data: res.data,
                message: res.message,
                errCode: 0,
            };
        }
    } catch (error) {
        return {
            data: null,
            message: error.response.data.message,
            errCode: 1,
        };
    }
};

export const addAccessedUser = async (token, bankId, userId) => {
    try {
        let res = await axios.post(
            `${API_URL}/addAccessedUser/${bankId}/${userId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (res.status === 200) {
            const res = await getAllBank(token);
            if (res.errCode === 0) {
                return {
                    data: res.data,
                    message: res.message,
                    errCode: 0,
                };
            }
        }
    } catch (error) {
        return {
            data: null,
            message: error.response.data.message,
            errCode: 1,
        };
    }
};

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

export const importBank = async (e, token) => {
    let res;
    const file = e.target.files[0];
    const reader = new FileReader();
    const bankModel = {
        bankName: "",
        desc: "",
        questions: [
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
    reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const worksheetName = workbook.SheetNames[0]; // Lấy tên của sheet đầu tiên
        const worksheet = workbook.Sheets[worksheetName];

        const cellB1 = worksheet["B1"]; // Truy cập vào ô B1
        const cellB2 = worksheet["B2"]; // Truy cập vào ô B2
        if (cellB1 && cellB1.v) {
            console.log("Value of B1:", cellB1.v);
            bankModel.bankName = cellB1.v;
        } else {
            console.log("title empty");
        }

        if (cellB2 && cellB2.v) {
            console.log("Value of B2:", cellB2.v);
            bankModel.desc = cellB2.v;
        } else {
            console.log("Desc empty", cellB1);
        }
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        const questions = [];
        for (let R = 4; R <= range.e.r; ++R) {
            const cellA = worksheet[XLSX.utils.encode_cell({ c: 0, r: R })];
            const cellB = worksheet[XLSX.utils.encode_cell({ c: 1, r: R })];
            const cellC = worksheet[XLSX.utils.encode_cell({ c: 2, r: R })];
            const cellD = worksheet[XLSX.utils.encode_cell({ c: 3, r: R })];
            const cellE = worksheet[XLSX.utils.encode_cell({ c: 4, r: R })];
            const cellF = worksheet[XLSX.utils.encode_cell({ c: 5, r: R })];

            const rowDataItem = {
                title: cellA?.v || "",
                ans1: cellB?.v || "",
                ans2: cellC?.v || "",
                ans3: cellD?.v || "",
                ans4: cellE?.v || "",
                solution: cellF?.v || "",
            };

            questions.push(rowDataItem);
        }

        console.log("questions:", questions);
        bankModel.questions = questions;
        console.log("bankModel", bankModel);

        const newBank = {
            bankName: bankModel.bankName,
            desc: bankModel.desc,
            questions: bankModel.questions,
            userAccessed: [],
        };
        console.log("newBank", newBank);

        try {
            res = await axios.post(`${API_URL}/createBank`, newBank, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("res Create Bank", res);
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Wrong format file template");
        }
    };

    reader.readAsArrayBuffer(file);
};
