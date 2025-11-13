
export const exchangeServers = [
  { name: 'Binance', lat: 1.3521, lon: 103.8198, provider: 'AWS', country: 'SG' },
  { name: 'Bybit', lat: 35.6895, lon: 139.6917, provider: 'GCP', country: 'JP' },
  { name: 'OKX', lat: 22.3193, lon: 114.1694, provider: 'Azure', country: 'HK' },
  { name: 'Deribit', lat: 52.3676, lon: 4.9041, provider: 'AWS', country: 'NL' },
  { name: 'Kraken', lat: 47.6062, lon: -122.3321, provider: 'AWS', country: 'US' },
  { name: 'Coinbase', lat: 37.7749, lon: -122.4194, provider: 'GCP', country: 'US' },
  { name: 'Bitfinex', lat: 40.7128, lon: -74.0060, provider: 'Azure', country: 'US' },
];

export const cloudRegions = [
  { provider: 'AWS', code: 'ap-southeast-1', lat: 1.3, lon: 103.8, servers: 2 },
  { provider: 'GCP', code: 'asia-northeast1', lat: 35.7, lon: 139.7, servers: 1 },
  { provider: 'Azure', code: 'eastasia', lat: 22.3, lon: 114.1, servers: 1 },
  { provider: 'AWS', code: 'eu-west-1', lat: 53.3, lon: -6.2, servers: 1 },
  // Add more regions here:
  { provider: 'AWS', code: 'us-east-1', lat: 39.0, lon: -77.0, servers: 3 },
  { provider: 'GCP', code: 'us-central1', lat: 41.2565, lon: -95.9345, servers: 2 },
  { provider: 'Azure', code: 'centralus', lat: 32.7767, lon: -96.7970, servers: 2 },
];