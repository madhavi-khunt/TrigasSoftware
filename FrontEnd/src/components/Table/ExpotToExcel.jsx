import * as XLSX from "xlsx";

export const exportToExcel = (rows, columns) => {
  // Create a new workbook and add a worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, {
    header: columns.map((col) => col.id),
  });

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Customers");

  // Create a download link and trigger the download
  XLSX.writeFile(wb, "CustomerData.xlsx");
};
