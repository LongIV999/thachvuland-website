# KẾ HOẠCH THIẾT KẾ PHẦN TIN TỨC - CAFEF.VN STYLE
## Thạch Vũ Land News Portal Redesign

---

## 📋 TÓM TẮT YÊU CẦU

### Công nghệ
- **Frontend**: Vanilla JavaScript + HTML5
- **Styling**: CSS3 với BEM naming convention
- **Data Source**: `scripts/data.js` (newsData array)
- **Theme**: Anthropic CSS (Orange/Teal palette)
- **Build**: Static files, không cần build system

### Layout Style
- **Cafef.vn inspired**: Featured (350px) + Compact Grid (190px)
- **Responsive**: Mobile-first approach
- **Font**: Roboto (Regular, Medium, Bold)

### Tính năng chính
✅ Real-time Search với autocomplete
✅ Filter theo nhiều tiêu chí (category, date, author)
✅ Infinite Scroll / Pagination
✅ Trending/Đọc nhiều sidebar
✅ Related Articles theo category
✅ Newsletter Subscribe Form

---

## 🎨 DESIGN SYSTEM

### Color Palette (Anthropic Theme)
```css
--primary-orange: #f4a261      /* CTA, accents */
--primary-teal: #2a9d8f        /* Links, borders */
--text-dark: #111              /* Headlines */
--text-medium: #333            /* Body text */
--text-secondary: #4d4d4d      /* Metadata */
--bg-white: #fff               /* Card backgrounds */
--bg-light: #f8f8f8            /* Page background */
--border-color: #e0e0e0        /* Dividers */
--accent-hover: #e76f51        /* Hover states */
```

### Typography Scale
```
Featured Title:     20px / 26px, font-weight: 700
Standard Title:     17px / 23px, font-weight: 700
Compact Title:      15px / 20px, font-weight: 700
Body Text:          14px / 20px, font-weight: 400
Metadata:           12px, font-weight: 400, color: #999
Category Tag:       11px, uppercase, letter-spacing: 0.5px
```

### Spacing System
```
--space-xs:  8px
--space-sm:  12px
--space-md:  16px
--space-lg:  24px
--space-xl:  32px
--space-2xl: 48px
--space-3xl: 64px
```

---

## 📐 LAYOUT ARCHITECTURE

### Grid Structure (Desktop)
```
┌─────────────────────────────────────────────────────────────┐
│                     HEADER (fixed)                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION                                               │
│  ├── Search Bar (with autocomplete dropdown)                │
│  ├── Category Pills (Latest, Market, Finance, Projects)     │
│  └── Active Filters Display                                 │
│                                                             │
├──────────────────────────────────┬──────────────────────────┤
│                                  │                          │
│  MAIN CONTENT (70%)              │  SIDEBAR (30%)           │
│                                  │                          │
│  ┌────────────────────────────┐  │  ┌──────────────────┐   │
│  │  FEATURED ARTICLE          │  │  │ TRENDING TOP 5   │   │
│  │  (full-width, large)       │  │  │ (numbered list)  │   │
│  │  - 350px min height        │  │  └──────────────────┘   │
│  │  - Image 16:10 ratio       │  │                          │
│  │  - Title (20px)            │  │  ┌──────────────────┐   │
│  │  - Excerpt (full)          │  │  │ RELATED ARTICLES │   │
│  │  - Category tag            │  │  │ (dynamic)        │   │
│  └────────────────────────────┘  │  └──────────────────┘   │
│                                  │                          │
│  ┌──────┬──────┬──────┬──────┐  │  ┌──────────────────┐   │
│  │ Comp │ Comp │ Comp │ Comp │  │  │ NEWSLETTER FORM  │   │
│  │ Card │ Card │ Card │ Card │  │  │ (sticky)         │   │
│  │      │      │      │      │  │  └──────────────────┘   │
│  │ 190px│ 190px│ 190px│ 190px│  │                          │
│  └──────┴──────┴──────┴──────┘  │                          │
│                                  │                          │
│  [Load More / Pagination]        │                          │
│                                  │                          │
└──────────────────────────────────┴──────────────────────────┘
│                     FOOTER                                  │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 768px)
```
┌───────────────────────┐
│ HEADER (sticky)       │
├───────────────────────┤
│ Search Bar            │
│ Category Pills (h-scroll) │
├───────────────────────┤
│ Featured Article      │
│ (full-width)          │
├───────────────────────┤
│ Compact Card          │
├───────────────────────┤
│ Compact Card          │
├───────────────────────┤
│ Trending Sidebar      │
│ (collapsed)           │
├───────────────────────┤
│ Load More Button      │
└───────────────────────┘
```

---

## 🔧 COMPONENT BREAKDOWN

### 1. **SearchBar Component**
**File**: Inline trong news-anthropic.html
**Chức năng**:
- Input field với icon search
- Debounced search (300ms delay)
- Autocomplete dropdown hiển thị top 5 kết quả
- Highlight từ khóa trong kết quả

**HTML Structure**:
```html
<div class="news-search-container">
  <input
    type="text"
    id="newsSearchInput"
    class="news-search-input"
    placeholder="Tìm kiếm tin tức BĐS..."
  >
  <i class="fas fa-search news-search-icon"></i>
  <div class="news-search-dropdown" id="searchAutocomplete">
    <!-- JS generated results -->
  </div>
</div>
```

**CSS Classes**:
```css
.news-search-container        /* Relative container */
.news-search-input           /* Styled input */
.news-search-icon            /* Positioned icon */
.news-search-dropdown        /* Autocomplete dropdown */
.search-result-item          /* Individual result */
.search-result-item--active  /* Keyboard navigation */
```

**JavaScript Functions**:
```javascript
function initSearch() { ... }
function handleSearchInput(event) { ... }
function debounce(func, delay) { ... }
function filterNewsByQuery(query) { ... }
function renderAutocomplete(results) { ... }
function highlightMatch(text, query) { ... }
```

---

### 2. **FilterBar Component**
**Chức năng**:
- Multi-select filters: Category, Date Range, Author
- Active filter badges với X button
- Reset all filters button
- URL query params sync (optional)

**HTML Structure**:
```html
<div class="news-filter-bar">
  <!-- Category Pills -->
  <div class="category-pills-container">
    <button class="category-pill active" data-category="all">
      Tất Cả
    </button>
    <button class="category-pill" data-category="Thị Trường">
      Thị Trường
    </button>
    <!-- More pills -->
  </div>

  <!-- Advanced Filters -->
  <div class="filter-advanced">
    <button class="filter-toggle-btn">
      <i class="fas fa-filter"></i> Lọc nâng cao
    </button>
    <div class="filter-panel" id="filterPanel">
      <!-- Date range picker -->
      <!-- Author select -->
    </div>
  </div>

  <!-- Active Filters Display -->
  <div class="active-filters" id="activeFilters">
    <!-- JS generated badges -->
  </div>
</div>
```

**JavaScript**:
```javascript
const filters = {
  category: 'all',
  dateFrom: null,
  dateTo: null,
  author: null,
  searchQuery: ''
};

function applyFilters() { ... }
function renderActiveFilters() { ... }
function removeFilter(filterKey) { ... }
function resetAllFilters() { ... }
```

---

### 3. **NewsCard Components**

#### 3.1 Featured Article Card
**Size**: 100% width, 350px min-height
**Variant**: `news-card--featured`

**HTML**:
```html
<article class="news-card news-card--featured">
  <a href="news-detail.html?id=${id}" class="news-card__link">
    <div class="news-card__image-wrapper">
      <img src="${image}" alt="${title}" class="news-card__image" loading="lazy">
      <span class="news-card__category">${category}</span>
    </div>
    <div class="news-card__content">
      <h2 class="news-card__title news-card__title--large">
        ${title}
      </h2>
      <p class="news-card__excerpt">${excerpt}</p>
      <div class="news-card__meta">
        <time class="news-card__date">${date}</time>
        <span class="news-card__author">${author}</span>
      </div>
    </div>
  </a>
</article>
```

#### 3.2 Compact Card
**Size**: 190px width (desktop), full-width (mobile)
**Variant**: `news-card--compact`

**HTML**:
```html
<article class="news-card news-card--compact">
  <a href="news-detail.html?id=${id}" class="news-card__link">
    <div class="news-card__image-wrapper news-card__image-wrapper--small">
      <img src="${image}" alt="${title}" loading="lazy">
    </div>
    <div class="news-card__content news-card__content--compact">
      <span class="news-card__category news-card__category--small">
        ${category}
      </span>
      <h3 class="news-card__title news-card__title--small">
        ${title}
      </h3>
      <time class="news-card__date news-card__date--small">
        ${date}
      </time>
    </div>
  </a>
</article>
```

**CSS (BEM)**:
```css
.news-card { /* Base */ }
.news-card--featured { /* Modifier */ }
.news-card--compact { /* Modifier */ }
.news-card__link { /* Element */ }
.news-card__image-wrapper { /* Element */ }
.news-card__image { /* Element */ }
.news-card__category { /* Element */ }
.news-card__content { /* Element */ }
.news-card__title { /* Element */ }
.news-card__title--large { /* Modifier */ }
.news-card__title--small { /* Modifier */ }
.news-card__excerpt { /* Element */ }
.news-card__meta { /* Element */ }
.news-card__date { /* Element */ }
.news-card__author { /* Element */ }
```

---

### 4. **Pagination/Infinite Scroll**
**Mode**: Toggle-able (default: Pagination)

**Pagination HTML**:
```html
<div class="news-pagination">
  <button class="pagination-btn pagination-btn--prev" disabled>
    <i class="fas fa-chevron-left"></i> Trước
  </button>

  <div class="pagination-numbers">
    <button class="pagination-number active">1</button>
    <button class="pagination-number">2</button>
    <button class="pagination-number">3</button>
    <span class="pagination-ellipsis">...</span>
    <button class="pagination-number">10</button>
  </div>

  <button class="pagination-btn pagination-btn--next">
    Sau <i class="fas fa-chevron-right"></i>
  </button>
</div>
```

**Infinite Scroll**:
```javascript
let currentPage = 1;
const itemsPerPage = 12; // 1 featured + 11 compact

function initInfiniteScroll() {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      loadMoreNews();
    }
  }, { threshold: 0.1 });

  observer.observe(document.getElementById('loadMoreTrigger'));
}

function loadMoreNews() {
  currentPage++;
  const newItems = getNewsForPage(currentPage);
  appendNewsCards(newItems);
}
```

---

### 5. **Sidebar - Trending Section**
**Style**: Numbered list (01, 02, 03...)

**HTML**:
```html
<aside class="news-sidebar">
  <div class="sidebar-widget">
    <h3 class="sidebar-heading">
      <i class="fas fa-fire"></i> Đọc Nhiều Nhất
    </h3>
    <div class="trending-list" id="trendingList">
      <a href="news-detail.html?id=${id}" class="trending-item">
        <span class="trending-number">01</span>
        <div class="trending-content">
          <h4 class="trending-title">${title}</h4>
          <span class="trending-views">
            <i class="fas fa-eye"></i> 1.2K views
          </span>
        </div>
      </a>
      <!-- More items -->
    </div>
  </div>
</aside>
```

**CSS**:
```css
.trending-item {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  transition: 0.2s ease;
}

.trending-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-secondary);
  opacity: 0.3;
  font-family: var(--font-heading);
}

.trending-item:hover .trending-number {
  color: var(--primary-orange);
  opacity: 1;
}
```

---

### 6. **Related Articles Section**
**Logic**: Filter newsData by current category, exclude current article

**HTML**:
```html
<div class="sidebar-widget">
  <h3 class="sidebar-heading">Tin Liên Quan</h3>
  <div class="related-articles" id="relatedArticles">
    <a href="news-detail.html?id=${id}" class="related-article-item">
      <img src="${image}" alt="${title}" class="related-article-thumb" loading="lazy">
      <div class="related-article-content">
        <h4 class="related-article-title">${title}</h4>
        <time class="related-article-date">${date}</time>
      </div>
    </a>
  </div>
</div>
```

---

### 7. **Newsletter Form**
**Behavior**: Sticky on scroll, form submission alert

**HTML**:
```html
<div class="sidebar-widget sidebar-widget--sticky">
  <h3 class="sidebar-heading">
    <i class="fas fa-envelope"></i> Nhận Tin Mới
  </h3>
  <p class="sidebar-description">
    Đăng ký để nhận phân tích BĐS mới nhất qua email
  </p>
  <form class="newsletter-form" id="newsletterForm">
    <input
      type="email"
      class="newsletter-input"
      placeholder="Email của bạn..."
      required
    >
    <button type="submit" class="newsletter-btn">
      Đăng Ký
    </button>
  </form>
  <p class="newsletter-note">
    Chúng tôi tôn trọng quyền riêng tư của bạn
  </p>
</div>
```

**JavaScript**:
```javascript
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;

  // Mock subscription (would connect to backend/email service)
  alert(`Cảm ơn bạn đã đăng ký! Email: ${email}`);
  e.target.reset();

  // TODO: Integrate with email service (Mailchimp, SendGrid, etc.)
});
```

---

## 📊 DATA STRUCTURE EXTENSION

### Current newsData
```javascript
{
  id: 1,
  title: "...",
  image: "...",
  category: "Thị Trường",
  date: "03/01/2026",
  excerpt: "...",
  content: "...",
  author: "Thạch Vũ"
}
```

### Proposed Extension (Optional)
```javascript
{
  id: 1,
  title: "...",
  image: "...",
  thumbnail: "...",           // NEW: smaller image for compact cards
  category: "Thị Trường",
  tags: ["BĐS", "Đầu tư"],    // NEW: for tag cloud
  date: "03/01/2026",
  excerpt: "...",
  content: "...",
  author: "Thạch Vũ",
  viewCount: 1234,             // NEW: for trending
  readTime: "5 phút đọc",      // NEW: estimated read time
  featured: true               // NEW: mark featured articles
}
```

**Implementation Note**: Chỉ cần thêm viewCount cho trending functionality, các field khác optional.

---

## 🔄 JAVASCRIPT FLOW

### Initialization Flow
```
1. DOM Content Loaded
   ├── Load newsData from scripts/data.js
   ├── Initialize Search (with debounce)
   ├── Initialize Filters
   ├── Render Featured Article (index 0)
   ├── Render Compact Grid (index 1-12)
   ├── Render Trending Sidebar (top 5 by viewCount)
   ├── Render Related Articles (by category)
   ├── Initialize Pagination/Infinite Scroll
   └── Bind Event Listeners
```

### Search Flow
```
User types → Debounce 300ms → Filter newsData by title/excerpt/content
→ Render autocomplete dropdown → User clicks result → Navigate to detail
```

### Filter Flow
```
User clicks category pill → Update filters object → Apply filters
→ Re-render news grid → Update active filter badges → Scroll to top
```

### Pagination Flow
```
User clicks page number → Calculate slice(start, end) → Render new cards
→ Update active page → Scroll to top
```

### Infinite Scroll Flow
```
User scrolls to bottom → IntersectionObserver triggers → Load next batch
→ Append cards to grid → Update currentPage
```

---

## 📁 FILE STRUCTURE

```
github-slideshow/
├── news-anthropic.html           ← OVERWRITE THIS FILE
├── styles/
│   └── anthropic.css             ← ADD NEWS COMPONENTS HERE
├── scripts/
│   ├── data.js                   ← USE EXISTING newsData
│   └── news-functions.js         ← NEW: Separated functions (optional)
└── PLAN_NEWS_LAYOUT.md           ← THIS FILE
```

### anthropic.css New Sections
```css
/* ============================================
   NEWS PORTAL COMPONENTS (Cafef.vn Style)
   ============================================ */

/* Search Bar */
.news-search-container { ... }
.news-search-input { ... }
.news-search-dropdown { ... }

/* Filter Bar */
.news-filter-bar { ... }
.category-pills-container { ... }
.filter-advanced { ... }
.active-filters { ... }

/* News Cards (BEM) */
.news-card { ... }
.news-card--featured { ... }
.news-card--compact { ... }
.news-card__link { ... }
/* ... all elements */

/* Pagination */
.news-pagination { ... }

/* Sidebar */
.news-sidebar { ... }
.trending-list { ... }
.related-articles { ... }
.newsletter-form { ... }

/* Responsive Breakpoints */
@media (max-width: 768px) { ... }
```

---

## ⚡ PERFORMANCE OPTIMIZATIONS

### Images
- ✅ `loading="lazy"` for all images
- ✅ `aspect-ratio` CSS to prevent layout shift
- ✅ WebP format with fallback (optional)
- ✅ Thumbnail sizes: 350x200 (featured), 190x120 (compact)

### JavaScript
- ✅ Debounced search (300ms)
- ✅ Virtual scrolling for large datasets (if >100 articles)
- ✅ Event delegation for card clicks
- ✅ RequestAnimationFrame for smooth animations

### CSS
- ✅ GPU acceleration: `transform: translateZ(0)`
- ✅ `will-change: transform` on hover cards
- ✅ CSS containment: `contain: layout style paint`
- ✅ Reduced motion support

```css
@media (prefers-reduced-motion: reduce) {
  .news-card {
    transition: none !important;
  }
}
```

---

## 🎯 IMPLEMENTATION PHASES

### Phase 1: HTML Structure ✅
1. Tạo header section với search bar
2. Tạo filter bar với category pills
3. Tạo main grid layout (70/30)
4. Tạo featured article container
5. Tạo compact cards grid
6. Tạo sidebar sections (trending, related, newsletter)
7. Tạo pagination controls

**Deliverable**: Structured HTML với semantic tags

---

### Phase 2: CSS Styling ✅
1. Add color variables to anthropic.css
2. Style search bar với autocomplete dropdown
3. Style filter bar và active badges
4. Style news cards (featured + compact)
5. Style sidebar components
6. Style pagination
7. Responsive breakpoints
8. Hover states & animations

**Deliverable**: Fully styled components theo Anthropic theme

---

### Phase 3: JavaScript Core ✅
1. Render featured article từ newsData[0]
2. Render compact grid từ newsData[1-12]
3. Category filter functionality
4. Pagination logic (12 items/page)
5. Trending sidebar (sort by viewCount)
6. Related articles by category
7. Newsletter form submission

**Deliverable**: Working news portal với pagination

---

### Phase 4: Advanced Features ✅
1. Real-time search với debounce
2. Autocomplete dropdown
3. Multi-filter system
4. Active filter badges
5. Infinite scroll option
6. URL query params sync
7. Local storage for user preferences

**Deliverable**: Full-featured news portal

---

### Phase 5: Testing & Optimization ✅
1. Cross-browser testing (Chrome, Firefox, Safari)
2. Mobile responsive testing
3. Performance audit (Lighthouse)
4. Accessibility check (WCAG AA)
5. Image optimization
6. Code minification
7. Documentation

**Deliverable**: Production-ready news portal

---

## 🔍 TESTING CHECKLIST

### Functionality
- [ ] Search returns correct results
- [ ] Autocomplete works và highlight matches
- [ ] Category filters work
- [ ] Multi-filter combinations work
- [ ] Pagination navigates correctly
- [ ] Infinite scroll loads more
- [ ] Trending shows top 5 articles
- [ ] Related articles filters by category
- [ ] Newsletter form validates email
- [ ] All links navigate correctly

### Responsive
- [ ] Mobile menu works
- [ ] Search bar responsive
- [ ] Cards stack correctly on mobile
- [ ] Sidebar moves below content on mobile
- [ ] Pagination responsive
- [ ] Images scale correctly

### Performance
- [ ] Lazy loading works
- [ ] No layout shift (CLS < 0.1)
- [ ] Page loads < 3s
- [ ] Smooth scrolling
- [ ] No jank on animations

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive elements
- [ ] Alt text on all images
- [ ] ARIA labels where needed
- [ ] Color contrast ratio > 4.5:1

---

## 📌 NEXT STEPS

1. **Review this plan** với user - xác nhận mọi chi tiết đúng yêu cầu
2. **Get approval** - user confirm để bắt đầu implement
3. **Start Phase 1** - Build HTML structure
4. **Iterate** - Review sau mỗi phase trước khi tiếp tục

---

## 💡 NOTES & CONSIDERATIONS

### Limitations của Static Site
- **ViewCount**: Không thể track real-time views, cần hardcode trong data hoặc integrate analytics API
- **Newsletter**: Cần integrate third-party service (Mailchimp, ConvertKit)
- **Search**: Client-side only, không scale tốt với >1000 articles

### Future Enhancements
- Admin panel để manage articles
- Backend API để track views
- Comment system
- Social sharing buttons
- Reading progress bar
- Dark mode toggle
- RSS feed
- Sitemap generation

### SEO Considerations
- Add meta tags cho mỗi article
- Structured data (JSON-LD)
- Canonical URLs
- Open Graph tags
- Twitter Cards

---

**Created**: 2026-01-07
**Last Updated**: 2026-01-07
**Author**: Claude Code
**Project**: ThachVuLand News Portal
