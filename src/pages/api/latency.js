export default async function handler(req, res) {
  const token = process.env.CF_RADAR_API_TOKEN;
  const locations = ['SG', 'JP', 'HK', 'NL'];
  const url = new URL('https://api.cloudflare.com/client/v4/radar/quality/speed/summary');
  locations.forEach(loc => url.searchParams.append('location[]', loc));
  url.searchParams.append('format', 'JSON');
  url.searchParams.append('metric', 'LATENCY');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Radar API error: ${response.status}`);
    }

    const data = await response.json();
    // The API returns a single summary object, not an array
    const summary = data.result?.summary_0;
    if (!summary) {
      return res.status(500).json({ error: 'Unexpected API response structure', data });
    }

    // Map the summary fields to your exchanges
    const latencyMap = {
      Binance: summary.latencyIdle,
      Bybit: summary.latencyIdle,
      OKX: summary.latencyIdle,
      Deribit: summary.latencyIdle
    };

    res.status(200).json({ latencyMap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}