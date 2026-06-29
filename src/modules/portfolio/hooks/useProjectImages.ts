import { useState } from 'react';
import type { ProjectSiteItem } from '@app/modules/portfolio/entities/entities';

const CACHE_KEY = 'projectImagesLoaded';

function getCache(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); }
  catch { return {}; }
}

function setCache(cache: Record<string, boolean>) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

export function useProjectImages(sites: ProjectSiteItem[]) {
  const cached = getCache();

  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(sites.map(s => [s.url, !cached[s.url]]))
  );

  const [imgBust, setImgBust] = useState<Record<string, number>>({});

  function getImgSrc(url: string) {
    const bust = imgBust[url];
    return `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=600&h=400${bust ? `&t=${bust}` : ''}`;
  }

  function onImgLoad(url: string) {
    setImgLoading(prev => ({ ...prev, [url]: false }));
    const cache = getCache();
    cache[url] = true;
    setCache(cache);
  }

  function onImgError(url: string) {
    setImgLoading(prev => ({ ...prev, [url]: false }));
  }

  function syncImage(url: string) {
    setImgLoading(prev => ({ ...prev, [url]: true }));
    setImgBust(prev => ({ ...prev, [url]: Date.now() }));
    const cache = getCache();
    delete cache[url];
    setCache(cache);
  }

  return { imgLoading, getImgSrc, onImgLoad, onImgError, syncImage };
}
