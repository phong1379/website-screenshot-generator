onst puppeteer = require('puppeteer');
require('dotenv').config();

async function launchBrowser() {
const headless = process.env.HEADLESS !== 'false';
const browser = await puppeteer.launch({ headless });
return browser;
}

module.exports = { launchBrowser };