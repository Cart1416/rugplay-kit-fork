// ==UserScript==
// @name         RugPlay Auto Mines Optimized
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Auto-clicks tiles and cashout with options. Smooth, stable, almost 0ms loop.
// @author       ChogGPT/ChogLog
// @match        https://rugplay.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let running = false;
    let loopId = null;

    const INTERVAL_MS = 0; // 0ms delay between actions (near instant)

    // Cached DOM queries
    function findButtonByText(text) {
        try {
            const buttons = document.querySelectorAll('button');
            for (let btn of buttons) {
                if (btn.textContent.trim() === text) return btn;
            }
        } catch (e) {
            console.warn("findButtonByText error:", e);
        }
        return null;
    }

    // Create control container
    const container = document.createElement('div');
    Object.assign(container.style, {
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: 9999,
        background: '#222',
        padding: '10px',
        borderRadius: '6px',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        userSelect: 'none'
    });

    // Toggle button
    const toggleBtn = document.createElement('button');
    Object.assign(toggleBtn.style, {
        padding: '8px 12px',
        background: '#f00',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'block',
        marginBottom: '8px'
    });
    toggleBtn.textContent = 'Auto Miner: OFF';
    container.appendChild(toggleBtn);

    // 25% wager checkbox
    const checkbox25Wrapper = document.createElement('label');
    const checkbox25 = document.createElement('input');
    checkbox25.type = 'checkbox';
    checkbox25.checked = true;
    checkbox25Wrapper.appendChild(checkbox25);
    checkbox25Wrapper.appendChild(document.createTextNode(' 25% wager'));
    checkbox25Wrapper.style.display = 'block';
    checkbox25Wrapper.style.marginBottom = '6px';
    container.appendChild(checkbox25Wrapper);

    // Multiple tiles checkbox
    const checkboxMultiWrapper = document.createElement('label');
    const checkboxMulti = document.createElement('input');
    checkboxMulti.type = 'checkbox';
    checkboxMulti.checked = false;
    checkboxMultiWrapper.appendChild(checkboxMulti);
    checkboxMultiWrapper.appendChild(document.createTextNode(' multiple tiles (3)'));
    checkboxMultiWrapper.style.display = 'block';
    container.appendChild(checkboxMultiWrapper);

    document.body.appendChild(container);

    toggleBtn.addEventListener('click', () => {
        running = !running;
        toggleBtn.textContent = 'Auto Miner: ' + (running ? 'ON' : 'OFF');
        toggleBtn.style.background = running ? '#0a0' : '#f00';

        if (running && !loopId) startLoop();
        else stopLoop();
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function startLoop() {
        loopId = requestAnimationFrame(loop);
    }

    async function loop() {
        if (!running) return stopLoop();

        try {
            // 25% wager click
            if (checkbox25.checked) {
                const betBtn = findButtonByText("25%");
                if (betBtn) {
                    betBtn.click();
                    console.log("Clicked 25%");
                    await sleep(50);
                }
            }

            // Start game
            const startBtn = findButtonByText("Start Game");
            if (startBtn) {
                startBtn.click();
                console.log("Clicked Start");
                await sleep(50);
            }

            // Click tiles
            const tiles = Array.from(document.querySelectorAll('button')).filter(b => b.className.includes('mine-tile'));
            if (tiles.length > 0) {
                if (checkboxMulti.checked) {
                    const clickedTiles = new Set();
                    let tries = 0;
                    while (clickedTiles.size < 3 && tries < 10) {
                        const tile = tiles[Math.floor(Math.random() * tiles.length)];
                        if (!clickedTiles.has(tile)) {
                            tile.click();
                            clickedTiles.add(tile);
                            console.log("Clicked a tile (multi)");
                            await sleep(50);
                        }
                        tries++;
                    }
                } else {
                    const tile = tiles[Math.floor(Math.random() * tiles.length)];
                    tile.click();
                    console.log("Clicked a tile");
                    await sleep(50);
                }
            }

            // Cash out
            const cashBtn = findButtonByText("Cash Out");
            if (cashBtn) {
                cashBtn.click();
                console.log("Clicked Cashout");
                await sleep(50);
            }
        } catch (err) {
            console.error("Loop error:", err);
        }

        // Schedule next frame
        loopId = requestAnimationFrame(loop);
    }

    function stopLoop() {
        running = false;
        toggleBtn.textContent = 'Auto Miner: OFF';
        toggleBtn.style.background = '#f00';
        if (loopId) cancelAnimationFrame(loopId);
        loopId = null;
    }

})();
