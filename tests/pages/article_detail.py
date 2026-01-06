from playwright.sync_api import Page, Locator, expect

class ArticleDetailPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def title(self) -> Locator:
        return self.page.locator(".article-title-large")

    @property
    def body(self) -> Locator:
        return self.page.locator(".article-body")

    @property
    def category(self) -> Locator:
        return self.page.locator(".article-category-label")

    @property
    def back_button(self) -> Locator:
        return self.page.locator("text=Quay lại tin tức")
        
    def wait_for_load(self) -> None:
        expect(self.title).to_be_visible()
