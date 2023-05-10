const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  let data = [];

  for (let index = 1; index <= 3; index++) {
    await page.goto("https://dev-seyik.tistory.com");
    data.push(await getAll(page));
  }
  console.log(data);

  await browser.close();
})();

async function getAll(page) {
  let data = [];

  const number = await page.$$eval(
    "#mArticle > div:nth-child(7) > a.link_post > p",
    (data) => data.length
  );

  for (let index = 0; index < number; index++) {
    data.push(await getOne(page, index + 1));
  }

  return Promise.resolve(data);
}

async function getOne(page, index) {
  let data = {};

  let temp = await page.$("#mArticle > div:nth-child(7) > a.link_post > p");

  data.name = await page.evaluate((data) => {
    return data.textContent;
  }, temp);
  data.link = await page.evaluate((data) => {
    return data.href;
  }, temp);

  data.progrmaPeriod = await page.$eval(
    "#mArticle > div:nth-child(4) > a.link_post > p",
    (data) => data.textContent
  );

  data.applyingPeriod = await page.$eval(
    "#mArticle > div:nth-child(5) > a.link_post > p",
    (data) => data.textContent
  );

  data.count = await page.$eval(
    "#mArticle > div:nth-child(6) > a.link_post > p",
    (data) => data.textContent
  );

  data.state = await page.$eval(
    "#mArticle > div:nth-child(7) > a.link_post > p",
    (data) => data.textContent
  );

  return Promise.resolve(data);
}
