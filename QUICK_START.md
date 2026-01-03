# 🚀 Quick Start Guide - ThachVuLand 2026

## Bắt Đầu Nhanh (5 phút)

### Bước 1: Mở Website
```bash
# Cách 1: Mở trực tiếp file
# Double-click vào file index.html

# Cách 2: Sử dụng Live Server (khuyến nghị)
# Nếu dùng VS Code, cài extension "Live Server"
# Right-click vào index.html → "Open with Live Server"

# Cách 3: Python Simple Server
cd thachvuland-2026
python -m http.server 8000
# Mở browser: http://localhost:8000

# Cách 4: Node.js http-server
npx http-server -p 8000
# Mở browser: http://localhost:8000
```

### Bước 2: Kiểm Tra Các Tính Năng

✅ **Header**
- Scroll xuống → Header sẽ đổi màu nền trắng
- Click vào menu items → Smooth scroll đến section
- Resize browser → Mobile menu xuất hiện

✅ **Hero Section**
- 3D particle background tự động chạy
- Di chuyển chuột → Particles phản ứng
- Click "Khám Phá Dự Án" → Scroll đến Projects
- Click "Tư Vấn Ngay" → Scroll đến Contact

✅ **Stats Bar**
- Scroll đến section → Numbers đếm từ 0 lên
- Animation chỉ chạy 1 lần

✅ **Projects Slider**
- Auto-play sau 5 giây
- Click arrows để navigate
- Hover vào card → Zoom effect
- Responsive: 1 card (mobile), 2 cards (tablet), 3 cards (desktop)

✅ **About Section**
- Parallax effect khi scroll
- Responsive layout

✅ **Services Grid**
- Hover vào card → Lift effect
- Icon đổi màu khi hover

✅ **News Section**
- Hover effects
- Responsive grid

✅ **Mobile Menu**
- Click hamburger icon → Menu slide in
- Click link → Menu tự đóng
- Click outside → Menu đóng

## 📝 Tùy Chỉnh Nội Dung

### Thay Đổi Thông Tin Liên Hệ

Mở [`index.html`](index.html) và tìm:

```html
<!-- Header Phone -->
<a href="tel:0903469888" class="header-phone">
  <i class="fas fa-phone"></i>
  <span>0903.469.888</span>
</a>

<!-- Footer Contact -->
<div class="footer-contact-item">
  <i class="fas fa-phone"></i>
  <span>0903.469.888</span>
</div>
```

Thay số điện thoại của bạn.

### Thay Đổi Màu Sắc

Mở [`styles/main.css`](styles/main.css) và tìm `:root`:

```css
:root {
  /* Thay đổi màu chính */
  --primary-700: #004d40;  /* Màu xanh lá chính */
  --accent-gold: #C5A059;  /* Màu vàng đồng */
  
  /* Thay đổi font */
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'Montserrat', sans-serif;
}
```

### Thêm/Sửa Dự Án

Tìm section `.projects-slider` trong [`index.html`](index.html):

```html
<div class="swiper-slide">
  <div class="project-card">
    <div class="project-card-image">
      <img src="YOUR_IMAGE_URL" alt="Project Name">
      <span class="project-card-badge">Đang Mở Bán</span>
    </div>
    <div class="project-card-content">
      <h3 class="project-card-title">Tên Dự Án</h3>
      <div class="project-card-meta">
        <div class="project-card-meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>Vị Trí</span>
        </div>
        <div class="project-card-meta-item">
          <i class="fas fa-dollar-sign"></i>
          <span>Giá</span>
        </div>
      </div>
      <a href="#" class="btn-ghost">Xem Chi Tiết</a>
    </div>
  </div>
</div>
```

### Thay Đổi Hình Ảnh

**Cách 1: Sử dụng Unsplash (miễn phí)**
```html
<img src="https://images.unsplash.com/photo-XXXXX?w=800" alt="Description">
```

**Cách 2: Sử dụng hình local**
1. Tạo folder `images/` trong `thachvuland-2026/`
2. Copy hình vào folder
3. Thay đổi src:
```html
<img src="images/your-image.jpg" alt="Description">
```

## 🎨 Tùy Chỉnh Thiết Kế

### Thay Đổi Typography

```css
/* Trong styles/main.css */
:root {
  --text-h1: clamp(2.5rem, 5vw, 4rem);  /* Kích thước H1 */
  --text-base: 1rem;                     /* Kích thước chữ cơ bản */
  --leading-normal: 1.6;                 /* Line height */
}
```

### Thay Đổi Spacing

```css
:root {
  --spacing-sm: 1rem;    /* 16px */
  --spacing-md: 1.5rem;  /* 24px */
  --spacing-lg: 2rem;    /* 32px */
  --spacing-xl: 3rem;    /* 48px */
}
```

### Thêm Section Mới

1. Copy một section hiện có
2. Thay đổi nội dung
3. Thêm styles nếu cần trong `main.css`

## 🔧 Troubleshooting

### 3D Background không hiển thị?
- Kiểm tra console (F12) xem có lỗi không
- Đảm bảo Three.js đã load: `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`

### Slider không hoạt động?
- Kiểm tra Swiper.js đã load
- Mở console xem có lỗi không

### Animations không chạy?
- Kiểm tra AOS library đã load
- Scroll lại section để trigger animation

### Mobile menu không mở?
- Kiểm tra JavaScript đã load
- Mở console xem có lỗi không

## 📱 Test Responsive

### Desktop
- Mở browser ở full width
- Test tất cả features

### Tablet
- Resize browser xuống ~768px
- Hoặc F12 → Device Toolbar → iPad

### Mobile
- Resize browser xuống ~375px
- Hoặc F12 → Device Toolbar → iPhone

## 🚀 Deploy Lên Internet

### Option 1: Vercel (Khuyến nghị)
1. Tạo account tại [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Trong folder project: `vercel`
4. Follow instructions
5. Website live trong 1 phút!

### Option 2: Netlify
1. Tạo account tại [netlify.com](https://netlify.com)
2. Drag & drop folder `thachvuland-2026` vào Netlify
3. Website live ngay!

### Option 3: GitHub Pages
1. Push code lên GitHub
2. Settings → Pages → Source: main branch
3. Website live tại: `username.github.io/repo-name`

## 📊 Performance Tips

### Optimize Images
```bash
# Sử dụng TinyPNG hoặc Squoosh
# Compress images trước khi upload
# Recommended: WebP format
```

### Enable Caching
```html
<!-- Thêm vào <head> -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

### Minify CSS/JS (Production)
```bash
# Sử dụng online tools:
# - CSS: cssnano.co
# - JS: javascript-minifier.com
```

## 🎯 Next Steps

1. ✅ Thay đổi nội dung theo business của bạn
2. ✅ Thêm hình ảnh thực tế
3. ✅ Tạo thêm pages (Projects detail, Blog, Contact)
4. ✅ Setup form backend (EmailJS, Formspree)
5. ✅ Add Google Analytics
6. ✅ Setup custom domain
7. ✅ SEO optimization

## 💡 Tips

- **Backup thường xuyên**: Copy folder trước khi chỉnh sửa lớn
- **Test trên nhiều browsers**: Chrome, Firefox, Safari
- **Mobile first**: Test mobile trước desktop
- **Performance**: Giữ images < 200KB
- **Accessibility**: Thêm alt text cho images

## 📞 Support

Nếu gặp vấn đề:
1. Check console (F12) xem có lỗi
2. Đọc lại README.md
3. Google error message
4. Liên hệ developer

---

**Happy Coding! 🎉**

*Chúc bạn thành công với website ThachVuLand!*
