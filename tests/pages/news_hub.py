from playwright.sync_api import Page, Locator, expect

class NewsHubPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def featured_article(self) -> Locator:
        return self.page.locator(".featured-article")

    @property
    def featured_title(self) -> Locator:
        return self.featured_article.locator(".featured-article__title")

    @property
    def featured_image(self) -> Locator:
        return self.featured_article.locator(".featured-article__image")

    @property
    def article_cards(self) -> Locator:
        return self.page.locator(".article-card")

    @property
    def search_input(self) -> Locator:
        return self.page.locator("#searchInput")

    @property
    def category_pills(self) -> Locator:
        return self.page.locator(".category-pill")
        
    def navigate(self, base_url: str) -> None:
        self.page.goto(f"{base_url}/news-anthropic.html")

    def search(self, query: str) -> None:
        self.search_input.fill(query)
        self.page.keyboard.press("Enter")

    def filter_by_category(self, category_name: str) -> None:
        pill = self.category_pills.filter(has_text=category_name)
        pill.click()

    def get_article_by_title(self, title: str) -> Locator:
        return self.article_cards.filter(has_text=title)
