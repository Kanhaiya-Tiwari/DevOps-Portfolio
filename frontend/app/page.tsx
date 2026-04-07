'use client';

import OutputBlock from '../components/OutputBlock';
import RecruiterAIChat from '../components/RecruiterAIChat';
import { ArrowUpRight, Github, Linkedin, Mail, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export default function Home() {
  const [status, setStatus] = useState('Send a message and I will get back quickly.');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('Please fill in name, email, and message.');
      return;
    }

    setStatus('Sending...');
    try {
      const response = await fetch(`${backendBase}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('contact failed');
      }
      form.reset();
      setStatus('Message sent successfully. Thank you.');
    } catch {
      setStatus('Could not send right now. Please try again or email directly.');
    }
  };

  return (
    <OutputBlock>
      <div className="space-y-8">
        <section className="hero-shell reveal is-visible">
          <p className="kicker">DevOps Engineer Platform</p>
          <h1 className="page-title hero-title">I design and automate scalable infrastructure.</h1>
          <p className="page-subtitle hero-sub">
            I design and automate scalable infrastructure, build CI/CD pipelines, and deploy production-ready applications using AWS, Docker, Kubernetes, and Terraform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#intro" className="soft-button inline-flex items-center gap-2">
              Read Intro <MoveRight size={16} />
            </a>
            <a href="#ai-chat" className="muted-button inline-flex items-center gap-2">
              Talk to AI Recruiter
            </a>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            <div className="hero-stat"><strong>99.95%</strong><span>Uptime mindset</span></div>
            <div className="hero-stat"><strong>IaC</strong><span>Terraform-driven delivery</span></div>
            <div className="hero-stat"><strong>K8s</strong><span>Cluster-ready deployment design</span></div>
          </div>

        </section>

        <section className="frost-card reveal p-5 md:p-6" id="intro">
          <p className="kicker">Intro Section</p>
          <h3 className="text-xl font-semibold text-white md:text-2xl">Recently graduated Computer Science student focused on DevOps and Cloud Engineering.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            I work with tools like Terraform, Docker, Kubernetes, and GitHub Actions to build automated, reliable, and scalable systems.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            Currently, I am building real-world projects to gain hands-on experience and prepare for industry-level roles.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            I am looking for an opportunity to contribute, learn, and grow as a DevOps or Cloud Engineer.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {['CI/CD', 'Cloud (AWS)', 'Containers', 'IaC', 'Monitoring'].map((skill) => (
              <div key={skill} className="skill-chip">{skill}</div>
            ))}
          </div>
        </section>

        <section className="frost-card reveal p-5 md:p-6">
          <p className="kicker">Projects + Architecture</p>
          <h3 className="text-xl font-semibold text-white md:text-2xl">Delivery-focused DevOps portfolio projects</h3>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: 'Auto-Healing Docker Platform',
                detail: 'Self-recovering containers with restart policies, health checks, and incident-safe compose workflows.',
                link: 'https://github.com/Kanhaiya-Tiwari/auto-healing-system-docker-project',
              },
              {
                title: 'Terraform AWS Infrastructure',
                detail: 'Reusable Terraform modules provisioning network, compute, and data layers for scalable deployments.',
                link: 'https://github.com/Kanhaiya-Tiwari/Terraform-exercises',
              },
              {
                title: 'Kubernetes Practice Cluster',
                detail: 'Hands-on deployment patterns, service exposure, and declarative rollout workflows in Kubernetes.',
                link: 'https://github.com/Kanhaiya-Tiwari/kubernetes-Practice',
              },
            ].map((project) => (
              <a key={project.title} href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
                <h4>{project.title}</h4>
                <p>{project.detail}</p>
                <span>Open repository <ArrowUpRight size={14} /></span>
              </a>
            ))}
          </div>
        </section>

        <RecruiterAIChat />

        <section className="frost-card reveal p-5 md:p-6" id="contact">
          <p className="kicker">Contact + Integration</p>
          <h3 className="text-xl font-semibold text-white md:text-2xl">Let us build production systems together</h3>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <form onSubmit={submitContact} className="space-y-3">
              <input name="name" placeholder="Your name" className="contact-input" />
              <input name="email" type="email" placeholder="Your email" className="contact-input" />
              <textarea name="message" placeholder="Tell me about your role or project" className="contact-input min-h-28" />
              <button type="submit" className="soft-button inline-flex items-center gap-2">Send Message</button>
              <p className="text-xs text-slate-300">{status}</p>
            </form>

            <div className="inner-card">
              <p className="inner-title">Professional channels</p>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <a href="https://github.com/Kanhaiya-Tiwari" target="_blank" rel="noopener noreferrer" className="social-link"><Github size={15} /> GitHub</a>
                <a href="https://www.linkedin.com/in/kanhaiya-tiwari-46685422a" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={15} /> LinkedIn</a>
                <a href="mailto:kt230088@gmail.com" className="social-link"><Mail size={15} /> Email</a>
                <Link href="/projects" className="social-link">Explore extended project pages</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </OutputBlock>
  );
}
