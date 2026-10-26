/**
 * Self-contained placeholder picture (SVG data URI), used by the demo profile so it does not depend on
 * image files being present. Same label + hue always give the same picture.
 */
export function placeholderImage(label: string, hue = 280, width = 800, height = 1000): string {
  const safeLabel = label.replace(/[<>&"']/g, '');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<defs>` +
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 55% 24%)"/><stop offset="1" stop-color="hsl(${(hue + 50) % 360} 60% 8%)"/></linearGradient>` +
    `<radialGradient id="r" cx="50%" cy="35%" r="60%"><stop offset="0" stop-color="hsl(${hue} 80% 70%)" stop-opacity=".35"/><stop offset="1" stop-opacity="0"/></radialGradient>` +
    `</defs>` +
    `<rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#r)"/>` +
    `<text x="50%" y="53%" text-anchor="middle" font-family="Georgia,serif" font-size="${Math.round(width * 0.12)}" fill="#fff" fill-opacity=".85">${safeLabel}</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
