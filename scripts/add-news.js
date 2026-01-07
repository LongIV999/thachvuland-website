const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Paths
const DATA_JSON_PATH = path.join(__dirname, '../data/articles.json');
const GENERATOR_SCRIPT = path.join(__dirname, 'generate_data.py');

/**
 * Add new news item to articles.json and regenerate data.js
 * @param {Object} newData 
 */
function addNews(newData) {
    try {
        // 1. Read existing JSON data
        if (!fs.existsSync(DATA_JSON_PATH)) {
            console.error(`Error: File not found at ${DATA_JSON_PATH}`);
            process.exit(1);
        }

        const fileContent = fs.readFileSync(DATA_JSON_PATH, 'utf8');
        let dataStore;

        try {
            dataStore = JSON.parse(fileContent);
        } catch (e) {
            console.error('Error parsing articles.json:', e.message);
            process.exit(1);
        }

        // 2. Prepare new item
        const newsList = dataStore.newsData || [];

        // Calculate next ID
        const maxId = newsList.reduce((max, item) => (item.id > max ? item.id : max), 0);
        const nextId = maxId + 1;

        // Date formatting dd/mm/yyyy
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        const newArticle = {
            id: nextId,
            title: newData.title,
            image: newData.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600',
            category: newData.category || 'Thị Trường',
            date: formattedDate,
            excerpt: newData.excerpt || '',
            content: newData.content || '',
            author: newData.author || 'Thạch Vũ AI'
        };

        // 3. Append and Save
        dataStore.newsData = [newArticle, ...newsList]; // Add to top

        fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(dataStore, null, 4), 'utf8');
        console.log(`✅ Added new article to JSON: ID ${nextId} - ${newArticle.title}`);

        // 4. Trigger Python Generator to update data.js
        console.log('🔄 Regenerating data.js...');
        exec(`python3 "${GENERATOR_SCRIPT}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running generator: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Generator stderr: ${stderr}`);
                return;
            }
            console.log(`Generator output: ${stdout.trim()}`);
            console.log('🎉 System update complete!');
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

// CLI Execution
if (require.main === module) {
    const inputArgs = process.argv.slice(2);
    if (inputArgs.length === 0) {
        console.log('Usage: node add-news.js \'<JSON_DATA>\'');
        process.exit(1);
    }

    try {
        const jsonData = JSON.parse(inputArgs[0]);
        addNews(jsonData);
    } catch (e) {
        console.error('JSON Parse Error:', e.message);
        console.error('Input received:', inputArgs[0]);
        process.exit(1);
    }
}
