
const MapLegend = () => {
  return (
    <div className="container-legend">
      {/* <h4 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Legend</h4> */}
      <div className="parent-leg">
        <span className="legends" /> AWS Region
      </div>
      <div className="parent-leg">
        <span className="legends"  style={{background: 'green'}} /> GCP Region
      </div>
      <div className="parent-leg">
        <span className="legends"  style={{background: 'blue'}} /> Azure Region
      </div>
      <div className="parent-leg">
        <span style={{
          display: 'inline-block',
          width: 18, height: 18, borderRadius: '50%',
          background: '#fff', border: '2px solid #888', marginRight: 8
        }} /> Exchange Server
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{
          display: 'inline-block',
          width: 30, height: 6, borderRadius: 3,
          background: 'linear-gradient(90deg,#00ff2a,#ffe600,#ff2a2a)', marginRight: 8
        }} /> Latency Line (Low → High)
      </div>
    </div>
  );
}

export default MapLegend;