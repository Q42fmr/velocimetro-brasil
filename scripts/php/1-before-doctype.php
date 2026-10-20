<?php
$isDev = true;

if(!$isDev) {
    require_once __DIR__ . '/../vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/landings/');
    $dotenv->safeLoad();
}

$returnPage = $_ENV['WHITE_FORM_RETURN_PAGE'] ?? 'thank-you';
if (!str_ends_with($returnPage, '.html')) {
    $returnPage .= '.html';
}

$trackingConfig = [
    'gtagId'      => $_ENV['GA4_MEASUREMENT_ID'] ?? null,
    'gtagCLabel'  => $_ENV['GOOGLE_CONVERSION_LABEL'] ?? null,
    'bingPixelId' => $_ENV['BING_PIXEL_ID'] ?? null,
    'fbPixelId'   => $_ENV['FB_PIXEL_ID'] ?? null
];

$facebookPixelEventLeadKey = null;
if (!empty($_GET['fbpixelevent']) || !empty($_ENV['FB_EVENT_NAME'])) {
    $facebookPixelEventLeadKey = $_GET['fbpixelevent'] ?? $_ENV['FB_EVENT_NAME'];
}
?>
