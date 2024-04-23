import { saveAs } from "file-saver";

export const exportToCsv = (tickets, columns) => {
  // Filter the columns based on their visibility
  const visibleColumns = Object.keys(columns).filter((column) => columns[column]);

  // Create the CSV header based on visible columns
  const csvHeader = visibleColumns.join(",");

  const csvContent =
    csvHeader +
    "\n" +
    tickets.map((ticket) => {
      return visibleColumns.map((column) => ticket[column]).join(",");
    }).join("\n");

  const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  saveAs(csvBlob, "tickets.csv");
};