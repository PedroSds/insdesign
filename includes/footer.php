<?php
/**
 * INSDESIGN — Rodapé
 */
require_once __DIR__ . '/config.php';
?>
    <footer class="site-footer">
        <div class="container footer-grid">
            <div class="footer-col brand-col">
                <a class="brand" href="#inicio" aria-label="<?= SITE_NAME ?> — Voltar ao topo">
                    <img src="assets/images/logo.png" alt="<?= SITE_NAME ?> — <?= SITE_TAGLINE ?>" width="178" height="40" loading="lazy">
                </a>
                <p class="footer-tagline">Design para marcas<br>que querem ser lembradas.</p>
            </div>

            <div class="footer-col">
                <small class="col-title">EXPLORE</small>
                <ul class="footer-links">
                    <li><a href="#sites">Sites</a></li>
                    <li><a href="#projetos">Projetos</a></li>
                    <li><a href="#processo">Processo</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <small class="col-title">CONECTE-SE</small>
                <ul class="footer-links">
                    <li><a href="<?= htmlspecialchars($instagram_url) ?>" target="_blank" rel="noopener">Instagram <span aria-hidden="true">↗</span></a></li>
                    <li><a href="<?= htmlspecialchars($contact_url) ?>" target="_blank" rel="noopener">Solicite um orçamento <span aria-hidden="true">↗</span></a></li>
                </ul>
            </div>

            <div class="footer-col info-col">
                <small class="col-title">POSICIONAMENTO</small>
                <p class="footer-statement">Identidade visual e direção criativa com consistência, sofisticação e propósito.</p>
            </div>

            <div class="copyright">
                <span>&copy; <?= date('Y') ?> <?= SITE_NAME ?> · <?= SITE_TAGLINE ?>. Todos os direitos reservados.</span>
            </div>
        </div>
    </footer>

    <!-- Scripts de interação necessários -->
    <script src="assets/js/main.js?v=<?= filemtime(__DIR__ . '/../assets/js/main.js') ?>" defer></script>
</body>
</html>
