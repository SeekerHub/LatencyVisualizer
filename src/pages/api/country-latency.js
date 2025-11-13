export default async function handler(req, res) {
  const country = req.query.country || "SG";
  const query = `
    query {
      countryPerformance(country: "${country}") {
        latency { median }
      }
    }
  `;
  try {
    const response = await fetch("https://radar.cloudflare.com/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CF_RADAR_API_TOKEN}`, // Replace with your actual token
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Upstream fetch failed: " + response.statusText);
    }

    const result = await response.json();

    const median = result?.data?.countryPerformance?.latency?.median;
    if (median === undefined || median === null) throw new Error("No median data");

    res.status(200).json({ median });
  } catch (err) {
    console.error("API route error:", err);
    res.status(500).json({ error: "Failed to fetch latency", details: String(err) });
  }
}
