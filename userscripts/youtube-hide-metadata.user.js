// ==UserScript==
// @name         YouTube Metadata Hider
// @namespace    https://github.com/example
// @version      1.0
// @description  Toggle hiding of video titles, channel names, durations and views on YouTube
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const STATE_KEY = 'ytHideMetadata';

    let hide = localStorage.getItem(STATE_KEY) === 'true';

    const button = document.createElement('button');
    button.id = 'yt-hide-metadata-toggle';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.left = '10px';
    button.style.zIndex = '10000';
    button.style.padding = '6px 12px';
    button.style.fontSize = '14px';
    button.style.background = 'rgba(255,255,255,0.8)';
    button.style.border = '1px solid #ccc';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        body.yt-hide-metadata ytd-thumbnail-overlay-time-status-renderer,
        body.yt-hide-metadata ytd-thumbnail-overlay-resume-playback-renderer,
        body.yt-hide-metadata #video-title,
        body.yt-hide-metadata ytd-channel-name,
        body.yt-hide-metadata #channel-name,
        body.yt-hide-metadata #metadata-line {
            display: none !important;
        }
    `;
    document.head.appendChild(styleEl);

    function applyState() {
        if (hide) {
            document.body.classList.add('yt-hide-metadata');
            button.textContent = 'Show info';
        } else {
            document.body.classList.remove('yt-hide-metadata');
            button.textContent = 'Hide info';
        }
    }

    button.addEventListener('click', () => {
        hide = !hide;
        localStorage.setItem(STATE_KEY, hide);
        applyState();
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(button);
        applyState();
    });
})();
