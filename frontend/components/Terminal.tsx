
"use client";
import { useState } from 'react';
import Cursor from './Cursor';
import CommandParser from './CommandParser';

export default function Terminal() {
  const [lines, setLines] = useState([
    'Booting Kali Linux Portfolio...\nType \u0027help\u0027 to see available commands',
  ]);
  const [cmd, setCmd] = useState('');

  const handleCommand = (command: string) => {
    setLines([...lines, `\u2514\u2500$ ${command}`]);
  };

  const onNavigate = (route: string) => {
    window.location.href = route;
  };

  const onClear = () => {
    setLines([]);
    setCmd('');
  };

  return (
    <div className="bg-terminalBg text-terminalGreen font-mono p-6 rounded-lg shadow-2xl max-w-2xl mx-auto mt-10 border-2 border-terminalGreen">
      {lines.map((line, i) => (
        <div key={i} className="leading-relaxed">{line}</div>
      ))}
      <div className="flex items-center mt-2">
        <span className="mr-2">└─$</span>
        <input
          className="bg-transparent outline-none text-terminalGreen flex-1"
          value={cmd}
          onChange={e => setCmd(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleCommand(cmd);
              setCmd('');
            }
          }}
          autoFocus
        />
        <Cursor />
      </div>
      <div className="mt-2">
        <CommandParser command={cmd} onNavigate={onNavigate} onClear={onClear} />
      </div>
    </div>
  );
}
