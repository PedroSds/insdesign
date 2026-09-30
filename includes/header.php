<?php
/**
 * INSDESIGN — Cabeçalho e Meta Tags
 */
require_once __DIR__ . '/config.php';
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title><?= SITE_NAME ?> — <?= SITE_TAGLINE ?> | Design e Identidade Visual</title>
    <meta name="description" content="<?= SITE_DESCRIPTION ?>">
    <meta name="theme-color" content="#030508">
    <link rel="icon" type="image/png" href="assets/images/logo.png">

    <!-- Tipografia Oficial da Marca: Galano Grotesque -->
    <link rel="preload" href="assets/fonts/galano-grotesque-bold.otf" as="font" type="font/otf" crossorigin>
    <link rel="preload" href="assets/fonts/galano-grotesque-medium.otf" as="font" type="font/otf" crossorigin>

    <link rel="stylesheet" href="assets/css/style.css?v=<?= filemtime(__DIR__ . '/../assets/css/style.css') ?>">
</head>
<body>
    <a href="#conteudo-principal" class="skip-link">Pular para o conteúdo principal</a>
