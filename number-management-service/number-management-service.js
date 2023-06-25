const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const urls = [
    "http://104.211.219.98/numbers/primes",
    "http://104.211.219.98/numbers/fibo",
    "http://104.211.219.98/numbers/odd",
    "http://104.211.219.98/numbers/rand"
  ];


  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  try {
    const numberPromises = urls.map(async (url) => {
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data.numbers || [];
      } else {
        return [];
      }
    });

    const numbers = await Promise.all(numberPromises);
    const mergedNumbers = numbers.flat();

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
