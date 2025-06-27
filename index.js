const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/skins', async (req, res) => {
  try {
    const response = await fetch('https://csgobackpack.net/api/GetItemsList/v2/?appid=730');
    const data = await response.json();
    const result = [];

    for (const [name, item] of Object.entries(data.items_list)) {
      const avg = parseFloat(item.average_price);
      const lowest = parseFloat(item.lowest_price);
      const icon = item.icon_url;

      if (!isNaN(avg) && !isNaN(lowest) && avg > 0 && lowest > 0) {
        const steam = +(avg * 0.87).toFixed(2);
        const profit = +(lowest - steam).toFixed(2);

        if (profit > 0) {
          result.push({
            name,
            average_price: avg,
            lowest_price: lowest,
            steam_cut_price: steam,
            profit,
            icon: `https://steamcommunity-a.akamaihd.net/economy/image/${icon}`
          });
        }
      }
    }

    result.sort((a, b) => b.profit - a.profit); // сортировка по выгоде
    res.json({ count: result.length, items: result });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
