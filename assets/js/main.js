/**
 * INSDESIGN — Interações e Comportamentos Acessíveis
 * JavaScript leve focado estritamente em acessibilidade e navegação
 */

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona classe para habilitar animações via CSS
    document.body.classList.add('js-active');

    // --------------------------------------------------------------------------
    // Previne glitches visuais e transições indesejadas durante o redimensionamento
    // --------------------------------------------------------------------------
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('is-resizing');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('is-resizing');
        }, 150);
    });

    // --------------------------------------------------------------------------
    // 1. Menu Mobile Drawer com Acessibilidade e Transições Limpas
    // --------------------------------------------------------------------------
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileBtn && mainNav) {
        function openDrawer() {
            mobileBtn.setAttribute('aria-expanded', 'true');
            mobileBtn.setAttribute('aria-label', 'Fechar menu de navegação');
            mainNav.classList.remove('is-closing');
            mainNav.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            if (!mainNav.classList.contains('is-open')) return;
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.setAttribute('aria-label', 'Abrir menu de navegação');
            document.body.style.overflow = '';
            mainNav.classList.add('is-closing');
            setTimeout(() => {
                mainNav.classList.remove('is-open');
                mainNav.classList.remove('is-closing');
            }, 200);
        }

        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileBtn.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        // Fechar ao clicar em links dentro da navegação
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeDrawer();
            });
        });

        // Fechar ao pressionar a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
                closeDrawer();
                mobileBtn.focus();
            }
        });

        // Fecha o drawer imediatamente ao redimensionar para tela grande (desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mainNav.classList.contains('is-open')) {
                mobileBtn.setAttribute('aria-expanded', 'false');
                mobileBtn.setAttribute('aria-label', 'Abrir menu de navegação');
                mainNav.classList.remove('is-open', 'is-closing');
                document.body.style.overflow = '';
            }
        });
    }

    // --------------------------------------------------------------------------
    // 2. Micro-interação 3D suave nos Mockups da Hero (somente desktop e sem reduced-motion)
    // --------------------------------------------------------------------------
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth > 1050;

    if (!prefersReducedMotion && isDesktop) {
        const heroSection = document.querySelector('.hero');
        const deviceFront = document.querySelector('.device-front');
        const deviceBack = document.querySelector('.device-back');
        const sitesEl = document.querySelector('.sites-3d');
        const idEl = document.querySelector('.identidade-3d');
        const glows = document.querySelectorAll('.screen-glow');

        if (heroSection && deviceFront && deviceBack) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                // Variação sutil em torno do ângulo original
                const frontRotateY = -13 + (x * 10);
                const frontRotateX = -(y * 8);
                const backRotateY = 9 + (x * 7);
                const backRotateX = -(y * 5);

                deviceFront.style.transform = `rotate(10deg) rotateY(${frontRotateY}deg) rotateX(${frontRotateX}deg)`;
                deviceBack.style.transform = `rotate(-12deg) rotateY(${backRotateY}deg) rotateX(${backRotateX}deg)`;

                // Micro-parallax nas camadas internas dos celulares (profundidade leve de 3 a 6px)
                if (sitesEl) sitesEl.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
                if (idEl) idEl.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
                glows.forEach(glow => {
                    glow.style.transform = `translate(${x * -3}px, ${y * -3}px)`;
                });
            });

            heroSection.addEventListener('mouseleave', () => {
                deviceFront.style.transform = 'rotate(10deg) rotateY(-13deg)';
                deviceBack.style.transform = 'rotate(-12deg) rotateY(9deg)';
                if (sitesEl) sitesEl.style.transform = '';
                if (idEl) idEl.style.transform = '';
                glows.forEach(glow => {
                    glow.style.transform = '';
                });
            });
        }
    }

    // --------------------------------------------------------------------------
    // 3. Sequências Refinadas de Entrada por Seção (Scroll e Load)
    // --------------------------------------------------------------------------
    if (prefersReducedMotion) {
        // Se o usuário prefere movimento reduzido, revela tudo imediatamente
        document.querySelectorAll('section').forEach(sec => sec.classList.add('is-revealed'));
    } else {
        // Seções a serem observadas individualmente
        const sections = document.querySelectorAll('.hero, .about, .projects, .process');

        const sectionObserverOptions = {
            root: null,
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.12
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('is-revealed');
                    observer.unobserve(target);
                }
            });
        }, sectionObserverOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Revelar a Hero imediatamente no carregamento
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('is-revealed');
            }, 60);
        }

        // Suporte a âncoras diretas (ex: /#projetos, /#sobre) e rolagem rápida
        function checkAnchorsAndFastScroll() {
            const hash = window.location.hash;
            if (hash) {
                const targetEl = document.querySelector(hash);
                if (targetEl) {
                    const targetSection = targetEl.closest('section') || targetEl;
                    targetSection.classList.add('is-revealed');

                    // Revela todas as seções anteriores à âncora
                    let prev = targetSection.previousElementSibling;
                    while (prev) {
                        if (prev.tagName === 'SECTION') {
                            prev.classList.add('is-revealed');
                        }
                        prev = prev.previousElementSibling;
                    }
                }
            }
        }

        // Executar verificação de hash no carregamento e mudanças de hash
        checkAnchorsAndFastScroll();
        window.addEventListener('hashchange', checkAnchorsAndFastScroll);

        // ----------------------------------------------------------------------
        // 4. Parallax Sutil e Seguro entre Camadas (Apenas Desktop: 8 a 18px)
        // ----------------------------------------------------------------------
        if (window.innerWidth > 768) {
            const parallaxLayers = [
                { el: document.querySelector('.hero-ribbon'), speed: 0.04, max: 16 }
            ].filter(item => item.el !== null);

            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                        parallaxLayers.forEach(layer => {
                            const rect = layer.el.getBoundingClientRect();
                            // Só aplica quando a camada estiver próxima à área de visão
                            if (rect.top < window.innerHeight && rect.bottom > 0) {
                                const offset = Math.max(-layer.max, Math.min(layer.max, (scrollY - (rect.top + scrollY - 300)) * layer.speed));
                                layer.el.style.transform = layer.el.classList.contains('service-ribbon')
                                    ? `scaleY(-1) translateY(${offset}px)`
                                    : `translateY(${offset}px)`;
                            }
                        });
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    }

    // --------------------------------------------------------------------------
    // 5. Vitrine Interativa de Sites (PC Monitor com Vídeos em Loop Contínuo)
    // --------------------------------------------------------------------------
    function initSitesShowcase() {
        const sitesSection = document.getElementById('sites');
        if (!sitesSection) return;

        const siteData = [
            { url: 'villelaodontologia.com.br' },
            { url: 'drageizalopes.com.br' },
            { url: 'odontoexcellence.com.br' }
        ];

        const tabCards = sitesSection.querySelectorAll('.site-tab-card');
        const dots = sitesSection.querySelectorAll('.site-dot');
        const videos = [
            document.getElementById('site-vid-0'),
            document.getElementById('site-vid-1'),
            document.getElementById('site-vid-2')
        ].filter(Boolean);

        const pcUrlText = document.getElementById('pcUrlText');
        const prevBtn = document.getElementById('prevSiteBtn');
        const nextBtn = document.getElementById('nextSiteBtn');
        const sitePrevBtn = document.getElementById('sitePrevBtn');
        const siteNextBtn = document.getElementById('siteNextBtn');
        const pcMonitor = document.getElementById('pcMonitor');
        const siteCardShowcase = document.getElementById('siteCardShowcase');
        const dotsNav = document.getElementById('siteDotsNav');

        let currentIndex = 0;
        let cycleTimer = null;
        const cycleInterval = 8000;

        // Garante que todos os vídeos iniciem a reprodução suave em loop
        videos.forEach((video) => {
            video.muted = true;
            video.playsInline = true;
            video.loop = true;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    const startPlayback = () => {
                        video.play().catch(() => {});
                        document.removeEventListener('click', startPlayback);
                        document.removeEventListener('touchstart', startPlayback);
                    };
                    document.addEventListener('click', startPlayback, { once: true });
                    document.addEventListener('touchstart', startPlayback, { once: true });
                });
            }
        });

        function switchSite(index) {
            if (index === currentIndex && tabCards[index]?.classList.contains('active')) return;
            currentIndex = index;

            // Atualiza os cards (apenas o ativo fica visível)
            tabCards.forEach((card, idx) => {
                const isActive = idx === index;
                card.classList.toggle('active', isActive);
                card.setAttribute('aria-selected', isActive ? 'true' : 'false');

                // Reinicia animação da barra de progresso do card ativo
                if (isActive) {
                    const progressBar = card.querySelector('.site-tab-progress');
                    if (progressBar) {
                        progressBar.style.animation = 'none';
                        void progressBar.offsetWidth; // Força reflow
                        progressBar.style.animation = '';
                    }
                }
            });

            // Atualiza os dots indicadores de navegação
            dots.forEach((dot, idx) => {
                const isActive = idx === index;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            // Atualiza os vídeos com transição suave de opacidade
            videos.forEach((vid, idx) => {
                const isActive = idx === index;
                vid.classList.toggle('active', isActive);
                if (isActive) {
                    vid.play().catch(() => {});
                }
            });

            // Atualiza o domínio na barra de URL com fade rápido
            if (pcUrlText && siteData[index]) {
                pcUrlText.style.opacity = '0';
                setTimeout(() => {
                    pcUrlText.textContent = siteData[index].url;
                    pcUrlText.style.opacity = '1';
                }, 150);
            }

            restartCycle();
        }

        function nextSite() {
            const nextIdx = (currentIndex + 1) % tabCards.length;
            switchSite(nextIdx);
        }

        function prevSite() {
            const prevIdx = (currentIndex - 1 + tabCards.length) % tabCards.length;
            switchSite(prevIdx);
        }

        function restartCycle() {
            if (cycleTimer) clearInterval(cycleTimer);
            cycleTimer = setInterval(nextSite, cycleInterval);
        }

        // Cliques nos cards
        tabCards.forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    switchSite(idx);
                }
            });
        });

        // Controles de navegação (Setas do Card e Dots)
        if (sitePrevBtn) sitePrevBtn.addEventListener('click', prevSite);
        if (siteNextBtn) siteNextBtn.addEventListener('click', nextSite);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'), 10);
                if (!isNaN(idx)) {
                    switchSite(idx);
                }
            });
        });

        // Setas da moldura do PC
        if (nextBtn) nextBtn.addEventListener('click', nextSite);
        if (prevBtn) prevBtn.addEventListener('click', prevSite);

        // Suporte a teclado nos dots
        if (dotsNav) {
            dotsNav.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    nextSite();
                } else if (e.key === 'ArrowLeft') {
                    prevSite();
                }
            });
        }

        // Pausa temporária ao passar o mouse sobre o monitor ou o showcase
        [pcMonitor, siteCardShowcase].filter(Boolean).forEach(container => {
            container.addEventListener('mouseenter', () => {
                if (cycleTimer) clearInterval(cycleTimer);
            });
            container.addEventListener('mouseleave', () => {
                restartCycle();
            });
        });

        // Suporte a gestos touch (swipe) no monitor e no card showcase
        [pcMonitor, siteCardShowcase].filter(Boolean).forEach(touchTarget => {
            let touchStartX = 0;
            touchTarget.addEventListener('touchstart', (e) => {
                if (cycleTimer) clearInterval(cycleTimer);
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            touchTarget.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        nextSite();
                    } else {
                        prevSite();
                    }
                }
                restartCycle();
            }, { passive: true });
        });

        // Inicia o ciclo automático
        restartCycle();
    }

    initSitesShowcase();
});
