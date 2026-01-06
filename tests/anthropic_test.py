import os
import sys
from playwright.sync_api import sync_playwright, expect

# Add paths to test
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(BASE_DIR, "tests"))

from pages.news_hub import NewsHubPage
from pages.article_detail import ArticleDetailPage

INDEX_URL = f"file://{os.path.join(BASE_DIR, 'index.html')}"
BASE_URL = f"file://{BASE_DIR}"

def test_thachvu_land():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        print("--- Starting Automated Testing for ThachVuLand (POM + BEM) ---")

        # 1. Test Homepage Navigation
        print(f"Testing Homepage: {INDEX_URL}")
        page.goto(INDEX_URL)
        page.wait_for_load_state('networkidle')
        
        news_link = page.locator('nav.main-nav a:text("Tin tức")')
        expect(news_link).to_be_visible()
        href = news_link.get_attribute('href')
        print(f"✅ Found 'Tin tức' link pointing to: {href}")
        assert href == "news-anthropic.html"

        page.screenshot(path=os.path.join(BASE_DIR, 'tests/homepage_nav_check.png'))

        # 2. Test News Portal (POM)
        news_hub = NewsHubPage(page)
        print(f"\nTesting News Portal Hub")
        news_hub.navigate(BASE_URL)
        page.wait_for_load_state('networkidle')

        # Verify BEM Article Cards
        print("Waiting for BEM article cards to render...")
        expect(news_hub.featured_article).to_be_visible(timeout=5000)
        expect(news_hub.article_cards.first).to_be_visible(timeout=5000)
        
        card_count = news_hub.article_cards.count()
        print(f"✅ Found {card_count} standard article cards (BEM: .article-card)")
        
        featured_title = news_hub.featured_title.inner_text()
        print(f"✅ Featured Article Title: {featured_title}")

        page.screenshot(path=os.path.join(BASE_DIR, 'tests/news_portal_check.png'))

        # 3. Test News Detail (POM)
        print(f"\nTesting News Detail via transition")
        news_hub.featured_title.locator("a").click()
        
        detail_page = ArticleDetailPage(page)
        detail_page.wait_for_load()
        
        print(f"✅ Article Detail Title: {detail_page.title.inner_text()}")
        expect(detail_page.back_button).to_have_attribute("href", "news-anthropic.html")
        print("✅ Back button points correctly to news-anthropic.html")
        
        page.screenshot(path=os.path.join(BASE_DIR, 'tests/news_detail_check.png'))

        print("\n--- Testing Completed Successfully (POM + BEM) ---")
        browser.close()

if __name__ == "__main__":
    test_thachvu_land()

if __name__ == "__main__":
    test_thachvu_land()
