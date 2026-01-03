# Hướng Dẫn Cập Nhật Tin Tức Hàng Ngày - Thạch Vũ Land

Để cập nhật tin tức cho website, bạn chỉ cần thực hiện các bước đơn giản sau đây trong file dữ liệu.

## 1. Truy cập File Dữ Liệu
Mở file sau trong trình soạn thảo mã nguồn của bạn:
`/scripts/data.js`

## 2. Thêm Tin Tức Mới
Tìm đến phần `const newsData = [...]`. Để thêm tin mới, bạn copy một block tin tức cũ và dán lên **đầu danh sách** (để tin mới nhất hiện trước).

### Cấu trúc một bản tin:
```javascript
{
    id: 4, // Tăng ID lên 1 so với tin gần nhất
    title: "Tiêu đề tin tức của bạn",
    image: "URL_HINH_ANH", // Ví dụ: https://images.unsplash.com/...
    category: "Thị Trường", // Hoặc: Pháp Lý, Dự Án, Tài Chính
    date: "03/01/2026", // Ngày hiện tại
    excerpt: "Mô tả ngắn gọn về tin tức để thu hút người đọc...",
    content: "Nội dung chi tiết của bài viết. Bạn có thể sử dụng các thẻ <p>, <b>, <br> để định dạng văn bản.",
    author: "Thạch Vũ"
}
```

## 3. Quy Tắc Lưu Ý
- **ID**: Luôn đảm bảo ID là duy nhất (không trùng lặp).
- **Hình ảnh**: 
    - Sử dụng link từ [Unsplash](https://unsplash.com) để có ảnh chất lượng cao.
    - Hoặc tải ảnh lên folder `assets/news/` và dẫn link: `assets/news/ten-anh.jpg`.
- **Thứ tự**: Tin tức nằm trên cùng của mảng `newsData` sẽ được hiểu là tin mới nhất.
- **Dấu phẩy**: Đừng quên dấu phẩy `,` giữa các block tin tức `{...}, {...}`.

## 4. Kiểm Tra
Sau khi lưu file `data.js`, hãy tải lại trang web để thấy thay đổi:
1. Trang chủ sẽ tự động lấy 3 tin mới nhất.
2. Trang `news.html` sẽ hiện đầy đủ tất cả các tin (Sắp được cập nhật).

---
*Chúc bạn có những bài viết chất lượng!*
