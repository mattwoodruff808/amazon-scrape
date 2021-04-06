const puppeteer = require('puppeteer');

(async () => {
    const url = 'https://www.amazon.com/s?rh=n%3A172659%2Cp_72%3A4-&pf_rd_i=172659&pf_rd_p=efbb4ac1-24c4-50eb-9f88-b32dd6164529&pf_rd_r=PCYKRSXNV72ER7N18VDQ&pf_rd_s=merchandised-search-10&pf_rd_t=BROWSE&ref=Oct_s9_apbd_otopr_hd_bw_biup_S';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
        let items = document.querySelectorAll('div[data-component-type="s-search-result"]');

        let tvs = [];

        for (let i = 0; i < items.length; i++){
            let priceElement = items[i].querySelector('.a-offscreen');
            let tv = {
                name: items[i].querySelector('span.a-size-base-plus.a-color-base.a-text-normal').innerText,
                price: priceElement ? priceElement.innerText : 'No Price Listed'
            }

            tvs.push(tv);
        }


        return tvs;
    })

    console.log(data);
    await page.screenshot({ path: 'amazon-screenshot.png', fullPage: true });
    console.log('Screenshot save to amazon-screenshot.png');

    await browser.close();
})();