'use client';

import { usePathname } from 'next/navigation';
import { FormEvent, PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import RobotAvatar from './RobotAvatar';

const routeTips: Record<string, string[]> = {
  '/': [
    'Welcome back. Open Projects for proof of work, or Contact to reach out quickly.',
    'Use the top navigation bar to jump anywhere in one tap.',
  ],
  '/about': [
    'About gives your story. Keep it concise and impact-oriented.',
    'Try Experience next to see your role progression.',
  ],
  '/experience': [
    'Click each experience block to read achievement details.',
    'Projects and Skills pages pair well with this section in interviews.',
  ],
  '/projects': [
    'Use code links for technical depth and demo links for outcomes.',
    'Open Contact when someone asks for collaboration.',
  ],
  '/skills': [
    'Skills are grouped for quick scanning. Focus on strengths first.',
    'Move to Summary for a one-minute overview.',
  ],
  '/gallery': [
    'Use category filters to find certificates faster.',
    'Fullscreen mode works best for showing details.',
  ],
  '/summary': [
    'Summary is ideal for recruiters who need fast context.',
    'Use Contact for next-step conversations.',
  ],
  '/contact': [
    'Share a clear message and your best callback details.',
    'You can also use direct links for email and LinkedIn.',
  ],
};

const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechCtor = new () => SpeechRecognitionLike;

export default function RobotAssistant() {
  const pathname = usePathname();
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [open, setOpen] = useState(true);
  const [question, setQuestion] = useState('');
  const [rotX, setRotX] = useState(-8);
  const [rotY, setRotY] = useState(18);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [listening, setListening] = useState(false);
  const [tip, setTip] = useState('Tap, drag, or scroll me. Ask anything about this resume.');
  const [loading, setLoading] = useState(false);
  const dragState = useRef({ active: false, x: 0, y: 0, rx: -8, ry: 18 });
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const fallbackTip = useMemo(() => {
    const tips = routeTips[pathname] || routeTips['/'];
    return tips[Math.floor(Math.random() * tips.length)];
  }, [pathname]);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !speechEnabled) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const neutralVoice = voices.find((voice) => /^en-(US|GB)/i.test(voice.lang));
    if (neutralVoice) {
      utterance.voice = neutralVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 1.12;
    utterance.volume = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const stopListening = () => {
    if (!recognitionRef.current) {
      return;
    }
    recognitionRef.current.stop();
    setListening(false);
  };

  const startListening = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const speechCtor = (window as Window & { webkitSpeechRecognition?: SpeechCtor; SpeechRecognition?: SpeechCtor })
      .SpeechRecognition ||
      (window as Window & { webkitSpeechRecognition?: SpeechCtor; SpeechRecognition?: SpeechCtor }).webkitSpeechRecognition;

    if (!speechCtor) {
      setTip('Voice input is not supported in this browser. Type your question below.');
      return;
    }

    const recognition = new speechCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || '';
      if (transcript) {
        setQuestion('');
        void fetchAssistantTip(transcript);
      }
    };
    recognition.onerror = () => {
      setTip('Could not capture voice clearly. Please try again or type your question.');
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const fetchAssistantTip = async (userQuestion?: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendBase}/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pathname, question: userQuestion || '' }),
      });

      if (!response.ok) {
        throw new Error('assistant-unavailable');
      }

      const data = await response.json();
      const nextTip = data?.tip || fallbackTip;
      setTip(nextTip);
      speak(nextTip);
    } catch {
      const nextTip = userQuestion
        ? 'I could not fetch a live resume answer. Try again or use the Contact page for a direct discussion.'
        : fallbackTip;
      setTip(nextTip);
      speak(nextTip);
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (event: FormEvent) => {
    event.preventDefault();
    const userQuestion = question.trim();
    if (!userQuestion) {
      return;
    }
    setQuestion('');
    await fetchAssistantTip(userQuestion);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    let ignore = false;

    const loadTip = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${backendBase}/assistant`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: pathname, question: '' }),
        });

        if (!response.ok) {
          throw new Error('assistant-unavailable');
        }

        const data = await response.json();
        const nextTip = data?.tip || fallbackTip;
        if (!ignore) {
          setTip(nextTip);
          speak(nextTip);
        }
      } catch {
        if (!ignore) {
          setTip(fallbackTip);
          speak(fallbackTip);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadTip();

    return () => {
      ignore = true;
    };
  }, [pathname, fallbackTip, speechEnabled, open]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragState.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      rx: rotX,
      ry: rotY,
    };
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) {
      return;
    }
    const dx = event.clientX - dragState.current.x;
    const dy = event.clientY - dragState.current.y;
    setRotY(dragState.current.ry + dx * 0.26);
    setRotX(Math.max(-30, Math.min(26, dragState.current.rx - dy * 0.2)));
  };

  const handlePointerUp = () => {
    dragState.current.active = false;
    setDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    setZoom((value) => Math.max(0.86, Math.min(1.28, value - delta * 0.05)));
    setRotY((value) => value + event.deltaY * 0.04);
  };

  return (
    <aside className="fixed bottom-2 right-2 z-50 w-[min(92vw,28rem)] md:bottom-3 md:right-3">
      {open ? (
        <div className="robot-panel rounded-3xl border border-[#c8dcff] bg-white/92 p-3 shadow-[0_20px_50px_rgba(12,40,86,0.24)] backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#1f4f95]">Cute Robo</p>
              <p className="text-[11px] text-[#5f7197]">Drag for 360 view, scroll for zoom</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSpeechEnabled((value) => !value)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d0def7] bg-white text-[#3567ad]"
                title={speechEnabled ? 'Mute voice' : 'Enable voice'}
              >
                {speechEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[#d3e1f9] px-2 py-1 text-xs font-semibold text-[#5f7197]"
              >
                hide
              </button>
            </div>
          </div>

          <div
            className={`robot-stage mb-3 ${dragging ? 'robot-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onWheel={handleWheel}
          >
            <div
              className="robot-3d-wrap"
              style={{
                transform: `perspective(960px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${zoom})`,
              }}
            >
              <div className="robot-glow" />
              <div className="robot-core floaty">
                <RobotAvatar size={228} className="drop-shadow-[0_24px_28px_rgba(17,69,148,0.3)]" />
              </div>
              <span className="robot-orbit ring-a" />
              <span className="robot-orbit ring-b" />
            </div>
          </div>

          <div className="mb-3 rounded-xl border border-[#dbe7fb] bg-[#f6f9ff] p-2.5 text-sm text-[#2c4779]">
            <p className="mb-1 text-[11px] font-semibold text-[#3c66a8]">
              {loading ? 'Thinking...' : listening ? 'Listening...' : 'Robot says'}
            </p>
            <p>{tip}</p>
          </div>

          <form onSubmit={askQuestion} className="mb-3 flex items-center gap-2">
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about my resume..."
              className="w-full rounded-lg border border-[#cfe0fa] bg-white px-3 py-2 text-xs text-[#1f4f95] outline-none ring-0 placeholder:text-[#7a90b5] focus:border-[#87b2f2]"
            />
            <button
              type="submit"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#a8c6f7] bg-[#eaf2ff] text-[#1f5fb8]"
              title="Ask assistant"
            >
              <Send size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (listening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-[#1f5fb8] ${
                listening ? 'border-[#7fb4ff] bg-[#dbeaff]' : 'border-[#a8c6f7] bg-[#eaf2ff]'
              }`}
              title={listening ? 'Stop voice input' : 'Start voice input'}
            >
              {listening ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-[#5878aa]">
            <span>Interactive 360 robot</span>
            <button
              type="button"
              onClick={() => speak(tip)}
              className="rounded-lg border border-[#d3e1f9] px-2 py-1 font-semibold text-[#4c6fa5]"
            >
              speak
            </button>
          </div>
        </div>
      ) : (
        <button
          aria-label="Open robot assistant"
          onClick={() => setOpen(true)}
          className="robot-dock flex items-center gap-2 rounded-full border border-[#b8d4ff] bg-white px-3 py-2 text-xs font-bold text-[#2058a5] shadow-[0_12px_28px_rgba(12,40,86,0.22)]"
        >
          <RobotAvatar size={18} />
          open 3d robot
        </button>
      )}
    </aside>
  );
}
