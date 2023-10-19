import * as XLSX from "xlsx/xlsx.mjs";

export const useExcel = () => {
  const getBase64 = (file) => {};

  const exportExcel = (data, nameSheet, nameFile, data2, nameSheet2, data3, nameSheet3) => {
    return new Promise((resolve, reject) => {
      let wb = XLSX.utils.book_new();

      let ws = XLSX.utils.json_to_sheet(data);
      let ws2 = data2 !== undefined  && XLSX.utils.json_to_sheet(data2);
      let ws3 = data3 !== undefined && XLSX.utils.json_to_sheet(data3);

      XLSX.utils.book_append_sheet(wb, ws, nameSheet);
      nameSheet2 !== undefined && XLSX.utils.book_append_sheet(wb, ws2, nameSheet2);
      nameSheet3 !== undefined && XLSX.utils.book_append_sheet(wb, ws3, nameSheet3);

      XLSX.writeFile(wb, `${nameFile}.xlsx`);
      resolve("ok");
    });
  };

  return exportExcel;
};
