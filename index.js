const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/skins', async (req, res) => {
  try {
    // Временные фейковые данные, чтобы убедиться что сервер работает
    const result = [
      {
        name: "Test Skin",
        average_price: 100,
        lowest_price: 120,
        steam_cut_price: 87,
        profit: 33,
        icon: "https://via.placeholder.com/300x100?text=SKIN"
      }
    ];

    res.json({ count: result.length, items: result });

  } catch (err) {
    console.error("🔥 Ошибка прокси:", err);
    res.status(500).json({ error: "Test mode failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
