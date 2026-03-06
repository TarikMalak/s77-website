'use client';

import { useState } from 'react';

export default function SaveButton({
  onClick,
  label = 'Save',
}: {
  onClick: () => Promise<void>;
  label?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    setStatus('saving');
    try {
      await onClick();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleClick}
        disabled={status === 'saving'}
        className="bg-[#6C63FF] hover:bg-[#5B54E6] disabled:opacity-50 text-white px-6 py-3 rounded-md text-sm font-medium tracking-wider transition-colors flex items-center gap-2"
      >
        {status === 'saving' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Saving...
          </>
        ) : (
          label
        )}
      </button>
      {status === 'success' && (
        <span className="text-sm text-green-400">Saved! Changes will be live within 60 seconds.</span>
      )}
      {status === 'error' && (
        <span className="text-sm text-red-400">Failed to save. Please try again.</span>
      )}
    </div>
  );
}
