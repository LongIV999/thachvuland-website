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

Nếu bạn có domain riêng (ví dụ: `thachvuland.com`):

### 1. Cấu Hình DNS (Tại nhà cung cấp tên miền)
Bạn cần trỏ tên miền về GitHub Pages bằng cách thêm các bản ghi sau:

**A. Đối với Apex Domain (thachvuland.com):**
Tạo 4 bản ghi A trỏ về IP của GitHub:
```
Type: A
Name: @ (hoặc để trống)
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**B. Đối với Subdomain (www.thachvuland.com):**
Tạo 1 bản ghi CNAME:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### 2. Cấu Hình trên GitHub
1. Vào repository > **Settings** > **Pages**
2. Tại mục **Custom domain**, nhập domain của bạn (ví dụ: `thachvuland.com` hoặc `www.thachvuland.com`)
3. Click **Save**
4. Đợi GitHub kiểm tra DNS (có thể mất vài phút đến 24h)
5. Sau khi check thành công, tick chọn **Enforce HTTPS** để bảo mật website

### 3. Lưu ý Quan Trọng (CNAME File)
Khi bạn nhập domain trong Settings, GitHub sẽ tự động tạo file `CNAME` trong branch `gh-pages`. Tuy nhiên, để tránh bị mất cấu hình khi deploy lại từ code gốc, bạn  NÊN:

1. Tạo file tên là `CNAME` (không có đuôi file) tại thư mục gốc của code.
2. Nội dung file chỉ chứa tên miền:
   ```
   thachvuland.com
   ```
3. Commit và push file này lên repository.

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

## Deploy lên Vercel (Recommended)

Vercel là nền tảng tối ưu cho cả static site và dynamic app.

### Cách 1: Deploy từ GitHub (Dễ nhất)

1.  Đẩy code lên GitHub (đã làm ở Bước 1).
2.  Truy cập [Vercel Dashboard](https://vercel.com/dashboard).
3.  Bấm **Add New...** > **Project**.
4.  Chọn repository `github-slideshow` (hoặc tên repo của bạn) và bấm **Import**.
5.  Trong phần **Configure Project**:
    -   **Framework Preset**: Chọn `Other`.
    -   **Root Directory**: Để trống (hoặc `./`).
    -   **Build Command**: Để trống (vì đây là static site).
    -   **Output Directory**: Để trống (hoặc `.` nếu bắt buộc).
6.  Bấm **Deploy**.

Vercel sẽ tự động detect và build. Sau khi xong, bạn sẽ có link dạng `https://your-project.vercel.app`.

### Cách 2: Deploy bằng Vercel CLI (Nâng cao)

Nếu bạn đã cài Vercel CLI (`npm i -g vercel`):

1.  Tại thư mục gốc dự án, chạy lệnh:
    ```bash
    vercel
    ```
2.  Làm theo hướng dẫn trên màn hình (Enter để chọn mặc định cho hầu hết các câu hỏi).

