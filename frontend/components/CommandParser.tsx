import { useRouter } from 'next/navigation';

const commands = {
  help: 'Available commands: whoami, summary, skills, projects, experience, contact, clear',
  whoami: 'Kanhaiya Tiwari, 22, DevOps & Cloud Engineer, Jabalpur, India',
  summary: '/summary',
  skills: '/skills',
  projects: '/projects',
  experience: '/experience',
  contact: '/contact',
  clear: 'clear',
};

interface CommandParserProps {
  command: string;
  onNavigate: (route: string) => void;
  onClear: () => void;
}

export default function CommandParser({ command, onNavigate, onClear }: CommandParserProps) {
  if (!command || typeof command !== 'string') return null;
  const cmdResult = commands[command.trim() as keyof typeof commands];
  if (cmdResult === 'clear') {
    onClear();
    return null;
  }
  if (cmdResult && cmdResult.startsWith('/')) {
    onNavigate(cmdResult);
    return null;
  }
  return <div>{cmdResult || `command not found: ${command}`}</div>;
}