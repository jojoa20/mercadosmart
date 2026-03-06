/* BULLFOLIO — Landing Scripts */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// --- MAGNETIC SPOTLIGHT CARDS ---
const spotlightCards = document.querySelectorAll('.scrolly-info, .step, .asset-cluster, .team-card, .math-box');

spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- IMMERSIVE CUSTOM CURSOR ---
const customCursor = document.getElementById('custom-cursor');
if (customCursor && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Global mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // High performance render loop (LERP physics)
    const renderCursor = () => {
        // Interpolate 25% of the distance per frame for a snappy but smooth delay
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;

        customCursor.style.left = `${cursorX}px`;
        customCursor.style.top = `${cursorY}px`;

        requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Magnetic interaction triggers
    const interactiveElements = document.querySelectorAll('a, button, .ticker-h-item, .crypto-ticker-item, .team-card, .scrolly-info');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('cursor-hover'));
    });
}

// Mobile menu
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = mobileToggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(8px) rotate(45deg)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'translateY(-8px) rotate(-45deg)' : '';
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.querySelectorAll('span').forEach(s => { s.style.transform = s.style.opacity = ''; });
    });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
            const index = siblings.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
function animateCounter(el, target, suffix = '') {
    const duration = 1800, start = performance.now();
    const update = (ts) => {
        const progress = Math.min((ts - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.hero-stat-value').forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, suffix);
            });
            statObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// Float tag entrance
window.addEventListener('load', () => {
    document.querySelectorAll('.float-tag').forEach((tag, i) => {
        tag.style.cssText = 'opacity:0;transform:scale(0.8) translateY(10px)';
        setTimeout(() => {
            tag.style.transition = 'opacity 0.6s ease,transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
            tag.style.opacity = '1';
            tag.style.transform = '';
        }, 800 + i * 200);
    });
});



// CTA Form
const ctaForm = document.getElementById('cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('cta-email').value;
        const btn = document.getElementById('cta-submit-btn');
        btn.disabled = true; btn.textContent = 'Procesando...';
        setTimeout(() => {
            ctaForm.innerHTML = `<div style="text-align:center;padding:24px 32px;background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);border-radius:20px;color:#00FF88;font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:600;">✅ ¡Listo! Te notificamos en <strong>${email}</strong> al lanzar.</div>`;
        }, 1200);
    });
}

// Ticker tooltips
const tickers = { SPY: 'S&P 500 ETF', TLT: 'Bonos del Tesoro 20+ años', QQQ: 'NASDAQ 100', GLD: 'Gold ETF', BTC: 'Bitcoin', ETH: 'Ethereum', SOL: 'Solana', AAPL: 'Apple Inc.', MSFT: 'Microsoft Corp.', NVDA: 'NVIDIA Corp.', PFBCOL: 'Bancolombia', ISA: 'Interconexión Eléctrica', NUTRESA: 'Grupo Nutresa', EFA: 'iShares MSCI EAFE', VWO: 'Vanguard Emerging Markets' };
document.querySelectorAll('.chip:not(.chip-muted)').forEach(chip => {
    const t = chip.textContent.trim();
    if (tickers[t]) chip.title = tickers[t];
});

// --- VERTICAL CRYPTO TICKER (BinANCE API) ---
const tickerSymbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'ADAUSDT'];
const tickerTrack = document.getElementById('crypto-ticker-track');

async function fetchCryptoPrices() {
    if (!tickerTrack) return;
    try {
        const symbolsParam = encodeURIComponent(JSON.stringify(tickerSymbols));
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsParam}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Build HTML string for items
        let itemsHtml = '';
        data.forEach(coin => {
            const sym = coin.symbol.replace('USDT', '');

            // Format price: drop decimals for BTC, keep 2 for others, maybe 4 for ADA if needed but 2 is cleaner
            let priceVal = parseFloat(coin.lastPrice);
            const price = priceVal > 1000 ? priceVal.toLocaleString('en-US', { maximumFractionDigits: 0 }) : priceVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });

            const changeVal = parseFloat(coin.priceChangePercent);
            const changeClass = changeVal >= 0 ? 'positive' : 'negative';
            const changeSign = changeVal > 0 ? '+' : '';
            const changeText = `${changeSign}${changeVal.toFixed(2)}%`;

            itemsHtml += `
                <div class="crypto-ticker-item">
                    <span class="ticker-symbol">${sym}</span>
                    <span class="ticker-price">$${price}</span>
                    <span class="ticker-change ${changeClass}">${changeText}</span>
                </div>
            `;
        });

        // Duplicate the list inside the track so the CSS infinite scroll loop is seamless
        tickerTrack.innerHTML = itemsHtml + itemsHtml;

    } catch (error) {
        console.error("Error fetching crypto prices from Binance:", error);
    }
}

// Fetch immediately, then every 10 seconds
if (tickerTrack) {
    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 10000);
}

// --- HORIZONTAL MARKET TICKER (Crypto + Real Stocks via Supabase Edge Function) ---
const tickerHTrack = document.getElementById('market-ticker-track');

// Supabase Edge Function URL for real stock prices (proxies Yahoo Finance, no CORS issues)
const STOCK_PRICES_URL = 'https://cvrrygffwmxmemlsdnax.supabase.co/functions/v1/stock-prices?symbols=SPY,QQQ,AAPL,MSFT,NVDA';

// Fallback data in case the Edge Function is unreachable (markets closed, etc.)
let cachedStocks = [
    { symbol: 'SPY', price: 512.85, change: 0.45 },
    { symbol: 'QQQ', price: 445.62, change: 0.82 },
    { symbol: 'AAPL', price: 172.44, change: -1.20 },
    { symbol: 'MSFT', price: 405.12, change: 1.55 },
    { symbol: 'NVDA', price: 875.38, change: 3.45 }
];

function buildTickerItemHtml(symbol, priceVal, changeVal) {
    const priceStr = priceVal > 1000
        ? priceVal.toLocaleString('en-US', { maximumFractionDigits: 0 })
        : priceVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const changeClass = changeVal >= 0 ? 'positive' : 'negative';
    const changeSign = changeVal > 0 ? '+' : '';
    const sparklinePath = changeVal >= 0
        ? '<path d="M 0 16 Q 10 12 20 14 T 40 4" fill="none" class="sparkline-path" />'
        : '<path d="M 0 4 Q 10 8 20 10 T 40 16" fill="none" class="sparkline-path" />';

    return `
        <div class="ticker-h-item">
            <span class="sym">${symbol}</span>
            <span class="price">$${priceStr}</span>
            <div class="sparkline-container ${changeClass}">
                <svg viewBox="0 0 40 20" class="sparkline" preserveAspectRatio="none">
                    ${sparklinePath}
                </svg>
            </div>
            <span class="chg ${changeClass}">${changeSign}${changeVal.toFixed(2)}%</span>
            <span class="sep">|</span>
        </div>
    `;
}

async function fetchHorizontalTickerData() {
    if (!tickerHTrack) return;

    let itemsHtml = '';

    // 1. Fetch Crypto from Binance (BTC, ETH) — already works perfectly
    try {
        const hCryptoSymbols = ['BTCUSDT', 'ETHUSDT'];
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(hCryptoSymbols))}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            data.forEach(coin => {
                const sym = coin.symbol.replace('USDT', '');
                itemsHtml += buildTickerItemHtml(sym, parseFloat(coin.lastPrice), parseFloat(coin.priceChangePercent));
            });
        }
    } catch (err) {
        console.warn("Could not fetch crypto for horizontal ticker", err);
    }

    // 2. Fetch REAL stock prices from Supabase Edge Function (proxied Yahoo Finance)
    try {
        const response = await fetch(STOCK_PRICES_URL);
        if (response.ok) {
            const stockData = await response.json();
            if (Array.isArray(stockData) && stockData.length > 0) {
                cachedStocks = stockData; // Update cache with real data
            }
        }
    } catch (err) {
        console.warn("Edge Function unreachable, using cached stock data", err);
    }

    // Render stocks (real data or cached fallback)
    cachedStocks.forEach(stock => {
        itemsHtml += buildTickerItemHtml(stock.symbol, stock.price, stock.change);
    });

    // Duplicate for seamless CSS infinite scroll loop
    tickerHTrack.innerHTML = itemsHtml.repeat(4);
}

// Fetch horizontal immediately, then every 30 seconds (Edge Function caches for 30s)
if (tickerHTrack) {
    fetchHorizontalTickerData();
    setInterval(fetchHorizontalTickerData, 30000);
}

console.log('%c 🐂 BULLFOLIO Robo-Advisor', 'color:#00D4FF;font-size:18px;font-weight:bold;');
console.log('%c Powered by Markowitz + K-Means + yfinance', 'color:#00FF88;font-size:12px;');

// --- HERO CANVAS SCROLL ANIMATION ---
const canvas = document.getElementById("hero-canvas");
if (canvas) {
    const context = canvas.getContext("2d");
    const frameCount = 191; // 191 frames extracted
    const imgFolder = "public/assets/hero/frames/";

    // The frames are expected to be 16:9 natively. We set a high-res base.
    const baseWidth = 1920;
    const baseHeight = 1080;

    // Resize canvas properly (internal resolution)
    const resizeCanvas = () => {
        canvas.width = baseWidth;
        canvas.height = baseHeight;
    };

    resizeCanvas();

    // We will preload images into this array
    const images = [];
    let imagesLoaded = 0;

    const currentFrame = index => `${imgFolder}frame_${index.toString().padStart(4, '0')}.png`;

    const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                imagesLoaded++;
                // Draw the first frame when loaded
                if (i === 1) {
                    renderFrame(1);
                }
            };
            images.push(img);
        }
    };

    const renderFrame = (index) => {
        if (!images[index - 1] || !images[index - 1].complete) return;

        const img = images[index - 1];

        // Context optimizations
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        context.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the image filling the 1920x1080 internal canvas. CSS handles the max-width: 1400px and aspect-ratio.
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Start preloading
    preloadImages();

    // Track Scroll Progress for the Hero Section
    const heroSection = document.getElementById("hero");
    let currentScrollFrame = 1;
    let targetScrollFrame = 1;
    let ticking = false;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;

        // Only run animation if we are within the hero section height (minus viewport height for the stickiness)
        const maxScroll = heroSection.scrollHeight - window.innerHeight;

        if (scrollTop <= maxScroll && maxScroll > 0) {
            const scrollFraction = Math.max(0, scrollTop) / maxScroll;
            let frameIndex = Math.min(
                frameCount,
                Math.max(1, Math.ceil(scrollFraction * frameCount))
            );

            targetScrollFrame = frameIndex;

            if (!ticking) {
                window.requestAnimationFrame(smoothAnimation);
                ticking = true;
            }
        }
    });

    // Smooth animation interpolator
    const smoothAnimation = () => {
        // Easing factor to prevent jitter, makes scrolling feel buttery
        const diff = targetScrollFrame - currentScrollFrame;

        if (Math.abs(diff) > 0.1) {
            currentScrollFrame += diff * 0.25; // Easing value
            renderFrame(Math.round(currentScrollFrame));
            window.requestAnimationFrame(smoothAnimation);
        } else {
            currentScrollFrame = targetScrollFrame;
            renderFrame(targetScrollFrame);
            ticking = false;
        }
    };

    // Handle Window Resize
    window.addEventListener("resize", () => {
        resizeCanvas();
        renderFrame(Math.round(currentScrollFrame));
    });
}

// --- ENGINES SCROLLYTELLING (GSAP ScrollTrigger) ---
gsap.registerPlugin(ScrollTrigger);

const enginesCanvas = document.getElementById("engines-canvas");
if (enginesCanvas) {
    const ctx = enginesCanvas.getContext("2d");
    enginesCanvas.width = 960;
    enginesCanvas.height = 540;

    // 4 engine animation sets
    const engines = [
        { folder: "public/assets/flow/kmeans/", frames: [], loaded: false },
        { folder: "public/assets/flow/markowitz/", frames: [], loaded: false },
        { folder: "public/assets/flow/var/", frames: [], loaded: false },
        { folder: "public/assets/flow/rebalanceo/", frames: [], loaded: false }
    ];
    const FRAME_COUNT = 192;

    // Preload a single engine's frames
    function preloadEngine(idx) {
        if (engines[idx].loaded) return Promise.resolve();
        return new Promise(resolve => {
            let loadedCount = 0;
            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = `${engines[idx].folder}frame_${(i + 1).toString().padStart(4, '0')}.jpg`;
                img.onload = img.onerror = () => {
                    loadedCount++;
                    if (loadedCount >= FRAME_COUNT) {
                        engines[idx].loaded = true;
                        resolve();
                    }
                };
                engines[idx].frames.push(img);
            }
        });
    }

    // Start preloading all engines (first one immediately, others deferred)
    preloadEngine(0).then(() => renderFrame(0, 0));
    setTimeout(() => preloadEngine(1), 500);
    setTimeout(() => preloadEngine(2), 1500);
    setTimeout(() => preloadEngine(3), 2500);

    let currentEngine = 0;
    let currentFrame = 0;

    function renderFrame(engineIdx, frameIdx) {
        // Main full-screen background canvas
        ctx.clearRect(0, 0, enginesCanvas.width, enginesCanvas.height);
        const img = engines[engineIdx]?.frames[frameIdx];
        if (img && img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, 0, 0, enginesCanvas.width, enginesCanvas.height);
        }
        currentEngine = engineIdx;
        currentFrame = frameIdx;
    }

    // Info bar elements
    const infoPanels = [
        document.getElementById('scrolly-info-1'),
        document.getElementById('scrolly-info-2'),
        document.getElementById('scrolly-info-3'),
        document.getElementById('scrolly-info-4')
    ];
    const dots = document.querySelectorAll('.scrolly-dot');
    const header = document.querySelector('.scrolly-header');

    // Dynamic Label
    const dynamicLabel = document.getElementById('scrolly-dynamic-label');
    const stepLabels = [
        "01 · Perfilamiento",
        "02 · Optimización",
        "03 · Validación",
        "04 · Gestión"
    ];

    let activeStep = -1;

    function setStep(index) {
        if (index === activeStep) return;

        // Update info panels
        infoPanels.forEach(p => { if (p) p.classList.remove('active'); });
        if (infoPanels[index]) infoPanels[index].classList.add('active');

        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');

        // Update dynamic label
        if (dynamicLabel && stepLabels[index]) {
            dynamicLabel.textContent = stepLabels[index];
        }

        activeStep = index;
    }

    function onScrollUpdate(progress) {
        // Show/hide header
        if (header) {
            header.classList.toggle('visible', progress > 0.02 && progress < 0.95);
        }

        // Determine which engine (0-3) and local progress within that engine
        const engineIdx = Math.min(3, Math.floor(progress * 4));
        const localProgress = (progress * 4) - engineIdx; // 0→1 within each engine
        const frameIdx = Math.min(FRAME_COUNT - 1, Math.floor(localProgress * FRAME_COUNT));

        // Update step indicator + info panel
        setStep(engineIdx);

        // Render the correct frame from the correct engine
        if (engines[engineIdx].loaded) {
            renderFrame(engineIdx, frameIdx);
        }
    }

    // Initialize
    setStep(0);

    // GSAP scroll-driven
    ScrollTrigger.create({
        trigger: ".engines-scrollytelling",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            onScrollUpdate(self.progress);
        }
    });

    // Handle resize
    window.addEventListener("resize", () => {
        enginesCanvas.width = 960;
        enginesCanvas.height = 540;
        renderFrame(currentEngine, currentFrame);
    });
}


