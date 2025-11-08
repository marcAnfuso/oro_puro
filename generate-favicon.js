const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const svgPath = path.join(__dirname, 'public', 'favicon.svg');
  const icoPath = path.join(__dirname, 'app', 'favicon.ico');

  try {
    // Generar PNG de 32x32 (tamaño estándar de favicon)
    const pngBuffer = await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toBuffer();

    // Para ICO, generamos PNG y lo guardamos como .ico
    // (Sharp no soporta ICO directamente, pero los navegadores modernos aceptan PNG como .ico)
    await sharp(pngBuffer)
      .toFile(icoPath);

    console.log('Favicon generado exitosamente en:', icoPath);

    // También generamos tamaños adicionales para diferentes dispositivos
    await sharp(svgPath).resize(16, 16).png().toFile(path.join(__dirname, 'public', 'favicon-16x16.png'));
    await sharp(svgPath).resize(32, 32).png().toFile(path.join(__dirname, 'public', 'favicon-32x32.png'));
    await sharp(svgPath).resize(180, 180).png().toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));

    console.log('Favicons adicionales generados en /public');
  } catch (error) {
    console.error('Error generando favicon:', error);
  }
}

generateFavicon();
