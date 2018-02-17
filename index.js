const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: false, slowMo: 100});
	const page = await browser.newPage();
	//await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
	console.info("Nagivating to apkpure...");
	await page.goto('https://apkpure.com/'); 

	// Type into search box.
	console.info("Searching...");
	await page.type('input[name="q"]', 'com.machipopo.swag');
	await page.click('input.si[type="submit"]');
	await page.waitForSelector('div#search-res');

	let search_res_link = await page.$('dl.search-dl > dt > a');
	console.log(search_res_link);
	let first_result_href = await search_res_link.getProperty('href');
	let first_result_href_str = await first_result_href.jsonValue();
	if ( ! first_result_href_str.endsWith('com.machipopo.swag') ) {
		console.warn(`WARN: Got ${first_result_href} in search result, probably not what you're looking for`);
	}

	console.info(`Going to ${first_result_href_str} ...`);
	await page.evaluateHandle((el) => {// https://github.com/GoogleChrome/puppeteer/issues/386#issuecomment-354574199
		el.target = '_self';
	}, search_res_link);
	search_res_link.click();

	await page.waitForSelector('div#faq_box_faq2');
	let versions_text= await page.evaluate(() => {
		let versions = [...document.querySelectorAll('div#faq_box_faq2 > dl > *')];
		versions.forEach((el)=>el.style='');
		return versions.map((el)=> {
			if ( el.tagName === 'DD' ) {
				let property_strings = el.children.map((child)=>child.innerText);
				console.log(property_strings);
				return property_strings;
				let property_map = {};
				property_strings.map(str => str.split(':'))
				console.log(property_map);
				return property_map;
			}
		});
		//return versions.map((el)=>el.innerText);
	});
	console.log(versions_text);


	await browser.close();
})();
