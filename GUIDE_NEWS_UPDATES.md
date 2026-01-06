# 📝 Hướng Dẫn Đăng Tin Tức Mỗi Ngày - Thạch Vũ Land

Chào Thạch Vũ! Để website luôn mới mẻ và tối ưu SEO, đây là quy trình 3 bước để bạn tự đăng hoặc cập nhật tin tức mỗi ngày mà không cần biết code.

## 1. Địa chỉ quản lý dữ liệu
Mọi bài viết của website được lưu trữ tại file:
`scripts/data.js`

## 2. Cấu trúc một bài viết mới
Để thêm một bài viết, bạn chỉ cần copy đoạn mã dưới đây và dán vào cuối danh sách `newsData` trong file `scripts/data.js`:

```javascript
{
    id: 7, // Số thứ tự tiếp theo
    title: "Tiêu đề bài viết mới của bạn",
    image: "https://link-anh-cua-ban.jpg", // Có thể lấy từ Unsplash hoặc link ảnh dự án
    category: "Thị Trường", // Các loại: Thị Trường, Pháp Lý, Tài Chính, Kiến Thức
    date: "05/01/2026", // Ngày đăng tin
    excerpt: "Đoạn mô tả ngắn (khoảng 2 câu) để thu hút người xem...",
    content: "<p>Nội dung chi tiết bài viết của bạn nằm trong này.</p><p>Bạn có thể dùng thẻ <p> để xuống dòng.</p>",
    author: "Thạch Vũ"
},
```

## 3. Quy tắc "Vàng" khi đăng tin (SEO & UI)
*   **Hình ảnh**: Luôn chọn ảnh nằm ngang (tỉ lệ 16:9) để không bị cắt mất nội dung trên giao diện.
*   **Tiêu đề**: Nên chứa từ khóa như "Bình Dương", "Căn hộ", "Pháp lý" để dễ lên Google.
*   **Chất lượng ảnh**: Nếu lấy ảnh từ điện thoại, hãy nén nhẹ qua `tinypng.com` trước khi đưa lên để trang web load nhanh.

---

## 🚀 Kế hoạch phát triển mục Tin Tức chuyên sâu:
Tôi đã chuẩn bị sẵn mã nguồn để mục Tin tức của bạn có các tính năng sau:
1.  **Phân loại tự động**: Tự lọc tin tức theo danh mục (Thị trường, Kiến thức...).
2.  **Breadcrumbs**: Đường dẫn giúp người dùng không bị lạc.
3.  **Related News**: Gợi ý các bài viết liên quan ở cuối mỗi tin tức để giữ chân khách hàng lâu hơn.

Bạn có muốn tôi triển khai ngay **hệ thống lọc tin tức (Filter)** theo danh mục để khách hàng dễ tìm kiếm không?
