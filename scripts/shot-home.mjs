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
  const reduced = "(prefers-reduced-motion: reduce)";
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
  void reduced;
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
    path: path.join(dest, `sprint11-${names[i]}.png`),
  });
}

const tops = await page.$$eval("#main-content section", (els) =>
  els.map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY)),
);

for (let i = 0; i < tops.length - 1; i++) {
  const seamY = Math.max(0, Math.round((tops[i] + tops[i + 1]) / 2) - 450);
  await page.evaluate((y) => window.scrollTo(0, y), seamY);
  await new Promise((r) => setTimeout(r, 300));
  const at = await page.evaluate(() => window.scrollY);
  await page.screenshot({
    path: path.join(dest, `sprint11-seam-${String(i + 1).padStart(2, "0")}.png`),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log("seam", i + 1, "y", seamY, "at", at);
}

const total = await page.evaluate(() => document.documentElement.scrollHeight);
const slices = [];
const sliceH = 900;
for (let y = 0; y < total; y += sliceH) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 200));
  const file = path.join(dest, `_slice-${y}.png`);
  await page.screenshot({
    path: file,
    clip: { x: 0, y: 0, width: 1440, height: Math.min(sliceH, total - y) },
  });
  slices.push(file);
}

// Stitch with pure canvas via puppeteer page
const heights = [];
for (const f of slices) {
  const buf = fs.readFileSync(f);
  // use sharp if unavailable — keep slices and also write a long page via CDP
  heights.push(buf.length);
}

// CDP full document screenshot without lenis
const client = await page.createCDPSession();
const { data } = await client.send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  fromSurface: true,
});
fs.writeFileSync(
  path.join(dest, "sprint11-continuous.png"),
  Buffer.from(data, "base64"),
);

for (const f of slices) fs.unlinkSync(f);

console.log("done", { tops, total, rooms: rooms.length });
await browser.close();
