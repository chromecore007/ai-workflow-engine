export default function Loading() {
  return (
    <div style={{ padding: 30 }}>
      <h2>Loading...</h2>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: 100,
            background: "#eee",
            marginBottom: 10,
            borderRadius: 8
          }}
        />
      ))}
    </div>
  );
}