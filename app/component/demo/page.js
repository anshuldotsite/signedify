"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

function ASLDisplay() {
  const [translation, setTranslation] = useState('');
  const [heatmapUrl, setHeatmapUrl] = useState('');
  const [finalFrameUrl, setFinalFrameUrl] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/heatmap-frame')
        .then(res => res.blob())
        .then(blob => setHeatmapUrl(URL.createObjectURL(blob)))
        .catch(() => setHeatmapUrl(''));

      fetch('/api/final-frame')
        .then(res => res.json())
        .then(data => {
          setTranslation(data.text);
          setFinalFrameUrl(data.imageUrl);
        })
        .catch(() => {
          setTranslation('');
          setFinalFrameUrl('');
        });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Cleanup audio on unmount
  // useEffect(() => {
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause()
  //     }
  //   }
  // }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row', // horizontal layout
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px',
      }}
    >
      {/* Heatmap */}
      <div style={{ textAlign: 'center' }}>
        <h3>Heatmap Feed</h3>
        {heatmapUrl ? (
          <Image
            src={heatmapUrl}
            alt="Heatmap Feed"
            width={320}
            height={240}
            unoptimized
            // Use unoptimized to avoid Next.js image optimization issues with dynamic URLs
            // Remove this if you have a static URL or use a different method for images
            style={{ width: '320px', height: '240px', border: '1px solid #ccc' }}
          />
        ) : (
          <p>Loading heatmap...</p>
        )}
      </div>

      {/* Translation & Final Frame */}
      <div style={{ textAlign: 'center' }}>
        <h3>ASL Translation</h3>
        {finalFrameUrl ? (
          <Image
            src={finalFrameUrl}
            alt="Final Frame"
            width={320}
            height={240}
            unoptimized
            style={{ width: '320px', height: '240px', border: '1px solid #ccc' }}
          />
        ) : (
          <p>Loading final frame...</p>
        )}
        <p style={{ marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>
          {translation || '...'}
        </p>
        <button
          onClick={() => {
            if (translation) {
              const utterance = new SpeechSynthesisUtterance(translation);
              speechSynthesis.speak(utterance);
            }
          }}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Play Audio
        </button>
      </div>
    </div>
  );
}

export default ASLDisplay;
