'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3001/requests');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>

      {data.length === 0 ? (
        <p>No data</p>
      ) : (
        data.map((item: any) => (
          <div key={item._id} style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10,
            borderRadius: 8
          }}>
            <h3>{item.name}</h3>
            <p>{item.email}</p>

            <p>
              Category:{" "}
              <b>{item.category || "⏳ Processing..."}</b>
            </p>

            <p>
              Urgency:{" "}
              <b>{item.urgency || "..."}</b>
            </p>

            <p>{item.summary || "AI processing..."}</p>
          </div>
        ))
      )}
    </div>
  );
}