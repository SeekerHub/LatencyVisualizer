// constants/exchangeServers.js
import {latLonToXYZ} from "./helpers/geo";

export const exchangeServers = [
  { name: 'Binance', lat: 1.3521, lon: 103.8198, provider: 'AWS', country: 'SG' },
  { name: 'Bybit', lat: 35.6895, lon: 139.6917, provider: 'GCP', country: 'JP' },
  { name: 'OKX', lat: 22.3193, lon: 114.1694, provider: 'Azure', country: 'HK' },
  { name: 'Deribit', lat: 52.3676, lon: 4.9041, provider: 'AWS', country: 'NL' },
  { name: 'Kraken', lat: 47.6062, lon: -122.3321, provider: 'AWS', country: 'US' },
  { name: 'Coinbase', lat: 37.7749, lon: -122.4194, provider: 'GCP', country: 'US' },
  { name: 'Bitfinex', lat: 40.7128, lon: -74.0060, provider: 'Azure', country: 'US' },
].map(server => ({
  ...server,
  position: latLonToXYZ(server.lat, server.lon),
}));
