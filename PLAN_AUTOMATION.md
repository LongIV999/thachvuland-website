# 🤖 Quy trình Tự động hóa Đăng tin - Thạch Vũ Land (Cloud Version)

## 🚀 Tổng quan
Hệ thống này được thiết kế để hoạt động hoàn toàn trên Cloud (n8n Cloud, VPS), không phụ thuộc vào máy tính cá nhân.
- **Nguồn tin**: Batdongsan.com.vn
- **Xử lý**: OpenAI (GPT-4o) viết lại bài.
- **Lưu trữ**: Tự động Commit thẳng vào GitHub Repo.
- **Deploy**: GitHub Actions tự động build lại web khi có data mới.

---

## 🛠 Cài đặt Hệ thống trên n8n Cloud

### Bước 1: Import Workflow
1. Tải file `automation/cloud_news_workflow.json` (tôi vừa tạo).
2. Vào n8n > **Workflows** > **Import from File**.

### Bước 2: Cấu hình Credentials
Để workflow hoạt động, bạn cần cấu hình 2 tài khoản trong n8n:

#### 1. OpenAI (Cho AI viết bài)
- Node: **AI Rewrite**
- Credential Type: **OpenAI API**
- API Key: Lấy từ platform.openai.com

#### 2. GitHub (Để lưu data)
- Node: **Get Current Data** và **Update GitHub**
- Credential Type: **GitHub API**
- Access Token: Tạo Personal Access Token (Classic) tại GitHub > Settings > Developer settings.
  - Scope: `repo` (Full control of private repositories).

### Bước 3: Cấu hình Node GitHub
Trong 2 node GitHub ("Get Current Data" và "Update GitHub"), hãy đảm bảo các thông số chính xác:
- **Owner**: `LongIV999`
- **Repository**: `thachvuland-website`
- **File Path**: `data/articles.json`

---

## ⚙️ Quy trình hoạt động
1. **6h/lần**: Workflow tự động chạy.
2. **Lấy tin**: Quét tin mới nhất từ Batdongsan.
3. **AI Xử lý**: Viết lại nội dung chuyên nghiệp.
4. **GitHub Commit**: Workflow tự động chỉnh sửa file `data/articles.json` trên GitHub.
5. **Auto Deploy**: GitHub Actions (được cấu hình trong `.github/workflows/deploy.yml`) sẽ phát hiện thay đổi, tự chạy script `generate_data.py` và deploy website mới.

## 🧪 Cách test
1. Mở Workflow.
2. Bấm **Execute Workflow**.
3. Kiểm tra tab "Executions" xem chạy thành công không.
4. Kiểm tra trên GitHub xem file `data/articles.json` có update mới chưa.
