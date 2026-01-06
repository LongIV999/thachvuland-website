# 🤖 Quy trình Tự động hóa Đăng tin - Thạch Vũ Land

Quy trình này cho phép bạn chỉ cần dán link bài báo, AI sẽ tự động:
1. Đọc nội dung bài báo gốc.
2. Viết lại bài báo theo phong cách chuyên nghiệp của Thạch Vũ Land.
3. Tự động thêm vào website mà không cần mở code.

## 🛠 Công cụ cần thiết
1. **n8n**: Công cụ tự động hóa (Có thể chạy trên máy tính hoặc server).
2. **Jina Reader**: Công cụ giúp AI đọc nội dung website miễn phí.
3. **OpenAI API Key**: Để AI thực hiện việc viết bài.

---

## 📋 Các bước cài đặt

### Bước 1: Chuẩn bị Script cầu nối
Tôi đã tạo file `scripts/add-news.js` trong thư mục dự án của bạn. File này đóng vai trò "cầu nối" để nhận dữ liệu từ AI và ghi vào file `data.js`.

### Bước 2: Cài đặt và Chạy n8n
Nếu bạn chưa có n8n, hãy cài đặt nhanh bằng lệnh (trong Terminal):
```bash
npx n8n
```
Sau đó truy cập địa chỉ `http://localhost:5678`.

### Bước 3: Import Workflow
1. Tải file `automation/news_automation_workflow.json` (tôi đã tạo sẵn cho bạn).
2. Trong n8n, chọn **Workflows** -> **Import from File**.

---

## 🚀 Cách sử dụng bài viết mới
Khi workflow đã chạy, bạn chỉ cần gửi link bài báo vào **Form** của n8n.
- AI sẽ mất khoảng 10-20 giây để xử lý.
- Sau khi thông báo "Thành công", bạn chỉ cần tải lại trang `news.html` trên website để thấy bài viết mới.

---

## 💡 Cấu trúc Workflow trong n8n
1. **Trigger (n8n Form)**: Nơi bạn nhập URL bài báo.
2. **HTTP Request**: Gọi `https://r.jina.ai/<URL>` để lấy nội dung text sạch.
3. **AI Agent**: 
   - Sử dụng prompt: "Viết lại bài báo này cho website BĐS Thạch Vũ Land. Trả về JSON."
4. **Execute Command**: Chạy lệnh `node scripts/add-news.js` để cập nhật website.

Bạn có muốn tôi tạo file workflow `.json` để bạn Import vào n8n ngay không?
