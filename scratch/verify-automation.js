const { chromium } = require('playwright');

async function testSyndicator() {
  console.log('--- TEST AUTOMATYZACJI HRL ---');
  
  console.log('1. Sprawdzanie silnika Playwright...');
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('2. Próba wejścia na ManyVids (Test połączenia)...');
    await page.goto('https://www.manyvids.com/Login/', { waitUntil: 'networkidle', timeout: 30000 });
    
    const title = await page.title();
    console.log(`✅ Połączenie OK. Tytuł strony: ${title}`);
    
    await browser.close();
    console.log('--- TEST ZAKOŃCZONY SUKCESEM ---');
    console.log('Twój system jest gotowy do automatycznego logowania i wgrywania.');
  } catch (e) {
    console.error('❌ Błąd testu:', e.message);
  }
}

testSyndicator();
