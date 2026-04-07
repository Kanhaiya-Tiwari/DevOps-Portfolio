'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, User, Briefcase, FolderKanban,
  Code, Image, FileText, Mail, Cpu, MessageSquare
} from 'lucide-react';
import { useMemo } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: User },
    { href: '/experience', label: 'Experience', icon: Briefcase },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/skills', label: 'Skills', icon: Code },
    { href: '/gallery', label: 'Gallery', icon: Image },
    { href: '/summary', label: 'Summary', icon: FileText },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/#ai-chat', label: 'AI Chat', icon: MessageSquare },
  ];
  const activeIndex = useMemo(() => {
    return Math.max(0, links.findIndex((l) => l.href === pathname));
  }, [pathname]);

  return (
    <nav className="sticky top-3 z-40 mb-5">
      <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-3 shadow-[0_12px_32px_rgba(3,7,18,0.45)] backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-cyan-500/20 p-2 text-cyan-200">
              <Cpu size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Kanhaiya Tiwari Platform</p>
              <p className="text-xs text-slate-300">DevOps and Cloud Engineering</p>
            </div>
          </div>
          <div className="pill-dark">
            {activeIndex + 1} / {links.length}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0"
              >
                <div
                  className={`flex min-w-[120px] items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border-cyan-300/35 bg-cyan-500/20 text-cyan-100 shadow-[0_10px_22px_rgba(31,139,255,0.2)]'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/30 hover:bg-cyan-500/10'
                  }`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
          <span>Fast navigation enabled</span>
          <span>AI recruiter chat available</span>
        </div>
      </div>
    </nav>
  );
}