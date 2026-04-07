'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Bot, Loader2, Send, Sparkles } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export default function RecruiterAIChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi, I am Kanhaiya\'s AI assistant. Ask me about projects, architecture choices, CI/CD pipelines, or skills.',
    },
  ]);
  const [streaming, setStreaming] = useState(false);

  const canSend = useMemo(() => input.trim().length > 0 && !streaming, [input, streaming]);

  const ask = async (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || streaming) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: question }, { role: 'assistant', content: '' }]);
    setStreaming(true);

    try {
      const response = await fetch(`${backendBase}/assistant/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: '/', question }),
      });

      if (!response.ok || !response.body) {
        throw new Error('stream-unavailable');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const evt of events) {
          if (!evt.startsWith('data: ')) continue;
          const chunk = evt.slice(6);
          if (chunk === '[DONE]') continue;
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === 'assistant') {
              last.content += chunk;
            }
            return next;
          });
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === 'assistant' && !last.content) {
          last.content = 'I could not stream response right now. Please try again in a moment.';
        }
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <section
      id="ai-chat"
      className="reveal rounded-[2rem] border border-white/45 p-5 shadow-[0_20px_55px_rgba(184,153,255,0.3)] backdrop-blur-xl md:p-6"
      style={{
        background:
          'radial-gradient(130% 120% at 10% 0%, rgba(244,230,255,0.92), rgba(218,229,255,0.76) 56%, rgba(205,215,250,0.72) 100%)',
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6f4ca8]">AI DevOps Copilot</p>
          <h3 className="text-xl font-semibold text-[#2f2653] md:text-2xl">Ask about projects, architecture, and DevOps decisions</h3>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-[#d8c5ff] bg-white/45 px-3 py-1 text-xs text-[#6f4ca8]">
          <Sparkles size={14} /> Gemini Live
        </div>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-[1.4rem] border border-white/70 bg-white/40 p-3 text-center shadow-[0_12px_30px_rgba(155,120,235,0.18)]">
          <p className="text-xs font-semibold text-[#7f67b1]">Career Focus</p>
          <p className="mt-2 text-sm font-medium text-[#3a2f63]">DevOps and Cloud Engineering</p>
        </div>
        <div className="rounded-[1.4rem] border border-white/70 bg-white/40 p-3 text-center shadow-[0_12px_30px_rgba(155,120,235,0.18)]">
          <p className="text-xs font-semibold text-[#7f67b1]">Core Stack</p>
          <p className="mt-2 text-sm font-medium text-[#3a2f63]">AWS, Docker, Kubernetes, Terraform</p>
        </div>
        <div className="rounded-[1.4rem] border border-white/70 bg-white/40 p-3 text-center shadow-[0_12px_30px_rgba(155,120,235,0.18)]">
          <p className="text-xs font-semibold text-[#7f67b1]">Recruiter Mode</p>
          <p className="mt-2 text-sm font-medium text-[#3a2f63]">Portfolio Q&A assistant</p>
        </div>
      </div>

      <div className="mb-3 max-h-[22rem] overflow-auto rounded-[1.35rem] border border-white/75 bg-white/45 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`mb-2 flex gap-2 ${message.role === 'assistant' ? '' : 'justify-end'}`}>
            {message.role === 'assistant' && <Bot size={15} className="mt-1 shrink-0 text-[#7150ab]" />}
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                message.role === 'assistant'
                  ? 'border border-white/70 bg-white/60 text-[#3a2f63]'
                  : 'border border-[#d6c4ff] bg-[#efe6ff] text-[#35295a]'
              }`}
            >
              {message.content || (streaming ? 'Thinking...' : '')}
            </div>
          </div>
        ))}
        {streaming && (
          <div className="mt-2 inline-flex items-center gap-2 text-xs text-[#7352aa]">
            <Loader2 size={12} className="animate-spin" />
            generating response
          </div>
        )}
      </div>

      <form onSubmit={ask} className="flex items-center gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about CI/CD pipelines, Kubernetes, IaC, impact..."
          className="w-full rounded-2xl border border-white/80 bg-white/55 px-4 py-2.5 text-sm text-[#2f2653] outline-none placeholder:text-[#8a75b5] focus:border-[#bca3f9]"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d2b9ff] bg-gradient-to-b from-[#d6b8ff] to-[#b991ff] text-white shadow-[0_10px_25px_rgba(130,90,200,0.32)] disabled:opacity-50"
        >
          <Send size={14} />
        </button>
      </form>
    </section>
  );
}
