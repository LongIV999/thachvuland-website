const fs = require('fs');
const path = require('path');

// Đường dẫn tới file data.js
const DATA_PATH = path.join(__dirname, 'data.js');

/**
 * Hàm để thêm tin tức mới vào file data.js
 * @param {Object} newData - Đối tượng tin tức mới { title, category, excerpt, content, image }
 */
function addNews(newData) {
    try {
        // 1. Đọc nội dung file hiện tại
        let content = fs.readFileSync(DATA_PATH, 'utf8');

        // 2. Tìm mảng newsData
        const newsDataStart = content.indexOf('const newsData = [');
        if (newsDataStart === -1) {
            console.error('Không tìm thấy newsData trong data.js');
            return;
        }

        // 3. Phân biệt phần newsData
        const beforeNews = content.substring(0, newsDataStart);
        const newsSection = content.substring(newsDataStart);

        // Trích xuất mảng hiện tại (đây là cách xử lý thô cho file JS tĩnh)
        // Tìm vị trí đóng mảng cuối cùng ];
        const lastBracket = newsSection.lastIndexOf('];');
        const newsItemsText = newsSection.substring('const newsData = ['.length, lastBracket).trim();

        // 4. Xác định ID tiếp theo
        // Cách đơn giản nhất là đếm số lượng dấu { trong newsItemsText hoặc dùng regex
        const matches = newsItemsText.match(/id:\s*(\d+)/g);
        let nextId = 1;
        if (matches && matches.length > 0) {
            const lastId = Math.max(...matches.map(m => parseInt(m.match(/\d+/)[0])));
            nextId = lastId + 1;
        }

        // 5. Tạo text cho item mới
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        const newItemText = `    {
        id: ${nextId},
        title: "${newData.title.replace(/"/g, '\\"')}",
        image: "${newData.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600'}",
        category: "${newData.category || 'Thị Trường'}",
        date: "${formattedDate}",
        excerpt: "${newData.excerpt.replace(/"/g, '\\"')}",
        content: "${newData.content.replace(/"/g, '\\"').replace(/\n/g, '')}",
        author: "Thạch Vũ AI"
    }`;

        // 6. Ghép lại nội dung file
        let newNewsItemsText = newsItemsText;
        if (newNewsItemsText.length > 0 && !newNewsItemsText.endsWith(',')) {
            newNewsItemsText += ',';
        }
        newNewsItemsText += (newNewsItemsText.length > 0 ? '\n' : '') + newItemText;

        const newFullContent = beforeNews + 'const newsData = [\n' + newNewsItemsText + '\n];\n';

        // 7. Ghi lại file
        fs.writeFileSync(DATA_PATH, newFullContent, 'utf8');
        console.log(`✅ Đã thêm bài viết thành công: ID ${nextId} - ${newData.title}`);

    } catch (error) {
        console.error('Lỗi khi cập nhật data.js:', error);
    }
}

// Chạy script từ command line
if (require.main === module) {
    const inputArgs = process.argv.slice(2);
    if (inputArgs.length === 0) {
        console.log('Sử dụng: node add-news.js \'<JSON_DATA>\'');
        process.exit(1);
    }

    try {
        const jsonData = JSON.parse(inputArgs[0]);
        addNews(jsonData);
    } catch (e) {
        console.error('Lỗi định dạng JSON:', e.message);
    }
}
