import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const dest = path.join("docs", "portfolio", "visual-atlas", "poster-tests");
fs.mkdirSync(dest, { recursive: true });

const browser = await puppeteer.launch({
  executablePath:
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
await page.evaluateOnNewDocument(() => {
  window.matchMedia = (query) => {
    const matches =
      query.includes("prefers-reduced-motion") && query.includes("reduce");
    return {
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };
});

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));

const names = [
  "01-air",
  "02-mid",
  "03-nocturne",
  "04-index",
  "05-storey",
  "06-close",
];

const rooms = await page.$$("#main-content section");
for (let i = 0; i < rooms.length; i++) {
  await rooms[i].screenshot({
    path: path.join(dest, `sprint12-${names[i]}.png`),
  });
}

const client = await page.createCDPSession();
const { data } = await client.send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  fromSurface: true,
});
fs.writeFileSync(
  path.join(dest, "sprint12-continuous.png"),
  Buffer.from(data, "base64"),
);

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.reload({ waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({
  path: path.join(dest, "sprint12-mobile.png"),
  clip: { x: 0, y: 0, width: 390, height: 844 },
});

console.log("ok", rooms.length);
await browser.close();
