async function captureScreenshot(browser, options) {
const page = await browser.newPage();
await page.setViewport({ width: options.viewportWidth, height: 800 });

await page.goto(options.url, { waitUntil: options.waitUntil });

if (options.scrollToBottom) {
await autoScroll(page);
if (options.delayAfterScrolling) {
await page.waitForTimeout(options.delayAfterScrolling);
}
if (options.waitUntilNetworkIdleAfterScroll) {
await page.waitForNetworkIdle({ timeout: options.waitUntilNetworkIdleAfterScrollTimeout });
}
}

if (options.delay) {
await page.waitForTimeout(options.delay);
}

const screenshot = await page.screenshot({ fullPage: true });
await page.close();
return screenshot;
}

async function autoScroll(page) {
await page.evaluate(async () => {
await new Promise((resolve) => {
let totalHeight = 0;
const distance = 100;
const timer = setInterval(() => {
const scrollHeight = document.body.scrollHeight;
window.scrollBy(0, distance);
totalHeight += distance;

if (totalHeight >= scrollHeight - window.innerHeight) {
clearInterval(timer);
resolve();
}
}, 50);
});
});
}

module.exports = { captureScreenshot };