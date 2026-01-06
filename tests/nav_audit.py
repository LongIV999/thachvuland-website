from playwright.sync_api import sync_playwright
import os
import sys

def test_navigation_integrity():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # Base path
        base_dir = os.getcwd()
        base_url = f"file://{base_dir}/"
        
        test_pages = [
            "index.html",
            "projects.html",
            "knowledge.html",
            "news-anthropic.html",
            "project-detail.html?id=1",
            "news-detail.html?id=1"
        ]
        
        all_passed = True
        
        for start_page in test_pages:
            try:
                page.goto(base_url + start_page)
                print(f"\n[INFO] Checking links from {start_page}...")
                
                # Find all nav links
                nav_links = page.query_selector_all(".main-nav .nav-link")
                for link in nav_links:
                    href = link.get_attribute("href")
                    text = link.inner_text()
                    
                    if not href:
                        print(f"    [WARN] Found link with no href: {text}")
                        continue

                    print(f"  - Testing link: {text} ({href})")
                    
                    if href.startswith("index.html#"):
                        # Check if index.html exists
                        if not os.path.exists(os.path.join(base_dir, "index.html")):
                            print(f"    [FAIL] index.html not found for {href}")
                            all_passed = False
                    elif ".html" in href:
                        clean_href = href.split("?")[0]
                        if not os.path.exists(os.path.join(base_dir, clean_href)):
                            print(f"    [FAIL] Broken link: {href}")
                            all_passed = False
                    else:
                        print(f"    [SKIP] External or anchor link: {href}")
            except Exception as e:
                print(f"  [ERROR] Could not test {start_page}: {e}")
                all_passed = False

        browser.close()
        return all_passed

if __name__ == "__main__":
    if test_navigation_integrity():
        print("\n[SUCCESS] All navigation links verified.")
        sys.exit(0)
    else:
        print("\n[ERROR] Navigation audit failed.")
        sys.exit(1)
