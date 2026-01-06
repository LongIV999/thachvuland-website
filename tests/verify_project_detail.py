from playwright.sync_api import sync_playwright
import sys
import os

# Add parent directory to path to import pages
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pages.project_detail import ProjectDetailPage

def test_project_detail():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        project_page = ProjectDetailPage(page)
        
        print("\n[INFO] navigating to Project 1...")
        project_page.navigate(1)
        
        # Verify static content
        print("  - Checking Title...")
        try:
            assert project_page.title.is_visible()
            print(f"    [PASS] Title found: {project_page.title.inner_text()}")
        except:
             print("    [FAIL] Title not visible")

        print("  - Checking Masonry Gallery...")
        count = project_page.masonry_images.count()
        if count > 0:
            print(f"    [PASS] Found {count} gallery images.")
        else:
            print("    [FAIL] No gallery images found.")

        # Verify VR 
        print("  - Checking VR Section...")
        if project_page.vr_section.is_visible():
            print("    [PASS] VR Section is visible.")
            
            print("  - Starting VR Tour...")
            project_page.start_vr_tour()
            
            # Allow a moment for DOM update
            page.wait_for_timeout(1000)
            
            if project_page.vr_iframe.is_visible():
                src = project_page.vr_iframe.get_attribute("src")
                print(f"    [PASS] VR Iframe loaded with src: {src}")
            else:
                print("    [FAIL] VR Iframe not found after clicking start.")
        else:
            print("    [FAIL] VR Section not visible (Check if ID 1 has vrUrl).")

        browser.close()

if __name__ == "__main__":
    test_project_detail()
