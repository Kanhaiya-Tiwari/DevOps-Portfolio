'use client';

import { useState } from 'react';

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendBase}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="section-card p-5">
      <span className="text-lg font-bold text-[#1f5ba8]">Share your message</span><br/>
      <form onSubmit={handleSubmit}>
        <label className="mb-1 mt-3 block text-base font-semibold text-[#4a5d83]">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-lg border border-[#ccd9f4] bg-white px-3 py-2 text-[#193765] outline-none focus:border-[#6da6f0]"
        />
        <label className="mb-1 mt-3 block text-base font-semibold text-[#4a5d83]">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-[#ccd9f4] bg-white px-3 py-2 text-[#193765] outline-none focus:border-[#6da6f0]"
        />
        <label className="mb-1 mt-3 block text-base font-semibold text-[#4a5d83]">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="w-full rounded-lg border border-[#ccd9f4] bg-white px-3 py-2 text-[#193765] outline-none focus:border-[#6da6f0]"
        />
        <button type="submit" className="soft-button mt-4">Send Message</button>
      </form>
      {status && <div className="mt-3 text-base font-medium text-[#d14f31]">{status}</div>}
    </div>
  );
}