'use client';

import OutputBlock from '../../components/OutputBlock';
import { User, GraduationCap, MapPin, Briefcase, Target, Code, Cloud, Server } from 'lucide-react';

export default function About() {
  const sections = [
    {
      icon: User,
      title: 'Identity',
      color: '#177ae6',
      content: 'I am Kanhaiya Tiwari, learning DevOps by building, breaking, and fixing real systems. I’m a final-year B.Tech Computer Science Engineering student with a focused interest in DevOps and Cloud Engineering, based in Jabalpur, India.'
    },
    {
      icon: Code,
      title: 'Core Strengths',
      color: '#0f8f85',
      content: 'My core strength lies in Linux system administration, cloud fundamentals, and DevOps tooling. I have hands-on experience working with Docker, Kubernetes, AWS, Git, GitHub, Jenkins, GitHub Actions, Terraform, Ansible, and Grafana, along with Bash and Python scripting for automation. I believe strongly in Infrastructure as Code, CI/CD best practices, and monitoring-driven reliability.'
    },
    {
      icon: Briefcase,
      title: 'Current Role',
      color: '#f47b2a',
      content: 'I am currently working as a Linux, Cloud & DevOps Engineer Intern at Codenixia (Rostris Verse Pvt. Ltd.), Pune, where I am gaining real-world exposure to industry workflows. During this internship, I am being trained in Linux server configuration, cloud computing, virtualization, monitoring, automation, and DevOps pipelines. I am also contributing to an integrated intelligent cloud-based application involving Docker containers, Python programming, CI/CD pipelines, monitoring frameworks, and distributed systems running on Linux.'
    },
    {
      icon: Target,
      title: 'Goals',
      color: '#d9462b',
      content: 'My goal is to work as a DevOps or Cloud Engineer in a growth-focused organization, where I can contribute to building stable, scalable systems while continuously learning and improving as an engineer.'
    },
  ];

  return (
    <OutputBlock>
      <div>
        <div className="mb-7">
          <h2 className="page-title text-3xl md:text-4xl">About Me</h2>
          <p className="page-subtitle text-base md:text-lg">Professional background, current focus, and long-term direction.</p>
        </div>

        <div className="space-y-4 md:space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="section-card p-5 md:p-6"
                style={{
                  borderColor: `${section.color}42`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl p-3" style={{ backgroundColor: `${section.color}20` }}>
                    <Icon size={28} style={{ color: section.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold" style={{ color: section.color }}>
                      {section.title}
                    </h3>
                    <p className="leading-relaxed text-[#415278]">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: GraduationCap, label: 'B.Tech CSE', color: '#177ae6' },
            { icon: MapPin, label: 'Jabalpur, India', color: '#159f90' },
            { icon: Cloud, label: 'Cloud Focus', color: '#f47b2a' },
            { icon: Server, label: 'DevOps', color: '#6b62f5' },
          ].map((info) => {
            const Icon = info.icon;
            return (
              <div
                key={info.label}
                className="section-card p-4 text-center"
                style={{
                  borderColor: `${info.color}42`,
                }}
              >
                <Icon size={32} style={{ color: info.color }} className="mx-auto mb-2" />
                <p className="text-sm font-bold" style={{ color: info.color }}>{info.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </OutputBlock>
  );
}