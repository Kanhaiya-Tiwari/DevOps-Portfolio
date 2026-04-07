import React from 'react';

export default function OutputBlock({ children }: { children: React.ReactNode }) {
  return (
    <section className="page-card fade-in">
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}