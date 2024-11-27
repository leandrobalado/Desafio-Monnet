import { expect, Locator, Page } from "@playwright/test";
import * as fs from "fs";
import path from "path";

class WebPage {
  readonly page: Page;
  readonly title: Locator;
  readonly author: Locator;
  readonly image: Locator;
  readonly downloadButton: Locator;
  readonly confirmDownload: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.locator('[class="mw-page-title-main"]');

    this.author = page.locator('[class="infobox-caption"]');

    this.image = page.locator(
      '[class="infobox ib-character"] img[class="mw-file-element"]'
    );

    this.downloadButton = page.getByTitle("Download this file", {
      exact: true,
    });

    this.confirmDownload = page.getByRole("link", { name: "Download" });
  }

  async navigate(pokemonName: string) {
    await this.page.goto(`https://en.wikipedia.org/wiki/${pokemonName}`);
  }

  async downloadImage(folder: string) {
    await this.image.click();

    await this.downloadButton.click();

    const downloadPromise = this.page.waitForEvent("download");

    await this.confirmDownload.click();

    const waitDownload = await downloadPromise;

    await waitDownload.saveAs(folder + waitDownload.suggestedFilename());

    const imageExtension = waitDownload
      .suggestedFilename()
      .toLowerCase()
      .split(".")[1];

    if (
      imageExtension == "jpg" ||
      imageExtension == "jpeg" ||
      imageExtension == "png" ||
      imageExtension == "svg"
    ) {
      expect(imageExtension).toBeTruthy();
    } else {
      console.error("Invalid image format extension.");
    }
  }
}

export default WebPage;
