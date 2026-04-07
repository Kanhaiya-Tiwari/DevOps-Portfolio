'use client';

import OutputBlock from '../../components/OutputBlock';
import { FolderOpen, ExternalLink, Github, Code, Cloud, Server, Zap, Database, Shield } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    name: 'Portfolio 2026 (Terminal Theme)',
    description: 'Terminal/hacker-themed portfolio built with Next.js App Router + Tailwind. Deployed on GitHub Pages with custom domain and static export.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GitHub Actions', 'GitHub Pages'],
    icon: Code,
    color: '#177ae6',
    status: 'LIVE',
    github: 'https://github.com/Kanhaiya-Tiwari/portfolio-2026',
    demo: 'https://info.buildwithkanha.shop'
  },
  {
    name: 'Docker Fullstack',
    description: 'Full-stack app containerized with Docker. Focus on reproducible local dev, networking, service separation, and production-style workflows.',
    tech: ['Docker', 'Docker Compose', 'Linux', 'Networking'],
    icon: Database,
    color: '#159f90',
    status: 'ACTIVE',
    github: 'https://github.com/Kanhaiya-Tiwari/docker_fullstack',
    demo: null
  },
  {
    name: 'Terraform Exercises',
    description: 'Hands-on Terraform practice repo covering core IaC concepts: providers, modules, state, variables, outputs, and reusable patterns.',
    tech: ['Terraform', 'IaC', 'Cloud', 'HCL'],
    icon: Cloud,
    color: '#f47b2a',
    status: 'LEARNING',
    github: 'https://github.com/Kanhaiya-Tiwari/Terraform-exercises',
    demo: null
  },
  {
    name: 'Ansible Exercises',
    description: 'Ansible practice repo focused on automation basics: inventory, playbooks, roles, templates, handlers, and idempotent runs.',
    tech: ['Ansible', 'Automation', 'Linux', 'YAML'],
    icon: Zap,
    color: '#6b62f5',
    status: 'LEARNING',
    github: 'https://github.com/Kanhaiya-Tiwari/ansible_exercises',
    demo: null
  },
  {
    name: 'Kubernetes Practice',
    description: 'Kubernetes learning repo with manifests and notes. Focus on core objects, deployments, services, config/secrets, and debugging.',
    tech: ['Kubernetes', 'Containers', 'YAML', 'Troubleshooting'],
    icon: Server,
    color: '#d9462b',
    status: 'LEARNING',
    github: 'https://github.com/Kanhaiya-Tiwari/kubernetes-Practice',
    demo: null
  },
  {
    name: 'GitHub Actions Workflow Practice',
    description: 'CI/CD practice workflows: triggers, jobs, caching, artifacts, and deployment patterns using GitHub Actions.',
    tech: ['GitHub Actions', 'CI/CD', 'YAML', 'Automation'],
    icon: Shield,
    color: '#11a7ba',
    status: 'ACTIVE',
    github: 'https://github.com/Kanhaiya-Tiwari/Github-Action-workflow-Practice',
    demo: null
  },
  {
    name: 'Auto-Healing System (Docker Project)',
    description: 'Automation project exploring health checks and restart strategies to keep services running reliably (auto-healing approach).',
    tech: ['Docker', 'Python', 'Reliability', 'Monitoring'],
    icon: Database,
    color: '#0d6de0',
    status: 'ACTIVE',
    github: 'https://github.com/Kanhaiya-Tiwari/auto-healing-system-docker-project',
    demo: null
  },
];

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <OutputBlock>
      <div>
        <div className="mb-7">
          <h2 className="page-title text-3xl md:text-4xl">Projects</h2>
          <p className="page-subtitle text-base md:text-lg">Selected hands-on work across containers, cloud, automation, and infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <div
                key={idx}
                className="section-card p-6"
                style={{
                  borderColor: `${project.color}45`,
                  boxShadow: hoveredProject === idx ? `0 18px 34px ${project.color}20` : undefined,
                }}
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="rounded-xl p-3"
                      style={{ 
                        backgroundColor: `${project.color}20`,
                      }}
                    >
                      <Icon size={32} style={{ color: project.color }} />
                    </div>
                    <div>
                      <h3 
                        className="mb-1 text-xl font-bold"
                        style={{ color: project.color }}
                      >
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }}></div>
                        <span className="text-sm font-bold" style={{ color: project.color }}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <FolderOpen size={20} style={{ color: project.color }} className="opacity-50" />
                </div>

                <p className="mb-4 text-base font-medium text-[#415278]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="rounded px-3 py-1 text-sm font-bold"
                      style={{
                        backgroundColor: `${project.color}20`,
                        color: project.color,
                        border: `1px solid ${project.color}55`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 text-sm font-semibold transition hover:border-[#d4e3fb]"
                    style={{ color: project.color }}
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 text-sm font-semibold transition hover:border-[#d4e3fb]"
                      style={{ color: project.color }}
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#5f7197]">Status: {project.status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </OutputBlock>
  );
}