'use client';

import OutputBlock from '../../components/OutputBlock';
import { Briefcase, Calendar, MapPin, Code, Cloud, Server, Activity } from 'lucide-react';
import { useState } from 'react';

const experiences = [
  { 
    company: 'Codenixia', 
    role: 'Internship Trainee — DevOps & Cloud Engineer Intern', 
    location: 'Satna, Madhya Pradesh, India',
    duration: 'Dec 2025 – Present',
    description: 'DevOps & Cloud Engineer intern. Working on Linux fundamentals, Docker-based workflows, CI/CD basics, and deploying real-world cloud applications.',
    achievements: [
      'Linux administration practice and system troubleshooting',
      'Containerization with Docker and service connectivity',
      'CI/CD exposure with GitHub Actions-style workflows',
      'Hands-on cloud fundamentals and deployment basics'
    ],
    color: '#177ae6',
    icon: Server
  },
  { 
    company: 'Excelerate', 
    role: 'Internship Trainee — Mobile App Development (Flutter)', 
    location: 'Remote',
    duration: 'Oct 2025 – Nov 2025',
    description: 'Mobile app development with Flutter. Built cross-platform UI flows and learned practical development workflows.',
    achievements: [
      'Flutter UI implementation and app workflow building',
      'Version control basics and team-style iteration',
      'Understanding deployment lifecycle for mobile apps'
    ],
    color: '#159f90',
    icon: Cloud
  },
  { 
    company: 'TechnoHacks EduTech', 
    role: 'Internship Trainee — DevOps Engineer Trainee', 
    location: 'Remote',
    duration: 'Jun 2025 – Jul 2025',
    description: 'Worked as a DevOps engineer trainee. Practiced Linux, Git basics, and container fundamentals while learning CI/CD concepts.',
    achievements: [
      'Linux and CLI fundamentals',
      'Git + GitHub workflow practice',
      'Docker basics and containerized runs',
      'CI/CD concepts and automation mindset'
    ],
    color: '#f47b2a',
    icon: Code
  },
];

export default function ExperiencePage() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [expandedExp, setExpandedExp] = useState<number | null>(null);

  return (
    <OutputBlock>
      <div>
        <div className="mb-7">
          <h2 className="page-title text-3xl md:text-4xl">Experience</h2>
          <p className="page-subtitle text-base md:text-lg">Practical internship exposure in Linux, cloud workflows, and delivery pipelines.</p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="section-card cursor-pointer p-6"
                style={{
                  borderColor: `${exp.color}45`,
                  boxShadow: hoveredExp === idx ? `0 18px 34px ${exp.color}22` : undefined,
                }}
                onMouseEnter={() => setHoveredExp(idx)}
                onMouseLeave={() => setHoveredExp(null)}
                onClick={() => setExpandedExp(expandedExp === idx ? null : idx)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="rounded-xl p-3.5"
                    style={{ 
                      backgroundColor: `${exp.color}20`,
                    }}
                  >
                    <Icon size={32} style={{ color: exp.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 
                        className="font-bold text-2xl"
                        style={{ color: exp.color }}
                      >
                        {exp.role}
                      </h3>
                      <span className="px-3 py-1 rounded text-sm font-bold" style={{ 
                        backgroundColor: `${exp.color}20`,
                        color: exp.color,
                        border: `1px solid ${exp.color}55`,
                      }}>
                        {exp.duration}
                      </span>
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-4 text-base font-medium">
                      <div className="flex items-center gap-2 text-[#60739a]">
                        <Briefcase size={18} />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#60739a]">
                        <MapPin size={18} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-[#415278]">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {expandedExp === idx && (
                  <div 
                    className="mt-4 pt-4 border-t-2 animate-slideIn"
                    style={{ borderColor: exp.color }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Activity size={20} style={{ color: exp.color }} />
                      <h4 className="font-bold text-lg" style={{ color: exp.color }}>KEY ACHIEVEMENTS:</h4>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIdx) => (
                        <li key={achIdx} className="flex items-start gap-2 text-base font-medium text-[#44557a]">
                          <span style={{ color: exp.color }}>-</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-[#5f7197]">
                  {expandedExp === idx ? 'tap to collapse details' : 'tap to expand achievements'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-card mt-8 p-4" style={{ borderColor: '#177ae648' }}>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} style={{ color: '#177ae6' }} />
            <span className="font-bold" style={{ color: '#177ae6' }}>Career Timeline</span>
          </div>
          <div className="text-base text-[#44557a]">
            <p>Currently building deeper expertise in DevOps and cloud engineering.</p>
            <p>Actively seeking opportunities to contribute to scalable infrastructure systems.</p>
          </div>
        </div>
      </div>
    </OutputBlock>
  );
}