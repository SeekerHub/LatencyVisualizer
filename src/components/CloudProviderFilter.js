import React from 'react';

export default function CloudProviderFilter({ visibleProviders, handleProviderChange }) {
  return (
    <div className='cloud-details-container'>
      <strong>Cloud Provider:</strong>
      {['AWS', 'GCP', 'Azure'].map(p => (
        <label key={p} style={{ marginLeft: 8 }}>
          <input
            type="checkbox"
            checked={visibleProviders[p]}
            onChange={e => handleProviderChange(p, e.target.checked)}
          /> {p}
        </label>
      ))}
    </div>
  );
}