<?php
// Habilitar reporte de errores por si algo falla
error_reporting(E_ALL);
ini_set('display_errors', 1);

$zip = new ZipArchive;
// El '../' le dice que el ZIP está una carpeta más atrás de donde está este script
$archivoZip = '../proyecto.zip';

echo "Iniciando descompresión de: " . realpath($archivoZip) . "<br>";

if ($zip->open($archivoZip) === TRUE) {
    // Extraemos en '../' para que la carpeta 'proyecto' se cree en la raíz del proyecto
    if ($zip->extractTo('../')) {
        echo "✅ <b>¡Éxito!</b> La carpeta 'proyecto' se extrajo correctamente en la raíz del proyecto.<br>";
    }
    else {
        echo "❌ Error al extraer los archivos. Revisa los permisos de carpeta.";
    }
    $zip->close();
}
else {
    echo "❌ Error: No se pudo abrir el archivo 'proyecto.zip'. <br>";
    echo "Asegúrate de que el archivo esté en: /public_html/lms-platform/proyecto.zip";
}
?>