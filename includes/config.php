<?php
/**
 * INSDESIGN — Configurações Gerais
 * Centralização de dados da marca, links e metadados
 */

// Informações da Marca
define('SITE_NAME', 'Insdesign');
define('SITE_TAGLINE', 'Evolução visual');
define('SITE_DESCRIPTION', 'Criamos sites, identidades visuais e conteúdos para mídias sociais que fazem sua marca se apresentar com consistência em cada lugar.');

// Canais Oficiais de Contato e Presença
// NOTA: Centralizado para evitar redirecionamento circular quando o site estiver em produção ou desenvolvimento local.
$contact_url = 'https://insdesign.com.br/contato';
$instagram_url = 'https://www.instagram.com/insdesignn/';

// Itens de Navegação Principal
$nav_items = [
    ['label' => 'Sites', 'url' => '#sites'],
    ['label' => 'Projetos', 'url' => '#projetos'],
    ['label' => 'Processo', 'url' => '#processo'],
];

// Projetos em Destaque
$portfolio_projects = [
    [
        'title' => 'Dra. Geiza Lopes',
        'category' => 'Design para mídias sociais',
        'badge' => 'SAÚDE · COMUNICAÇÃO',
        'image' => 'assets/images/geiza.jpg',
        'url' => 'https://www.instagram.com/insdesignn/p/CN8CbtIlWQ5/',
        'alt' => 'Design para mídias sociais — Dra. Geiza Lopes'
    ],
    [
        'title' => 'King & Queen',
        'category' => 'Peças com personalidade',
        'badge' => 'GASTRONOMIA · SOCIAL',
        'image' => 'assets/images/kingqueen.jpg',
        'url' => 'https://www.instagram.com/insdesignn/p/CQeC80mNU4B/',
        'alt' => 'Peças de mídias sociais — King & Queen Burger'
    ],
    [
        'title' => 'Café & criação',
        'category' => 'Estudo de comunicação visual',
        'badge' => 'ESTUDO · PROJETO CONCEITUAL',
        'image' => 'assets/images/cafeteria.jpg',
        'url' => 'https://www.instagram.com/insdesignn/p/CTU5rPJnmVc/',
        'alt' => 'Estudo de comunicação visual para cafeteria'
    ],
];

