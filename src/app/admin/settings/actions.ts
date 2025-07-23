
'use server';

import { promises as fs } from 'fs';
import path from 'path';

export async function updateTheme(primaryColor: string, accentColor: string) {
  const filePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
  try {
    let cssContent = await fs.readFile(filePath, 'utf-8');

    // Helper to convert hex to HSL string
    const hexToHsl = (hex: string) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
      }
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return `${(h * 360).toFixed(0)} ${(s * 100).toFixed(0)}% ${(l * 100).toFixed(0)}%`;
    };

    const primaryHsl = hexToHsl(primaryColor);
    const accentHsl = hexToHsl(accentColor);
    
    // Light theme
    cssContent = cssContent.replace(/--primary: [^;]+;/, `--primary: ${primaryHsl};`);
    cssContent = cssContent.replace(/--accent: [^;]+;/, `--accent: ${accentHsl};`);
    cssContent = cssContent.replace(/--ring: [^;]+;/, `--ring: ${primaryHsl};`);

    // Dark theme (adjust lightness for better visibility)
    const primaryHslDark = primaryHsl.replace(/(\d+)%$/, l => `${Math.min(100, parseInt(l) + 10)}%`);
    const accentHslDark = accentHsl.replace(/(\d+)%$/, l => `${Math.min(100, parseInt(l) + 10)}%`);
    
    cssContent = cssContent.replace(/--primary: [^;]+;\n\s+--primary-foreground: [^;]+;\n\s+--secondary/, `--primary: ${primaryHslDark};\n    --primary-foreground: 210 40% 98%;\n    --secondary`);
    cssContent = cssContent.replace(/--accent: [^;]+;\n\s+--accent-foreground: [^;]+;\n\s+--destructive/, `--accent: ${accentHslDark};\n    --accent-foreground: 222.2 47.4% 11.2%;\n    --destructive`);
    cssContent = cssContent.replace(/--ring: [^;]+;\n\n\s+--chart-1/, `--ring: ${primaryHslDark};\n\n    --chart-1`);

    await fs.writeFile(filePath, cssContent, 'utf-8');
    
    return { success: true, message: 'Theme updated successfully!' };
  } catch (error) {
    console.error('Failed to update theme:', error);
    return { success: false, message: 'Failed to update theme.' };
  }
}
