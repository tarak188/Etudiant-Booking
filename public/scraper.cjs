const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeApartments() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the target website
  await page.goto('https://9annas.tn/discover/immobilier-3', { waitUntil: 'networkidle2', timeout: 60000 });

  let apartments = [];

  try {
    let pageNumber = 1;
    while (true) {
      // Wait for the main content to load
      await page.waitForSelector('.preview-wrapper', { timeout: 60000 });

      // Extract content including the link to the individual apartment page
      const newApartments = await page.evaluate(() => {
        const items = document.querySelectorAll('.preview-wrapper');
        return Array.from(items).map(item => {
          const linkElement = item.querySelector('.preview-header .preview-title a');
          const link = linkElement ? linkElement.getAttribute('href') : '';

          return {
            picture: item.querySelector('.preview-image img')?.getAttribute('src') || '',
            title: item.querySelector('.preview-header .preview-title')?.innerText.trim() || '',
            description: item.querySelector('.preview-description p')?.innerText.trim() || '',
            date: item.querySelector('.preview-footer .preview-date.preview-date-large')?.innerText.trim() || '',
            location: item.querySelector('.preview-footer .preview-location .preview-location-info')?.innerText.trim() || '',
            link: link ? `https://9annas.tn${link}` : '' // Construct the full URL
          };
        });
      });

      // Append new data to existing apartments array
      apartments = [...apartments, ...newApartments];

      console.log(`Page ${pageNumber}: ${newApartments.length} apartments scraped`);
      console.log(`Total apartments so far: ${apartments.length}`);

      // Define the button selector using the button text
      const buttonSelector = 'text/Voir plus d\'annonces';

      // Wait for the "Voir plus d'annonces" button to render
      const showMoreButton = await page.$(buttonSelector);
      if (!showMoreButton) break;

      await page.waitForSelector(buttonSelector);
      await page.click(buttonSelector);

      // Wait for new apartments to load
      await page.waitForFunction((prevApartmentCount) => {
        const apartmentCards = document.querySelectorAll('.preview-wrapper');
        return apartmentCards.length > prevApartmentCount;
      }, {}, apartments.length);

      // Increment page number
      pageNumber++;
    }
  } catch (error) {
    console.error('Error scraping apartments:', error);
  }

  // Log the extracted data
  console.log(`Total apartments scraped: ${apartments.length}`);
  fs.writeFileSync('apartments.json', JSON.stringify(apartments, null, 2));

  await browser.close();
  return apartments;
}

scrapeApartments()
  .then(data => console.log('Scraping completed'))
  .catch(err => console.error(err));

module.exports = scrapeApartments;
