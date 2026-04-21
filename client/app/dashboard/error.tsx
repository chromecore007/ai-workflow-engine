'use client';

export default function Error() {
  return (
    <div style={{ padding: 30 }}>
      <h2>❌ Failed to load data</h2>
      <button onClick={() => location.reload()}>Retry</button>
    </div>
  );
}