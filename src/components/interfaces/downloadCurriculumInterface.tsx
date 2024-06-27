import React from 'react';

export default function DownloadCurriculumInterface() {
  return (
    <div className="relative min-h-screen">
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 mr-4 mb-4 rounded animate-float flex items-center">
        <i className="material-icons-outlined">file_download</i>
        <span className="ml-2">CV</span>
      </button>
    </div>
  );
}
