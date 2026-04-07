'use client';

import OutputBlock from '../../components/OutputBlock';
import { User, Code, Cloud, Server, Target, Zap, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function SummaryPage() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const highlights = [
    { icon: User, text: 'DevOps and cloud-focused engineer with strong interest in automation and reliability.', color: '#177ae6' },
    { icon: Code, text: 'Final-year B.Tech Computer Science Engineering student at AKS University, Satna.', color: '#159f90' },
    { icon: Cloud, text: 'Hands-on with Linux, scripting, CI/CD pipelines, and cloud fundamentals.', color: '#f47b2a' },
    { icon: Zap, text: 'Continuous learner who likes solving real infrastructure problems.', color: '#6b62f5' },
  ];

  const skills = [
    'Linux System Administration',
    'Cloud Infrastructure (AWS)',
    'Container Orchestration (Kubernetes, Docker)',
    'CI/CD Pipelines (Jenkins, GitHub Actions)',
    'Infrastructure as Code (Terraform)',
    'Configuration Management (Ansible)',
    'Monitoring & Observability (Grafana)',
    'Scripting (Bash, Python)',
  ];

  return (
    <OutputBlock>
      <div>
        <div className="mb-7">
          <h2 className="page-title text-3xl md:text-4xl">Summary</h2>
          <p className="page-subtitle text-base md:text-lg">A concise overview of profile, strengths, and role objective.</p>
        </div>

        <div className="space-y-4 mb-8">
          {highlights.map((highlight, idx) => {
            const Icon = highlight.icon;
            return (
              <div
                key={idx}
                className="section-card p-5"
                style={{
                  borderColor: `${highlight.color}40`,
                  boxShadow: hoveredItem === idx ? `0 16px 28px ${highlight.color}18` : undefined,
                }}
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl p-3" style={{ backgroundColor: `${highlight.color}20` }}>
                    <Icon size={28} style={{ color: highlight.color }} />
                  </div>
                  <p className="flex-1 text-base leading-relaxed text-[#415278]">
                    {highlight.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold" style={{ color: '#177ae6' }}>
            <Server size={28} />
            Key Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="section-card flex items-center gap-3 p-3"
                style={{
                  borderColor: '#177ae640',
                }}
              >
                <CheckCircle size={20} style={{ color: '#177ae6' }} />
                <span className="text-base font-medium text-[#44557a]">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card p-4" style={{ borderColor: '#177ae648' }}>
          <div className="flex items-center gap-2 mb-2">
            <Target size={24} style={{ color: '#177ae6' }} />
            <span className="text-lg font-bold" style={{ color: '#177ae6' }}>Career Objective</span>
          </div>
          <p className="text-base text-[#44557a]">
            Seeking opportunities to contribute to scalable infrastructure systems as a DevOps or Cloud Engineer, 
            where I can apply my skills in automation, containerization, and cloud technologies while continuously 
            learning and growing in a dynamic environment.
          </p>
        </div>
      </div>
    </OutputBlock>
  );
}
