import { useEffect, useRef, useState } from "react";

export function useIframePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [tappedUrl, setTappedUrl] = useState<string | null>(null);
  const pushedState = useRef(false);

  useEffect(() => {
    document.body.style.overflow = previewUrl ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!previewUrl) return;
    function onPopState() {
      pushedState.current = false;
      setPreviewUrl(null);
      setPreviewLoading(false);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [previewUrl]);

  function openPreview(url: string) {
    setPreviewUrl(url);
    setPreviewLoading(true);
    setTappedUrl(null);
    const previewPageUrl = new URL(window.location.href);
    previewPageUrl.searchParams.set("preview", "open");
    window.history.pushState({ iframePreview: true }, "", previewPageUrl.toString());
    pushedState.current = true;
  }

  function closePreview() {
    if (pushedState.current) {
      pushedState.current = false;
      window.history.back();
    } else {
      setPreviewUrl(null);
      setPreviewLoading(false);
    }
  }

  function toggleTap(url: string) {
    setTappedUrl((prev) => (prev === url ? null : url));
  }

  return {
    previewUrl,
    previewLoading,
    setPreviewLoading,
    tappedUrl,
    openPreview,
    closePreview,
    toggleTap
  };
}
