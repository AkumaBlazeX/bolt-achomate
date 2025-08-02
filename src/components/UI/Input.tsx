import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/90">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`block w-full px-4 py-3 glass rounded-xl placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:glow smooth-transition ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-400 focus:ring-red-400' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-300">{error}</p>
      )}
    </div>
  );
};

export default Input;