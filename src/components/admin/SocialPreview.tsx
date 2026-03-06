'use client';

import { useState } from 'react';

function PreviewImg({
  src,
  alt,
  bgClass,
  errorTextClass,
}: {
  src: string;
  alt: string;
  bgClass: string;
  errorTextClass: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`w-full h-[200px] ${bgClass} flex items-center justify-center`}>
        <span className={`${errorTextClass} text-sm`}>
          {error ? 'Image not found' : 'No OG image set'}
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full h-[200px] ${bgClass} flex items-center justify-center overflow-hidden`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function SocialPreview({
  title,
  description,
  url,
  imageUrl,
  siteName,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  siteName: string;
}) {
  const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-white/40 mb-2">Facebook / Open Graph Preview</p>
        <div className="max-w-lg border border-gray-300 rounded-md overflow-hidden bg-[#f0f2f5]">
          <PreviewImg
            key={`fb-${imageUrl}`}
            src={imageUrl}
            alt="OG preview"
            bgClass="bg-gray-200"
            errorTextClass="text-gray-400"
          />
          <div className="p-3">
            <p className="text-[11px] text-gray-500 uppercase">{domain}</p>
            <p className="text-[15px] font-semibold text-[#1d2129] leading-tight mt-0.5 line-clamp-1">
              {title || 'Page Title'}
            </p>
            <p className="text-[13px] text-gray-500 leading-snug mt-0.5 line-clamp-2">
              {description || 'Meta description will appear here...'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs text-white/40 mb-2">Twitter / X Preview (summary_large_image)</p>
        <div className="max-w-lg border border-gray-700 rounded-2xl overflow-hidden bg-black">
          <PreviewImg
            key={`tw-${imageUrl}`}
            src={imageUrl}
            alt="Twitter card preview"
            bgClass="bg-gray-900"
            errorTextClass="text-gray-600"
          />
          <div className="p-3">
            <p className="text-[15px] font-bold text-white leading-tight line-clamp-1">
              {title || 'Page Title'}
            </p>
            <p className="text-[13px] text-gray-500 leading-snug mt-0.5 line-clamp-2">
              {description || 'Meta description will appear here...'}
            </p>
            <p className="text-[13px] text-gray-500 mt-1 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 015.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
              </svg>
              {siteName ? `From ${siteName}` : domain}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
