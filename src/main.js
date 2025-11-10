onst fs = require('fs');
const path = require('path');
const { launchBrowser } = require('./utils/browser');
const { captureScreenshot } = require('./utils/screenshot');
const { saveOutput } = require('./utils/storage');
const defaults = require('./config/defaults.json');
require('dotenv').config();

async function main() {
const inputFilePath = path.join(__dirname, '../data/sample-input.json');
const outputFilePath = path.join(__dirname, '../data/sample-output.json');

let tasks;
try {
tasks = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
} catch (err) {
console.error('Failed to read input JSON:', err);
process.exit(1);
}

const browser = await launchBrowser();
const results = [];

for (const task of tasks) {
try {
const screenshotBuffer = await captureScreenshot(browser, {
url: task.url,
waitUntil: task.waitUntil || defaults.waitUntil,
delay: task.delay || defaults.delay,
viewportWidth: task.viewportWidth || defaults.viewportWidth,
scrollToBottom: task.scrollToBottom ?? defaults.scrollToBottom,
delayAfterScrolling: task.delayAfterScrolling || defaults.delayAfterScrolling,
waitUntilNetworkIdleAfterScroll: task.waitUntilNetworkIdleAfterScroll ?? defaults.waitUntilNetworkIdleAfterScroll,
waitUntilNetworkIdleAfterScrollTimeout: task.waitUntilNetworkIdleAfterScrollTimeout || defaults.waitUntilNetworkIdleAfterScrollTimeout
});

const outputPath = path.join(__dirname, '../', task.output || `${process.env.OUTPUT_DIR || 'OUTPUT'}/screenshot-${Date.now()}.png`);
await saveOutput(outputPath, screenshotBuffer);

results.push({ ...task, output: outputPath, success: true });
} catch (err) {
console.error('Screenshot failed for', task.url, err);
results.push({ ...task, success: false, error: err.message });
}
}

await browser.close();

fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2));
console.log('Processing complete. Output saved to', outputFilePath);
}

main();