from playwright.sync_api import sync_playwright

def test_smart_filters():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        url = "file:///Users/admin/ThachVuLand%20Wed/github-slideshow/projects.html"
        print(f"\n[INFO] Navigating to {url}...")
        page.goto(url)
        
        # Test 1: Count initial projects (should be 6 based on data.js)
        initial_count = page.locator(".project-card").count()
        print(f"  - Initial projects visible: {initial_count}")
        assert initial_count == 6, f"Expected 6 projects, found {initial_count}"

        # Test 2: Filter by Location -> "Bình Dương"
        # Known projects in BD: Green Skyline, Setia Edenia, The Rivana, Astral City, Picity Sky Park (5 total)
        # Fiato Uptown is in Thủ Đức.
        print("  - Filtering by Location: Bình Dương")
        page.select_option("#locationSelect", "Bình Dương")
        
        # Checking count
        bd_count = page.locator(".project-card:visible").count()
        print(f"    -> Found {bd_count} projects.")
        
        # Test 3: Filter by Type -> "Shophouse" 
        # Known Shophouse: Astral City (ID 5)
        print("  - Filtering by Type: Shophouse")
        page.select_option("#typeSelect", "shophouse") # Lowercase value
        
        shophouse_count = page.locator(".project-card:visible").count()
        print(f"    -> Found {shophouse_count} projects.")
        assert shophouse_count == 1, "Expected exactly 1 Shophouse (Astral City)"

        # Verify Title of Result
        title = page.locator(".project-card:visible .project-card__title").inner_text()
        print(f"    -> Project Title: {title}")
        assert "Astral City" in title

        # Test 4: Reset
        print("  - Resetting filters...")
        page.evaluate("window.resetFilters()")
        reset_count = page.locator(".project-card:visible").count()
        assert reset_count == 6, "Failed to reset filters"
        print("    -> Filters reset successfully.")

        browser.close()

if __name__ == "__main__":
    try:
        test_smart_filters()
        print("\n[SUCCESS] Smart Filters verified.")
    except Exception as e:
        print(f"\n[ERROR] Filter verification failed: {e}")
        exit(1)
