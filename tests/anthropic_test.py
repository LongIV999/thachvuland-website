import os
import sys
from playwright.sync_api import sync_playwright

# Add paths to test
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_URL = f"file://{os.path.join(BASE_DIR, 'index.html')}"
NEWS_URL = f"file://{os.path.join(BASE_DIR, 'news-anthropic.html')}"
DETAIL_URL = f"file://{os.path.join(BASE_DIR, 'news-detail.html')}?id=1"

def test_thachvu_land():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        print("--- Starting Automated Testing for ThachVuLand ---")

        # 1. Test Homepage Navigation
        print(f"Testing Homepage: {INDEX_URL}")
        page.goto(INDEX_URL)
        page.wait_for_load_state('networkidle')
        
        # Check "Tin tức" link
        news_link = page.locator('nav.main-nav a:text("Tin tức")')
        if news_link.count() > 0:
            href = news_link.get_attribute('href')
            print(f"✅ Found 'Tin tức' link: {href}")
            if href == "news-anthropic.html":
                print("✅ Navigation link points to news-anthropic.html")
            else:
                print(f"❌ Navigation link points to {href} instead of news-anthropic.html")
        else:
            print("❌ 'Tin tức' link not found in navigation")

        page.screenshot(path=os.path.join(BASE_DIR, 'tests/homepage_nav_check.png'))

        # 2. Test News Portal (Anthropic Style)
        print(f"\nTesting News Portal: {NEWS_URL}")
        page.goto(NEWS_URL)
        page.wait_for_load_state('networkidle')

        # Check Logo
        logo = page.locator('.logo')
        if logo.count() > 0:
            print(f"✅ Logo found: {logo.inner_text().strip()}")
            if "index.html" in logo.get_attribute('href'):
                print("✅ Logo links back to index.html")
        
        # Check Navigation Links
        nav_links = page.locator('.main-nav .nav-link')
        print(f"✅ Found {nav_links.count()} navigation links in News Portal")
        for i in range(nav_links.count()):
            link = nav_links.nth(i)
            print(f"   - {link.inner_text().strip()} -> {link.get_attribute('href')}")

        # Check Category Pills
        pills = page.locator('.category-pill')
        print(f"✅ Found {pills.count()} category pills")

        # Check for Article Cards
        # We need to wait for JS to render articles from data.js
        page.wait_for_selector('.article-card-modern', timeout=5000)
        articles = page.locator('.article-card-modern')
        print(f"✅ Found {articles.count()} article cards rendered")

        page.screenshot(path=os.path.join(BASE_DIR, 'tests/news_portal_check.png'))

        # 3. Test News Detail
        print(f"\nTesting News Detail: {DETAIL_URL}")
        page.goto(DETAIL_URL)
        page.wait_for_load_state('networkidle')

        # Check Content
        page.wait_for_selector('.article-title-large', timeout=5000)
        title = page.locator('.article-title-large').inner_text()
        print(f"✅ Article Detail Title: {title}")

        # Check Back Button
        back_btn = page.locator('a:text("Quay lại tin tức")')
        if back_btn.count() > 0:
            print(f"✅ Back button found: {back_btn.get_attribute('href')}")
            if back_btn.get_attribute('href') == "news-anthropic.html":
                print("✅ Back button points to news-anthropic.html")
        
        page.screenshot(path=os.path.join(BASE_DIR, 'tests/news_detail_check.png'))

        print("\n--- Testing Completed Successfully ---")
        browser.close()

if __name__ == "__main__":
    test_thachvu_land()
