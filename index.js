const puppeteer = require('puppeteer');
var inquirer = require('inquirer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.goto('https://apkpure.com/swag-%E2%80%93-exchanging-moments/com.machipopo.swag'); 

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);
    // Type into search box.
  await page.type('input[name="q"]', 'com.machipopo.swag');
  await page.click('input.si[type="submit"]');
  await page.waitForSelector('div#search-res');

  let search_res_link = await page.$('dl.search-dl > dt > a');
  console.log(search_res_link);
  console.log(await search_res_link.getProperties());

  await browser.close();
})();
