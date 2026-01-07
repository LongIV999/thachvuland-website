# Hướng Dẫn Deploy ThachVuLand lên GitHub Pages

## Bước 1: Push Code lên GitHub

```bash
# Khởi tạo git repository (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit - ThachVuLand Anthropic theme"

# Thêm remote repository (thay YOUR_USERNAME và YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push lên GitHub
git push -u origin main
```

**Lưu ý:** Nếu branch chính của bạn là `master` thay vì `main`, dùng:
```bash
git push -u origin master
```

## Bước 2: Cấu Hình GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** (Cài đặt)
3. Trong menu bên trái, click **Pages**
4. Trong phần **Source**, chọn:
   - Source: **GitHub Actions**

5. Click **Save**

## Bước 3: Tự Động Deploy với GitHub Actions

GitHub Actions đã được cấu hình sẵn trong file `.github/workflows/deploy.yml`.

Mỗi khi bạn push code lên branch `main` hoặc `master`, website sẽ tự động deploy!

### Kiểm Tra Deployment:

1. Vào tab **Actions** trong repository
2. Xem workflow "Deploy to GitHub Pages" đang chạy
3. Sau khi hoàn thành (✅), website sẽ live tại:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

## Bước 4: Custom Domain (Tùy Chọn)

Nếu bạn có domain riêng (ví dụ: thachvuland.com):

1. Trong **Settings** > **Pages**
2. Thêm domain vào **Custom domain**
3. Cấu hình DNS records tại nhà cung cấp domain:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

## Cập Nhật Nội Dung

### Cập nhật tin tức hoặc dự án:

1. Chỉnh sửa file `data/articles.json`
2. Chạy script để generate:
   ```bash
   cd github-slideshow
   python scripts/generate_data.py
   ```
3. Commit và push:
   ```bash
   git add .
   git commit -m "Update news/projects"
   git push
   ```

Website sẽ tự động rebuild và deploy!

## Testing Local

Trước khi push, bạn có thể test website locally:

```bash
cd github-slideshow

# Python 3
python -m http.server 8000

# Hoặc Node.js
npx http-server -p 8000
```

Mở browser: `http://localhost:8000`

## Files Quan Trọng

- `.nojekyll` - Cho phép GitHub Pages serve files bắt đầu bằng underscore
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `index.html` - Trang chủ
- `data/articles.json` - Dữ liệu nguồn
- `scripts/data.js` - Dữ liệu đã generate
- `styles/anthropic.css` - Main stylesheet

## Performance Optimizations

Website đã được optimize:
- ✅ Lazy loading cho tất cả images
- ✅ CSS variables cho consistency
- ✅ Reduced motion support
- ✅ GPU acceleration
- ✅ Responsive design
- ✅ Modern CSS architecture

## Troubleshooting

### Website không hiển thị sau khi deploy:
- Kiểm tra tab **Actions** xem có lỗi không
- Đảm bảo **Source** trong Settings > Pages là "GitHub Actions"
- Đợi 2-3 phút sau khi deploy hoàn thành

### Thay đổi không xuất hiện:
- Clear browser cache (Ctrl + Shift + R)
- Đợi 1-2 phút để GitHub Pages rebuild

### 404 Error:
- Kiểm tra xem file `index.html` có ở root directory không
- Đảm bảo đã push đúng branch (main hoặc master)

## Liên Hệ

Nếu cần hỗ trợ, tạo issue trong repository.
