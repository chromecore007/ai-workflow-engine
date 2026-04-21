'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function SubmitPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      await axios.post('http://localhost:3001/requests', data);

      alert(' Request submitted successfully!');
      reset();
    } catch (err) {
      alert('❌ Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 500, margin: 'auto' }}>
      <h2>Submit Request</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Name" required />
        <br /><br />

        <input {...register('email')} placeholder="Email" required />
        <br /><br />

        <textarea {...register('message')} placeholder="Message" required />
        <br /><br />

        <button disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}