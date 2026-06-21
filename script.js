/* ── TERMINAL LOADER ── */
        window.addEventListener('DOMContentLoaded', () => {
            const loader = document.getElementById('loader');
            // Allow loader animation to finish (2.2s progress bar + buffer)
            setTimeout(() => {
                loader.classList.add('hidden');
                initHeroTyping();
            }, 2400);
        });

        /* ── STATUS BAR LIVE CLOCK ── */
        function startClock() {
            const clockEl = document.getElementById('clock');
            function update() {
                const now = new Date();
                const hh = String(now.getHours()).padStart(2, '0');
                const mm = String(now.getMinutes()).padStart(2, '0');
                const ss = String(now.getSeconds()).padStart(2, '0');
                clockEl.textContent = `${hh}:${mm}:${ss}`;
            }
            setInterval(update, 1000);
            update();
        }
        startClock();

        /* ── MOBILE MENU DRAWER ── */
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = mobileMenu.querySelectorAll('a');

        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            if (burgerBtn.classList.contains('active')) {
                mobileMenu.style.right = '0';
                burgerBtn.children[0].style.transform = 'translateY(6.5px) rotate(45deg)';
                burgerBtn.children[1].style.opacity = '0';
                burgerBtn.children[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
            } else {
                mobileMenu.style.right = '-100%';
                burgerBtn.children[0].style.transform = 'none';
                burgerBtn.children[1].style.opacity = '1';
                burgerBtn.children[2].style.transform = 'none';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.right = '-100%';
                burgerBtn.classList.remove('active');
                burgerBtn.children[0].style.transform = 'none';
                burgerBtn.children[1].style.opacity = '1';
                burgerBtn.children[2].style.transform = 'none';
            });
        });

        /* ── SCROLL HEADER & ACTIVE NAV LINKS ── */
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            let activeId = '';
            sections.forEach(sec => {
                const top = sec.offsetTop - 200;
                const height = sec.offsetHeight;
                if (window.scrollY >= top && window.scrollY < top + height) {
                    activeId = sec.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + activeId) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });

        /* ── CUSTOM LERPING CURSOR ── */
        const curDot = document.getElementById('cursor-dot');
        const curRing = document.getElementById('cursor-ring');
        
        let mouse = { x: -100, y: -100 };
        let ringPos = { x: -100, y: -100 };

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // Move dot instantly using GPU-accelerated transform
            curDot.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
        });

        // Lerp outer ring — faster factor = less lag on triangle
        function animateRing() {
            const lerpFactor = 0.18;
            ringPos.x += (mouse.x - ringPos.x) * lerpFactor;
            ringPos.y += (mouse.y - ringPos.y) * lerpFactor;

            // Use GPU-accelerated transform (no left/top layout reflow)
            curRing.style.transform = `translate(${ringPos.x - 22}px, ${ringPos.y - 22}px)`;

            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover scale effects
        document.querySelectorAll('a, button, .proj-card, .clink, .cert-card, .sk-cat, .skill-bar-card, .nav-burger, .profile-card').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });

        /* ── FALLING MATRIX CANVAS LAYER ── */
        const mCanvas = document.getElementById('matrix-canvas');
        const mCtx = mCanvas.getContext('2d');
        
        const maxCols = 120;
        let drops = [];
        const matrixChars = "01SELECTFROMWHEREJOINGROUPBYETLSQLPYTHONDATAPIPELINETRANSFORMLOADVALIDATEAIRFLOWSTARMODELINGEST".split("");
        const matrixColors = ["#00c8ff", "#06ffa5", "#00ffcc", "#ff6b35"];

        function resizeMatrix() {
            mCanvas.width = window.innerWidth;
            mCanvas.height = window.innerHeight;
            
            const colWidth = mCanvas.width / maxCols;
            drops = [];
            for (let i = 0; i < maxCols; i++) {
                drops.push({
                    x: i * colWidth,
                    y: Math.random() * -mCanvas.height,
                    speed: 1 + Math.random() * 2.5,
                    charIndex: Math.floor(Math.random() * matrixChars.length),
                    color: matrixColors[Math.floor(Math.random() * matrixColors.length)],
                    opacity: 0.1 + Math.random() * 0.4
                });
            }
        }

        function drawMatrix() {
            mCtx.fillStyle = 'rgba(3, 6, 15, 0.042)';
            mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
            mCtx.font = "9px 'DM Mono', monospace";

            for (let i = 0; i < maxCols; i++) {
                const drop = drops[i];
                mCtx.fillStyle = drop.color;
                mCtx.globalAlpha = drop.opacity;
                
                const char = matrixChars[drop.charIndex];
                mCtx.fillText(char, drop.x, drop.y);
                mCtx.globalAlpha = 1.0;

                drop.y += drop.speed * 4;
                drop.charIndex = (drop.charIndex + 1) % matrixChars.length;

                if (drop.y > mCanvas.height) {
                    drop.y = Math.random() * -100;
                    drop.color = matrixColors[Math.floor(Math.random() * matrixColors.length)];
                }
            }
        }
        
        resizeMatrix();
        setInterval(drawMatrix, 85);
        window.addEventListener('resize', resizeMatrix, { passive: true });

        /* ── PARTICLE CONNECTION CANVAS ── */
        const pCanvas = document.getElementById('particle-canvas');
        const pCtx = pCanvas.getContext('2d');
        
        let particles = [];
        const particleColors = ['#00c8ff', '#7c3aed', '#06ffa5'];
        const maxConnectionDist = 100;

        function resizeParticles() {
            pCanvas.width = window.innerWidth;
            pCanvas.height = window.innerHeight;
            
            particles = [];
            for (let i = 0; i < 120; i++) {
                particles.push({
                    x: Math.random() * pCanvas.width,
                    y: Math.random() * pCanvas.height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: Math.random() * 1.5 + 0.8,
                    color: particleColors[Math.floor(Math.random() * particleColors.length)],
                    life: Math.random(),
                    decay: 0.0015 + Math.random() * 0.003
                });
            }
        }

        function drawParticles() {
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;

                if (p.life <= 0) {
                    p.life = 1;
                    p.x = Math.random() * pCanvas.width;
                    p.y = Math.random() * pCanvas.height;
                }

                if (p.x < 0 || p.x > pCanvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > pCanvas.height) p.vy *= -1;

                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                pCtx.fillStyle = p.color;
                
                // Fade in/out through lifecycle sine waves
                pCtx.globalAlpha = Math.sin(p.life * Math.PI);
                pCtx.fill();
            }

            // Connection lines
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectionDist) {
                        const alpha = (1 - dist / maxConnectionDist) * Math.sin(p1.life * Math.PI) * Math.sin(p2.life * Math.PI) * 0.15;
                        pCtx.strokeStyle = p1.color;
                        pCtx.lineWidth = 0.5;
                        pCtx.beginPath();
                        pCtx.moveTo(p1.x, p1.y);
                        pCtx.lineTo(p2.x, p2.y);
                        pCtx.globalAlpha = alpha;
                        pCtx.stroke();
                    }
                }
            }
            pCtx.globalAlpha = 1.0;
            requestAnimationFrame(drawParticles);
        }

        resizeParticles();
        drawParticles();
        window.addEventListener('resize', resizeParticles, { passive: true });

        /* ── HERO TYPED TEXT CYCLE ── */
        const phrases = [
            "Data Analyst & SQL Expert",
            "Generative AI Practitioner",
            "ML & Deep Learning Engineer",
            "ETL Pipeline Architect",
            "VP Career Services @ SCSET"
        ];
        
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        const typedTextEl = document.getElementById('typed-text');

        function initHeroTyping() {
            setTimeout(typePhrase, 800); // Trigger typed effect shortly after loader hides
        }

        function typePhrase() {
            const currentText = phrases[phraseIdx];
            
            if (isDeleting) {
                typedTextEl.textContent = currentText.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typedTextEl.textContent = currentText.substring(0, charIdx + 1);
                charIdx++;
            }

            let delay = isDeleting ? 38 : 75;

            if (!isDeleting && charIdx === currentText.length) {
                delay = 1800; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                delay = 500; // Slight pause before next word
            }

            setTimeout(typePhrase, delay);
        }

        /* ── SCROLL REVEALS ── */
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

        /* ── STATS COUNT-UP ── */
        function animateStats() {
            const stats = document.querySelectorAll('.hstat-n');
            const duration = 1800;
            const start = performance.now();

            stats.forEach(el => {
                const target = parseInt(el.getAttribute('data-target'), 10);
                const suffix = el.getAttribute('data-suffix') || '';

                function step(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                    const val = Math.floor(ease * target);

                    el.textContent = val + (target >= 100 ? '+' : '') + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target + (target >= 100 ? '+' : '') + suffix;
                    }
                }
                requestAnimationFrame(step);
            });
        }

        const statsObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateStats();
                    statsObs.disconnect(); // Only run once
                }
            });
        }, { threshold: 0.5 });
        
        const statsEl = document.querySelector('.hero-stats');
        if (statsEl) statsObs.observe(statsEl);

        /* ── SKILL BARS ENTRY ANIMATION ── */
        const skillCards = document.querySelectorAll('.skill-bar-card');
        const skillObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const fill = card.querySelector('.sb-fill');
                    const pctEl = card.querySelector('.sbcard-pct');
                    
                    const targetPct = parseInt(pctEl.getAttribute('data-pct'), 10);
                    const duration = 1200;
                    const start = performance.now();

                    function step(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                        
                        const val = Math.floor(ease * targetPct);
                        pctEl.textContent = `${val}%`;
                        fill.style.width = `${ease * targetPct}%`;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            pctEl.textContent = `${targetPct}%`;
                            fill.style.width = `${targetPct}%`;
                        }
                    }
                    requestAnimationFrame(step);
                    skillObs.unobserve(card); // Only animate once
                }
            });
        }, { threshold: 0.4 });

        skillCards.forEach(c => skillObs.observe(c));

        /* ── PROJECT CARD MOUSE GLOW TRACKING ── */
        document.querySelectorAll('.proj-card').forEach(c => {
            c.addEventListener('mousemove', e => {
                const r = c.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                c.style.setProperty('--px', `${x}%`);
                c.style.setProperty('--py', `${y}%`);
            });
        });