import * as fs from "fs";
import * as path from "path";
import XLSX from "xlsx";

const excelFolderPath = path.join(__dirname, "../test-data/");

export function readDataFromExcelFile(fileName: string) {
  const fullPath = excelFolderPath + fileName;

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Cannot find file ${fullPath}. Please, verify it exists.`);
  }

  const workbook = XLSX.readFile(fullPath);

  const dataFromSheet = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  return dataFromSheet;
}
