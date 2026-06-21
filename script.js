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

        /* ── DYNAMIC DATA PIPELINE BACKGROUND CANVAS ── */
        const pipeCanvas = document.getElementById('pipeline-canvas');
        const pipeCtx = pipeCanvas.getContext('2d');

        let pipelines = [];
        let packets = [];
        const gridSpacing = 80;

        function resizePipeline() {
            pipeCanvas.width = window.innerWidth;
            pipeCanvas.height = window.innerHeight;
            
            pipelines = [];
            packets = [];
            
            const cols = Math.ceil(pipeCanvas.width / gridSpacing);
            const rows = Math.ceil(pipeCanvas.height / gridSpacing);
            
            // Create horizontal pipeline lines
            for (let r = 1; r < rows; r++) {
                if (Math.random() > 0.25) {
                    pipelines.push({
                        type: 'h',
                        y: r * gridSpacing,
                        startX: 0,
                        endX: pipeCanvas.width,
                        color: Math.random() > 0.5 ? 'rgba(0, 200, 255, 0.03)' : 'rgba(124, 58, 237, 0.03)'
                    });
                    
                    const numPackets = Math.floor(Math.random() * 2) + 1;
                    for (let p = 0; p < numPackets; p++) {
                        packets.push({
                            type: 'h',
                            y: r * gridSpacing,
                            x: Math.random() * pipeCanvas.width,
                            speed: (0.4 + Math.random() * 0.9) * (Math.random() > 0.5 ? 1 : -1),
                            color: Math.random() > 0.6 ? '#06ffa5' : (Math.random() > 0.5 ? '#00c8ff' : '#7c3aed'),
                            size: 1.2 + Math.random() * 1.2
                        });
                    }
                }
            }
            
            // Create vertical pipeline lines
            for (let c = 1; c < cols; c++) {
                if (Math.random() > 0.25) {
                    pipelines.push({
                        type: 'v',
                        x: c * gridSpacing,
                        startY: 0,
                        endY: pipeCanvas.height,
                        color: Math.random() > 0.5 ? 'rgba(0, 200, 255, 0.03)' : 'rgba(6, 255, 165, 0.03)'
                    });
                    
                    const numPackets = Math.floor(Math.random() * 2) + 1;
                    for (let p = 0; p < numPackets; p++) {
                        packets.push({
                            type: 'v',
                            x: c * gridSpacing,
                            y: Math.random() * pipeCanvas.height,
                            speed: (0.4 + Math.random() * 0.9) * (Math.random() > 0.5 ? 1 : -1),
                            color: Math.random() > 0.6 ? '#06ffa5' : (Math.random() > 0.5 ? '#00c8ff' : '#7c3aed'),
                            size: 1.2 + Math.random() * 1.2
                        });
                    }
                }
            }
        }

        function drawPipeline() {
            pipeCtx.clearRect(0, 0, pipeCanvas.width, pipeCanvas.height);
            
            // Draw lines
            pipelines.forEach(pipe => {
                pipeCtx.strokeStyle = pipe.color;
                pipeCtx.lineWidth = 1;
                pipeCtx.beginPath();
                if (pipe.type === 'h') {
                    pipeCtx.moveTo(pipe.startX, pipe.y);
                    pipeCtx.lineTo(pipe.endX, pipe.y);
                } else {
                    pipeCtx.moveTo(pipe.x, pipe.startY);
                    pipeCtx.lineTo(pipe.x, pipe.endY);
                }
                pipeCtx.stroke();
            });
            
            // Draw flowing data packets
            packets.forEach(packet => {
                pipeCtx.fillStyle = packet.color;
                pipeCtx.shadowColor = packet.color;
                pipeCtx.shadowBlur = 6;
                
                pipeCtx.beginPath();
                pipeCtx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
                pipeCtx.fill();
                
                pipeCtx.shadowBlur = 0; // reset
                
                pipeCtx.globalAlpha = 0.35;
                pipeCtx.beginPath();
                if (packet.type === 'h') {
                    pipeCtx.arc(packet.x - packet.speed * 4, packet.y, packet.size * 0.75, 0, Math.PI * 2);
                    pipeCtx.arc(packet.x - packet.speed * 8, packet.y, packet.size * 0.5, 0, Math.PI * 2);
                    packet.x += packet.speed;
                    
                    if (packet.x > pipeCanvas.width) packet.x = 0;
                    if (packet.x < 0) packet.x = pipeCanvas.width;
                } else {
                    pipeCtx.arc(packet.x, packet.y - packet.speed * 4, packet.size * 0.75, 0, Math.PI * 2);
                    pipeCtx.arc(packet.x, packet.y - packet.speed * 8, packet.size * 0.5, 0, Math.PI * 2);
                    packet.y += packet.speed;
                    
                    if (packet.y > pipeCanvas.height) packet.y = 0;
                    if (packet.y < 0) packet.y = pipeCanvas.height;
                }
                pipeCtx.fill();
                pipeCtx.globalAlpha = 1.0;
            });
            
            requestAnimationFrame(drawPipeline);
        }

        resizePipeline();
        drawPipeline();
        window.addEventListener('resize', resizePipeline, { passive: true });

        /* ── THREE.JS 3D DATA PIPELINE NETWORK ── */
        (function() {
            const canvas = document.getElementById('three-canvas');
            if (!canvas) return;

            // 1. Scene setup
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x03060f, 0.0018);

            // 2. Camera setup
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 250;

            // 3. Renderer setup
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(window.innerWidth, window.innerHeight);

            // 4. Data network variables
            const nodesCount = 65;
            const nodes = [];
            const boxSize = 380;

            // Generate random 3D nodes
            for (let i = 0; i < nodesCount; i++) {
                nodes.push({
                    position: new THREE.Vector3(
                        (Math.random() - 0.5) * boxSize,
                        (Math.random() - 0.5) * boxSize,
                        (Math.random() - 0.5) * boxSize
                    ),
                    velocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.12,
                        (Math.random() - 0.5) * 0.12,
                        (Math.random() - 0.5) * 0.12
                    ),
                    connections: []
                });
            }

            // Create node geometry & points
            const pointGeo = new THREE.BufferGeometry();
            const positions = new Float32Array(nodesCount * 3);
            for (let i = 0; i < nodesCount; i++) {
                positions[i * 3] = nodes[i].position.x;
                positions[i * 3 + 1] = nodes[i].position.y;
                positions[i * 3 + 2] = nodes[i].position.z;
            }
            pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            // Create glowing material for nodes
            const pointMat = new THREE.PointsMaterial({
                color: 0x00c8ff,
                size: 4,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending
            });
            const pointSystem = new THREE.Points(pointGeo, pointMat);
            scene.add(pointSystem);

            // Create lines connection geometry
            const lineMat = new THREE.LineBasicMaterial({
                color: 0x7c3aed,
                transparent: true,
                opacity: 0.18,
                blending: THREE.AdditiveBlending
            });
            
            // Connect nodes that are close to each other
            const maxDistance = 110;
            for (let i = 0; i < nodesCount; i++) {
                for (let j = i + 1; j < nodesCount; j++) {
                    const dist = nodes[i].position.distanceTo(nodes[j].position);
                    if (dist < maxDistance) {
                        nodes[i].connections.push(j);
                        nodes[j].connections.push(i);
                    }
                }
            }

            // Initialize packet paths
            const packetsCount = 30;
            const packets = [];
            const packetGeometry = new THREE.SphereGeometry(1.2, 8, 8);
            const packetMaterials = [
                new THREE.MeshBasicMaterial({ color: 0x06ffa5, transparent: true, opacity: 0.95 }),
                new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.95 }),
                new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.95 })
            ];

            for (let i = 0; i < packetsCount; i++) {
                // Find a node with connections
                let startNodeIndex = Math.floor(Math.random() * nodesCount);
                while (nodes[startNodeIndex].connections.length === 0) {
                    startNodeIndex = Math.floor(Math.random() * nodesCount);
                }
                
                const startNode = nodes[startNodeIndex];
                const destNodeIndex = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
                
                const mesh = new THREE.Mesh(packetGeometry, packetMaterials[Math.floor(Math.random() * packetMaterials.length)]);
                scene.add(mesh);

                packets.push({
                    mesh: mesh,
                    startNode: startNodeIndex,
                    endNode: destNodeIndex,
                    progress: Math.random(),
                    speed: 0.004 + Math.random() * 0.007
                });
            }

            // Dynamic line geometry setup
            const lineGeo = new THREE.BufferGeometry();
            scene.add(new THREE.LineSegments(lineGeo, lineMat));

            // Mouse tracking
            let mouseX = 0, mouseY = 0;
            let targetX = 0, targetY = 0;
            
            window.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX - window.innerWidth / 2) * 0.08;
                mouseY = (e.clientY - window.innerHeight / 2) * 0.08;
            });

            // Scroll camera tracking
            let scrollY = 0;
            window.addEventListener('scroll', () => {
                scrollY = window.scrollY;
            }, { passive: true });

            // Window resize handler
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            // Animation loop
            function animate(time) {
                requestAnimationFrame(animate);

                // 1. Update nodes positions (floating movement)
                const posAttr = pointGeo.getAttribute('position');
                const linePositionsArray = [];

                for (let i = 0; i < nodesCount; i++) {
                    const node = nodes[i];
                    node.position.add(node.velocity);

                    // Bounce off boundary limits
                    if (Math.abs(node.position.x) > boxSize / 2) node.velocity.x *= -1;
                    if (Math.abs(node.position.y) > boxSize / 2) node.velocity.y *= -1;
                    if (Math.abs(node.position.z) > boxSize / 2) node.velocity.z *= -1;

                    posAttr.setXYZ(i, node.position.x, node.position.y, node.position.z);
                }
                posAttr.needsUpdate = true;

                // 2. Recalculate dynamic line connections
                for (let i = 0; i < nodesCount; i++) {
                    const node = nodes[i];
                    node.connections.forEach(connIdx => {
                        if (i < connIdx) {
                            linePositionsArray.push(
                                node.position.x, node.position.y, node.position.z,
                                nodes[connIdx].position.x, nodes[connIdx].position.y, nodes[connIdx].position.z
                            );
                        }
                    });
                }
                lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositionsArray, 3));

                // 3. Update packets flowing along connections
                packets.forEach(packet => {
                    packet.progress += packet.speed;
                    if (packet.progress >= 1) {
                        packet.progress = 0;
                        packet.startNode = packet.endNode;
                        const currNode = nodes[packet.startNode];
                        if (currNode.connections.length > 0) {
                            packet.endNode = currNode.connections[Math.floor(Math.random() * currNode.connections.length)];
                        }
                    }

                    const start = nodes[packet.startNode].position;
                    const end = nodes[packet.endNode].position;
                    packet.mesh.position.lerpVectors(start, end, packet.progress);
                });

                // 4. Smooth camera parallax
                targetX += (mouseX - targetX) * 0.05;
                targetY += (mouseY - targetY) * 0.05;

                const rotAngle = time * 0.00008;
                camera.position.x = Math.sin(rotAngle) * (260 + targetX) + Math.cos(rotAngle) * targetY * 0.2;
                camera.position.y = Math.cos(rotAngle) * (260 + targetY) + Math.sin(rotAngle) * targetX * 0.2;
                camera.position.z = Math.cos(rotAngle) * 260 + (scrollY * 0.06);

                camera.lookAt(scene.position);

                renderer.render(scene, camera);
            }

            requestAnimationFrame(animate);
        })();