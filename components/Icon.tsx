import React from 'react';

interface IconProps {
  name: 'calendar' | 'repeat' | 'save' | 'star' | 'info' | 'moon' | 'sun';
  className?: string;
}

const ICONS: { [key: string]: React.ReactElement } = {
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
      <path d="M2 1H1v1v12h14V2V1h-1v1H3V1H2zM1 3h14v1H1V3zm0 2h14v9H1V5z"/>
      <path d="M4 7H3v1h1V7zM6 7H5v1h1V7zM8 7H7v1h1V7zM10 7H9v1h1V7zM12 7h-1v1h1V7zM4 9H3v1h1V9zM6 9H5v1h1V9zM8 9H7v1h1V9zM10 9H9v1h1V9zM12 9h-1v1h1V9z"/>
    </svg>
  ),
  repeat: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
      <path d="M4 2H3v4h4V5H5v0h6v3h1V2H4zM12 8H6v1h7v4h-4v-1h-1v2h5V8z"/>
      <path d="M3 7V6h1v1H3zM13 10v-1h-1v1h1z"/>
    </svg>
  ),
  save: (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
       <path d="M2 1h12v1H2V1zM2 3h12v1H2V3zM2 5h12v7H2V5zM1 2v11h14V2H1z"/>
       <path d="M8 7h4v4H8V7zM7 6H3v6h5V6H7z"/>
     </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
      <path d="M8 1L6 6L1 6L5 9L3 14L8 11L13 14L11 9L15 6L10 6L8 1Z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
      <path d="M7 7h2v5H7V7zM7 4h2v2H7V4z"/>
      <path fillRule="evenodd" d="M1 8a7 7 0 1114 0A7 7 0 011 8zM2 8a6 6 0 1112 0A6 6 0 012 8z" />
    </svg>
  ),
  moon: (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
       <path d="M10.28 2.22a.75.75 0 01.04 1.06A5.5 5.5 0 005.66 12.7a.75.75 0 11-1.1-1.02A6.999 6.999 0 0111.34 2.26a.75.75 0 01-1.06-.04z"/>
     </svg>
  ),
  sun: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
      <path d="M8 3V1H7v2h1zM3 8H1V7h2v1zM13 8h2V7h-2v1zM8 13v2H7v-2h1zM4.41 4.41L3 3l.7-.7L5.12 3.7l-.71.71zM11.59 11.59L13 13l-.7.7-1.41-1.41.7-.7zM4.41 11.59l.7-.7L3.7 9.48l-.7.71.7.71zM11.59 4.41l-.7-.7L12.3 2.3l.7.7-.7.7zM8 5a3 3 0 100 6 3 3 0 000-6z"/>
    </svg>
  ),
};

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  return <div className={className}>{ICONS[name]}</div>;
};