'use client';

import OutputBlock from '../../components/OutputBlock';
import { 
  Terminal, Code, GitBranch, Workflow, Cloud, Container,
  FileCode, Settings, Activity, Box, Sparkles
} from 'lucide-react';
import { useState } from 'react';

const skills = [
  { 
    name: 'Linux & System Administration', 
    icon: Terminal, 
    symbol: 'LNX',
    color: '#177ae6',
    level: 90,
    description: 'Master-level Linux administration and system management'
  },
  { 
    name: 'Bash & Python Scripting', 
    icon: Code, 
    symbol: 'SCR',
    color: '#159f90',
    level: 85,
    description: 'Advanced scripting for automation and system tasks'
  },
  { 
    name: 'Git & GitHub', 
    icon: GitBranch, 
    symbol: 'GIT',
    color: '#f47b2a',
    level: 88,
    description: 'Version control and collaborative development'
  },
  { 
    name: 'Jenkins & GitHub Actions', 
    icon: Workflow, 
    symbol: 'CICD',
    color: '#6b62f5',
    level: 82,
    description: 'CI/CD pipeline automation and orchestration'
  },
  { 
    name: 'AWS Cloud Services', 
    icon: Cloud, 
    symbol: 'AWS',
    color: '#11a7ba',
    level: 80,
    description: 'Cloud infrastructure and services management'
  },
  { 
    name: 'Kubernetes Orchestration', 
    icon: Container, 
    symbol: 'K8S',
    color: '#0d6de0',
    level: 78,
    description: 'Container orchestration and cluster management'
  },
  { 
    name: 'Terraform (IaC)', 
    icon: FileCode, 
    symbol: 'IAC',
    color: '#d9462b',
    level: 83,
    description: 'Infrastructure as Code and provisioning'
  },
  { 
    name: 'Ansible Automation', 
    icon: Settings, 
    symbol: 'ANS',
    color: '#0f8f85',
    level: 81,
    description: 'Configuration management and automation'
  },
  { 
    name: 'Grafana & Monitoring', 
    icon: Activity, 
    symbol: 'MON',
    color: '#177ae6',
    level: 79,
    description: 'Monitoring, visualization, and observability'
  },
  { 
    name: 'Docker & Containerization', 
    icon: Box, 
    symbol: 'DCK',
    color: '#f47b2a',
    level: 87,
    description: 'Container creation and management'
  },
  { 
    name: 'Prompt Engineering', 
    icon: Sparkles, 
    symbol: 'AI',
    color: '#6b62f5',
    level: 75,
    description: 'AI interaction and prompt optimization'
  },
];

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  return (
    <OutputBlock>
      <div>
        <div className="mb-7">
          <h2 className="page-title text-3xl md:text-4xl">Skills</h2>
          <p className="page-subtitle text-base md:text-lg">Technical capabilities in operations, automation, and cloud delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div
                key={idx}
                className="section-card cursor-pointer p-5"
                style={{
                  borderColor: `${skill.color}40`,
                  boxShadow: hoveredSkill === idx ? `0 16px 32px ${skill.color}20` : undefined,
                }}
                onMouseEnter={() => setHoveredSkill(idx)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => setSelectedSkill(selectedSkill === idx ? null : idx)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div 
                    className="rounded-xl p-3"
                    style={{ 
                      backgroundColor: `${skill.color}20`,
                    }}
                  >
                    <Icon size={32} style={{ color: skill.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-[#5c6f96]">{skill.symbol}</span>
                      <h3 
                        className="text-xl font-bold"
                        style={{ color: skill.color }}
                      >
                        {skill.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500 rounded-full"
                          style={{ 
                            width: `${skill.level}%`,
                            backgroundColor: skill.color,
                            boxShadow: `0 0 12px ${skill.color}`,
                          }}
                        ></div>
                      </div>
                      <span className="text-base font-bold" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedSkill === idx && (
                  <div 
                    className="mt-3 border-t-2 pt-3"
                    style={{ borderColor: skill.color }}
                  >
                    <p className="text-base text-[#415278]">{skill.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="section-card mt-8 p-4" style={{ borderColor: '#177ae648' }}>
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={20} style={{ color: '#177ae6' }} />
            <span className="font-bold" style={{ color: '#177ae6' }}>Current Focus</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#177ae6' }}></div>
              <span className="text-[#44557a]">Core skills active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#159f90' }}></div>
              <span className="text-[#44557a]">Cloud stack online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#f47b2a' }}></div>
              <span className="text-[#44557a]">Automation running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#6b62f5' }}></div>
              <span className="text-[#44557a]">Monitoring enabled</span>
            </div>
          </div>
        </div>
      </div>
    </OutputBlock>
  );
}