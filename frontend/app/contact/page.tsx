'use client';

import OutputBlock from '../../components/OutputBlock';
import ContactForm from '../../components/ContactForm';
import { Mail, Phone, Linkedin, Github, FileText, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);

  const contacts = [
    { icon: Mail, label: 'Email', value: 'kt230088@gmail.com', href: 'mailto:kt230088@gmail.com', color: '#177ae6' },
    { icon: Phone, label: 'Phone', value: '7489960276', href: 'tel:7489960276', color: '#159f90' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/kanhaiya-tiwari-46685422a', color: '#f47b2a' },
    { icon: Github, label: 'GitHub', value: 'View on GitHub', href: 'https://github.com/Kanhaiya-Tiwari', color: '#6b62f5' },
    { icon: FileText, label: 'Resume', value: 'Download Resume', href: '/Kanhaiya_Tiwari DevOps CV.pdf', color: '#11a7ba', download: true },
    { icon: MapPin, label: 'Location', value: 'Jabalpur, India', href: '#', color: '#d9462b' },
  ];

  return (
    <OutputBlock>
      <div>
        <div className="mb-7">
          <h2 className="page-title text-3xl md:text-4xl">Contact</h2>
          <p className="page-subtitle text-base md:text-lg">Reach out for collaboration, projects, or opportunities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {contacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <a
                key={idx}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="section-card p-5"
                style={{
                  borderColor: `${contact.color}40`,
                  boxShadow: hoveredContact === idx ? `0 16px 32px ${contact.color}1f` : undefined,
                }}
                onMouseEnter={() => setHoveredContact(idx)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="rounded-xl p-3"
                    style={{ 
                      backgroundColor: `${contact.color}20`,
                    }}
                  >
                    <Icon size={32} style={{ color: contact.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-sm font-medium text-[#60739a]">{contact.label}</div>
                    <div 
                      className="text-lg font-bold"
                      style={{ color: contact.color }}
                    >
                      {contact.value}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-xl font-bold" style={{ color: '#177ae6' }}>
            Send Message
          </h3>
          <ContactForm />
        </div>
      </div>
    </OutputBlock>
  );
}