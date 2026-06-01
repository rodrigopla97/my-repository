import { useState, useEffect } from 'react';

export function useIframePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [tappedUrl, setTappedUrl] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = previewUrl ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [previewUrl]);

  function openPreview(url: string) {
    setPreviewUrl(url);
    setPreviewLoading(true);
    setTappedUrl(null);
  }

  function closePreview() {
    setPreviewUrl(null);
    setPreviewLoading(false);
  }

  function toggleTap(url: string) {
    setTappedUrl(prev => prev === url ? null : url);
  }

  return { previewUrl, previewLoading, setPreviewLoading, tappedUrl, openPreview, closePreview, toggleTap };
}
