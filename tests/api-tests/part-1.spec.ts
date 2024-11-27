import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { readDataFromExcelFile } from "../utils/readExcelSheetUtils";

const excelDataProvider = readDataFromExcelFile("Datos-pruebas.xlsx");

test.afterAll(async ({}) => {
  console.log(new Date().toString());
});

for (const lineFromExcel of excelDataProvider) {
  test(`Test GET request for ${lineFromExcel.name} - @API @API-Part-1`, async ({ request }) => {
    test.setTimeout(10000);

    const id = lineFromExcel.id;

    const name = lineFromExcel.name;

    const abilities = lineFromExcel.abilities.split(",");

    const response = await request.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    const responseBody = await response.text();

    expect(responseBody).toEqual(expect.stringContaining(`${id}`));

    expect(responseBody).toEqual(expect.stringContaining(`${name}`));

    for (let ability of abilities) {
      const eachAbility = ability.trim(" ");
      expect(responseBody).toEqual(expect.stringContaining(`${eachAbility}`));
    }
  });
}
