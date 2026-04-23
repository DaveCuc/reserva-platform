<?php
// Ruta a la carpeta que quieres borrar (una carpeta hacia atrás desde public)
$carpeta = '../vendor';


function borrarDirectorio($dir)
{
    if (!file_exists($dir)) {
        return true;
    }
    if (!is_dir($dir)) {
        return unlink($dir);
    }
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }
        // Llamada recursiva para borrar todo el contenido
        if (!borrarDirectorio($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }
    return rmdir($dir);
}

if (borrarDirectorio($carpeta)) {
    echo "✅ <b>¡Éxito!</b> La carpeta 'vendor' y todo su contenido ha sido eliminada.";
}
else {
    echo "❌ Error al intentar borrar la carpeta. Revisa los permisos.";
}
?>