'use client';

import React from 'react';

interface AccordionHintProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * AccordionHint Component
 *
 * A collapsible hint component that can be toggled open/closed
 * to show additional information or guidance.
 */
export function AccordionHint({
  title,
  children,
  isOpen,
  onToggle,
}: AccordionHintProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="px-4 py-3 bg-white">{children}</div>}
    </div>
  );
}
