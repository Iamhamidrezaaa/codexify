import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const dest = path.join("docs", "portfolio", "visual-atlas", "poster-tests");
fs.mkdirSync(dest, { recursive: true });

const browser = await puppeteer.launch({
  executablePath:
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--hide-scrollbars", "--force-prefers-reduced-motion"],
});

const page = await browser.newPage();
await page.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "reduce" },
]);
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1200));

const names = [
  "01-air",
  "02-mid",
  "03-nocturne",
  "04-index",
  "05-storey",
  "06-close",
];

const sections = await page.$$("main > section");
console.log("sections", sections.length);

for (let i = 0; i < sections.length; i++) {
  await sections[i].screenshot({
    path: path.join(dest, `sprint10-${names[i]}.png`),
  });
  console.log("shot", names[i]);
}

await sections[0].screenshot({
  path: path.join(dest, "sprint10-hero.png"),
});

await browser.close();
console.log("done");
