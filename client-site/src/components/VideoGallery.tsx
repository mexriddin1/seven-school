'use client';

import { useEffect, useMemo, useState } from 'react';
import { resolveMediaUrl, type SiteBundle } from '@/lib/api';
import { getYouTubeEmbedUrl, getYouTubeId, isDirectVideoUrl } from '@/lib/video';

type VideoItem = SiteBundle['testimonial_videos'][number] | string;

function normalize(item: VideoItem, index: number) {
  const url = typeof item === 'string' ? item : item.url;
  const title = typeof item === 'string' ? `Video ${index + 1}` : (item.name || `Video ${index + 1}`);
  const thumbnailUrl = typeof item === 'string' ? '' : resolveMediaUrl(item.thumbnail_url);
  const youtubeId = getYouTubeId(url);
  const poster = thumbnailUrl || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '');
  return {
    key: typeof item === 'string' ? `${url}-${index}` : String(item.id),
    url,
    title,
    poster,
    youtubeEmbedUrl: getYouTubeEmbedUrl(url),
    directVideo: isDirectVideoUrl(url),
  };
}

export function VideoGallery({ items }: { items: VideoItem[] }) {
  const videos = useMemo(() => items.map(normalize), [items]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : videos[activeIndex];

  useEffect(() => {
    document.body.classList.toggle('video-modal-open', activeIndex !== null);
    return () => document.body.classList.remove('video-modal-open');
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveIndex(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  return (
    <>
      <div className="videos-grid">
        {videos.map((video, i) => (
          <div className="video-card" key={video.key}>
            {video.youtubeEmbedUrl || video.directVideo ? (
              <button
                type="button"
                className="video-thumb"
                onClick={() => setActiveIndex(i)}
                aria-label={video.title}
                style={video.poster ? { backgroundImage: `url('${video.poster}')` } : undefined}
              >
                <span className="video-play">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
            ) : (
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-thumb"
                aria-label={video.title}
                style={video.poster ? { backgroundImage: `url('${video.poster}')` } : undefined}
              >
                <span className="video-play">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </a>
            )}
          </div>
        ))}
      </div>

      <div className={'video-modal' + (active ? ' open' : '')} aria-hidden={!active}>
        <div className="video-modal-backdrop" onClick={() => setActiveIndex(null)} />
        <div className="video-modal-card" role="dialog" aria-modal="true">
          <button type="button" className="video-modal-close" aria-label="Close video" onClick={() => setActiveIndex(null)}>×</button>
          <div className="video-modal-frame">
            {active?.youtubeEmbedUrl ? (
              <iframe
                src={active.youtubeEmbedUrl}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : active?.directVideo ? (
              <video controls autoPlay poster={active.poster}>
                <source src={resolveMediaUrl(active.url)} />
              </video>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
