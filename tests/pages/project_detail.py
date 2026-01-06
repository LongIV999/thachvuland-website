from playwright.sync_api import Page, Locator, expect

class ProjectDetailPage:
    def __init__(self, page: Page):
        self.page = page

    def navigate(self, project_id: int):
        self.page.goto(f"file:///Users/admin/ThachVuLand%20Wed/github-slideshow/project-detail.html?id={project_id}")

    @property
    def title(self) -> Locator:
        return self.page.locator(".article-title-large")

    @property
    def price(self) -> Locator:
        return self.page.locator(".sidebar-widget .price-text")

    @property
    def masonry_images(self) -> Locator:
        return self.page.locator(".gallery-masonry img")

    @property
    def vr_section(self) -> Locator:
        return self.page.locator(".vr-section")
    
    @property
    def start_visit_btn(self) -> Locator:
        return self.page.locator(".vr-overlay .nav-cta")

    @property
    def vr_iframe(self) -> Locator:
        return self.page.locator("#vrViewer iframe")

    def start_vr_tour(self):
        self.start_visit_btn.click()
