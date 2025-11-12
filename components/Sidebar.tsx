
import React from 'react';
import { Section } from '../types';
import { SECTIONS } from '../constants';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="w-full md:w-64 lg:w-72 p-4 md:p-6 bg-gray-900 md:bg-gray-800/30 md:rounded-lg md:border md:border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4 hidden md:block">Contents</h2>
      <ul className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <button
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center space-x-3 text-left p-3 rounded-lg transition-all duration-200 text-sm md:text-base whitespace-nowrap ${
                activeSection === id
                  ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
