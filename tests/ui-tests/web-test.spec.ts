import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { readDataFromExcelFile } from "../utils/readExcelSheetUtils";
import WebPage from "../pages/web-page";
import * as fs from "fs";
import path from "path";

let webPage: WebPage;

const excelDataProvider = readDataFromExcelFile("Datos-pruebas.xlsx");

const dirPath = path.resolve(__dirname, "../downloads");

test.beforeAll(async ({}) => {
  if (!fs.existsSync(dirPath)) {
    console.log("Creating folder to download images...");

    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    console.log("Downloads folder already exists. Overwriting image.");
  }
});

for (const lineFromExcel of excelDataProvider) {
  test(`Validate title, log author and save image for ${lineFromExcel.name} - @WebTest`, async ({
    page,
  }) => {
    webPage = new WebPage(page);
    // goto page
    await webPage.navigate(`${lineFromExcel.name}`);

    //Validate title
    const validateTitle = (await webPage.title.textContent())!.toLowerCase();

    expect(validateTitle).toEqual(`${lineFromExcel.name}`);

    //Log author of the image
    const logAuthor = await webPage.author.textContent();

    console.log(`Author: ${logAuthor}`);

    //Download image file
    await webPage.downloadImage(`${dirPath}/downloads`);

    //Verify each file size to be less than 500000 bytes
    const folderPath = dirPath;

    const getFiles = fs.readdirSync(folderPath);

    for (const file of getFiles) {
      const filePath = path.join(folderPath, file);

      const imageSizeValue = fs.readFileSync(filePath).length;

      expect(imageSizeValue).toBeLessThan(500000);
    }
  });
}
