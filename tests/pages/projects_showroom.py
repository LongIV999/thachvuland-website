from playwright.sync_api import Page, Locator

class ProjectsPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def bento_grid(self) -> Locator:
        return self.page.locator(".projects-bento-grid")

    @property
    def project_cards(self) -> Locator:
        return self.page.locator(".project-card")

    @property
    def filter_pills(self) -> Locator:
        return self.page.locator(".filter-pill")

    def navigate(self):
        self.page.goto("file:///Users/admin/ThachVuLand%20Wed/github-slideshow/projects.html")

    def filter_by(self, category_label: str):
        pill = self.page.get_by_role("button", name=category_label)
        pill.click()
