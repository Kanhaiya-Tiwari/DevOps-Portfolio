'use client';

import OutputBlock from '../../components/OutputBlock';
import ImageGallery from '../../components/ImageGallery';
import { Image as ImageIcon, Award, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const certifications = [
  {
    title: 'Amazon Web Services Solutions Architect - Associate',
    issuer: 'Udemy',
    issued: 'Dec 2025',
    link: 'https://ude.my/UC-4d5e52bc-5ab4-4165-9b3d-164b53f583d0',
    color: '#ff8800',
  },
  {
    title: 'DevOps',
    issuer: 'Tutedude',
    issued: 'Dec 2025',
    link: null,
    color: '#00bfff',
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco',
    issued: 'Aug 2025',
    link: 'https://credly.com/badges/a3026eab-10d3-4b9b-84c3-06269298290f/linked_in_profile',
    color: '#00ff00',
  },
  {
    title: 'Deloitte Australia - Cyber Job Simulation',
    issuer: 'Forage',
    issued: 'Jul 2025',
    link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_nuyXj8CjCLkHmEuhX_1752981202221_completion_certificate.pdf',
    color: '#ff5555',
  },
  {
    title: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    issued: '',
    link: null,
    color: '#ff00ff',
  },
];

// Certificates
const certificates = [
  { src: '/images/certificates/c1.jpeg', alt: 'Certificate 1', title: 'Certificate 1' },
  { src: '/images/certificates/c2.jpeg', alt: 'Certificate 2', title: 'Certificate 2' },
  { src: '/images/certificates/c3.jpeg', alt: 'Certificate 3', title: 'Certificate 3' },
  { src: '/images/certificates/c4.jpeg', alt: 'Certificate 4', title: 'Certificate 4' },
  { src: '/images/certificates/c5.jpeg', alt: 'Certificate 5', title: 'Certificate 5' },
  { src: '/images/certificates/c6.jpeg', alt: 'Certificate 6', title: 'Certificate 6' },
];

// Internship Certificates
const internshipCertificates = [
  { src: '/images/certificates/i1.jpeg', alt: 'Internship Certificate 1', title: 'Internship Certificate 1' },
  { src: '/images/certificates/i2.jpeg', alt: 'Internship Certificate 2', title: 'Internship Certificate 2' },
  { src: '/images/certificates/i3.jpeg', alt: 'Internship Certificate 3', title: 'Internship Certificate 3' },
  { src: '/images/certificates/i4.jpeg', alt: 'Internship Certificate 4', title: 'Internship Certificate 4' },
];

// Academic Results
const academicResults = [
  { src: '/images/certificates/10th.jpeg', alt: '10th Standard Result', title: '10th Standard Result' },
  { src: '/images/certificates/12th.jpeg', alt: '12th Standard Result', title: '12th Standard Result' },
];

// All images combined
const allImages = [...certificates, ...internshipCertificates, ...academicResults];

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<2 | 3 | 4>(3);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'certificates' | 'internship' | 'academic'>('all');

  const getCurrentImages = () => {
    switch (selectedCategory) {
      case 'certificates':
        return certificates;
      case 'internship':
        return internshipCertificates;
      case 'academic':
        return academicResults;
      default:
        return allImages;
    }
  };

  return (
    <OutputBlock>
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <ImageIcon size={44} style={{ color: '#177ae6' }} />
            <div>
              <h2 className="page-title text-3xl md:text-4xl">Gallery</h2>
              <p className="page-subtitle text-base md:text-lg">Certificates, internships, and academic milestones.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all duration-300 ${
                selectedCategory === 'all' ? 'border-[#177ae6] bg-[#e8f2ff]' : 'border-[#cddcf6] bg-white'
              }`}
              style={{ color: selectedCategory === 'all' ? '#177ae6' : '#6b7fa7' }}
            >
              <ImageIcon size={20} />
              All ({allImages.length})
            </button>
            <button
              onClick={() => setSelectedCategory('certificates')}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all duration-300 ${
                selectedCategory === 'certificates' ? 'border-[#177ae6] bg-[#e8f2ff]' : 'border-[#cddcf6] bg-white'
              }`}
              style={{ color: selectedCategory === 'certificates' ? '#177ae6' : '#6b7fa7' }}
            >
              <Award size={20} />
              Certificates ({certificates.length})
            </button>
            <button
              onClick={() => setSelectedCategory('internship')}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all duration-300 ${
                selectedCategory === 'internship' ? 'border-[#177ae6] bg-[#e8f2ff]' : 'border-[#cddcf6] bg-white'
              }`}
              style={{ color: selectedCategory === 'internship' ? '#177ae6' : '#6b7fa7' }}
            >
              <Briefcase size={20} />
              Internship ({internshipCertificates.length})
            </button>
            <button
              onClick={() => setSelectedCategory('academic')}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all duration-300 ${
                selectedCategory === 'academic' ? 'border-[#177ae6] bg-[#e8f2ff]' : 'border-[#cddcf6] bg-white'
              }`}
              style={{ color: selectedCategory === 'academic' ? '#177ae6' : '#6b7fa7' }}
            >
              <GraduationCap size={20} />
              Academic ({academicResults.length})
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode(2)}
              className={`rounded-lg border px-4 py-2 font-bold transition-all duration-300 ${
                viewMode === 2 ? 'border-[#177ae6] bg-[#e8f2ff]' : 'border-[#cddcf6] bg-white'
              }`}
              style={{ color: viewMode === 2 ? '#177ae6' : '#6b7fa7' }}
            >
              2 Columns
            </button>
            <button
              onClick={() => setViewMode(3)}
              className={`rounded-lg border px-4 py-2 font-bold transition-all duration-300 ${
                viewMode === 3 ? 'border-[#177ae6] bg-[#e8f2ff]' : 'border-[#cddcf6] bg-white'
              }`}
              style={{ color: viewMode === 3 ? '#177ae6' : '#6b7fa7' }}
            >
              3 Columns
            </button>
            <button
              onClick={() => setViewMode(4)}
              className={`rounded-lg border px-4 py-2 font-bold transition-all duration-300 ${
                viewMode === 4 ? 'border-[#177ae6] bg-[#e8f2ff]' : 'border-[#cddcf6] bg-white'
              }`}
              style={{ color: viewMode === 4 ? '#177ae6' : '#6b7fa7' }}
            >
              4 Columns
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-2xl font-bold" style={{ color: '#177ae6' }}>
            Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="section-card p-4"
                style={{
                  borderColor: `${cert.color}40`,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold" style={{ color: cert.color }}>
                      {cert.issuer}{cert.issued ? ` • ${cert.issued}` : ''}
                    </div>
                    <div className="text-base font-medium text-[#415278]">
                      {cert.title}
                    </div>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold"
                      style={{ color: cert.color }}
                    >
                      <ExternalLink size={16} />
                      View
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ImageGallery images={getCurrentImages()} columns={viewMode} />

        <div className="section-card mt-8 p-4" style={{ borderColor: '#177ae648' }}>
          <p className="text-base text-[#44557a]">
            Tip: Click any image to open fullscreen mode and use arrow controls for navigation.
          </p>
        </div>
      </div>
    </OutputBlock>
  );
}

