'use client';

export default function GooglePreview({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const titleLen = title.length;
  const descLen = description.length;

  return (
    <div className="bg-white rounded-lg p-6 max-w-xl">
      <p className="text-xs text-gray-500 mb-1">Google Search Preview</p>
      <div className="space-y-1">
        <p className="text-blue-800 text-lg leading-tight truncate">
          {title || 'Page Title'}
        </p>
        <p className="text-green-700 text-sm truncate">{url}</p>
        <p className="text-gray-600 text-sm leading-snug line-clamp-2">
          {description || 'Meta description will appear here...'}
        </p>
      </div>
      <div className="mt-3 flex gap-4 text-xs">
        <span className={titleLen > 60 ? 'text-red-500' : 'text-gray-400'}>
          Title: {titleLen}/60 chars
        </span>
        <span className={descLen > 160 ? 'text-red-500' : 'text-gray-400'}>
          Description: {descLen}/160 chars
        </span>
      </div>
    </div>
  );
}
