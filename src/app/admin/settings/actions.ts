
'use server';

import { promises as fs } from 'fs';
import path from 'path';

// Helper to convert hex to an HSL string
const hexToHsl = (hex: string): [number, number, number] => {
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
  return [h * 360, s * 100, l * 100];
};

const hslToString = (hsl: [number, number, number]): string => {
  return `${hsl[0].toFixed(1)} ${hsl[1].toFixed(1)}% ${hsl[2].toFixed(1)}%`;
}

// Function to generate a full theme from base colors
const generateTheme = (primaryHex: string, accentHex: string, backgroundHex: string) => {
    const primaryHsl = hexToHsl(primaryHex);
    const accentHsl = hexToHsl(accentHex);
    const backgroundHsl = hexToHsl(backgroundHex);

    const [bgH, bgS, bgL] = backgroundHsl;

    // Determine if the background is light or dark
    const isLight = bgL > 50;

    // Dynamically set foreground and card foreground colors
    const foregroundHsl: [number, number, number] = [bgH, bgS, isLight ? 10 : 98];
    const cardHsl: [number, number, number] = [bgH, bgS, isLight ? Math.min(100, bgL + 2) : Math.max(0, bgL - 2)];
    
    // Light Theme Derivations
    const lightTheme = {
        '--background': hslToString(backgroundHsl),
        '--foreground': hslToString(foregroundHsl),
        '--card': hslToString(cardHsl),
        '--card-foreground': hslToString(foregroundHsl),
        '--popover': hslToString(cardHsl),
        '--popover-foreground': hslToString(foregroundHsl),
        '--primary': hslToString(primaryHsl),
        '--primary-foreground': hslToString([primaryHsl[0], primaryHsl[1], primaryHsl[2] > 40 ? 10 : 98]),
        '--secondary': hslToString([bgH, bgS, isLight ? 94.5 : 13.3]),
        '--secondary-foreground': hslToString([bgH, bgS, isLight ? 10 : 98]),
        '--muted': hslToString([bgH, bgS, isLight ? 94.5 : 13.3]),
        '--muted-foreground': hslToString([bgH, bgS, 45.5]),
        '--accent': hslToString(accentHsl),
        '--accent-foreground': hslToString([accentHsl[0], accentHsl[1], accentHsl[2] > 40 ? 10 : 98]),
        '--border': hslToString([bgH, bgS, isLight ? 89.8 : 19.4]),
        '--input': hslToString([bgH, bgS, isLight ? 89.8 : 19.4]),
        '--ring': hslToString(primaryHsl),
    };

    // Dark Theme Derivations
    const darkTheme = {
        '--background': hslToString([bgH, bgS, isLight ? 9.8 : Math.max(0, bgL - 2)]),
        '--foreground': hslToString(foregroundHsl),
        '--card': hslToString([bgH, bgS, isLight ? 9.8 : Math.max(0, bgL - 2)]),
        '--card-foreground': hslToString(foregroundHsl),
        '--popover': hslToString([bgH, bgS, isLight ? 9.8 : Math.max(0, bgL - 2)]),
        '--popover-foreground': hslToString(foregroundHsl),
        '--primary': hslToString([primaryHsl[0], primaryHsl[1], primaryHsl[2] + (isLight ? 0 : 10)]),
        '--primary-foreground': hslToString([primaryHsl[0], primaryHsl[1], primaryHsl[2] > 40 ? 10 : 98]),
        '--secondary': hslToString([bgH, bgS, isLight ? 17.5 : Math.max(0, bgL - 8)]),
        '--secondary-foreground': hslToString([bgH, bgS, isLight ? 10 : 98]),
        '--muted': hslToString([bgH, bgS, isLight ? 17.5 : Math.max(0, bgL - 8)]),
        '--muted-foreground': hslToString([bgH, bgS, 62.7]),
        '--accent': hslToString([accentHsl[0], accentHsl[1], accentHsl[2] + (isLight ? 0 : 10)]),
        '--accent-foreground': hslToString([accentHsl[0], accentHsl[1], accentHsl[2] > 40 ? 10 : 98]),
        '--border': hslToString([bgH, bgS, isLight ? 17.5 : Math.max(0, bgL - 10)]),
        '--input': hslToString([bgH, bgS, isLight ? 17.5 : Math.max(0, bgL - 10)]),
        '--ring': hslToString(primaryHsl),
    };

    return { lightTheme, darkTheme };
};


export async function updateTheme(primaryColor: string, accentColor: string, backgroundColor: string) {
  const filePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
  try {
    let cssContent = await fs.readFile(filePath, 'utf-8');
    const { lightTheme, darkTheme } = generateTheme(primaryColor, accentColor, backgroundColor);

    // Update light theme variables
    let lightThemeContent = '';
    for (const [prop, value] of Object.entries(lightTheme)) {
        lightThemeContent += `    ${prop}: ${value};\n`;
    }
    cssContent = cssContent.replace(
        /(?<=:root\s*\{)[\s\S]*?(?=\n\s*--radius)/,
        `\n${lightThemeContent.trim()}\n`
    );

    // Update dark theme variables
    let darkThemeContent = '';
    for (const [prop, value] of Object.entries(darkTheme)) {
        darkThemeContent += `    ${prop}: ${value};\n`;
    }
     cssContent = cssContent.replace(
        /(?<=\.dark\s*\{)[\s\S]*?(?=\n\s*--chart-1)/,
        `\n${darkThemeContent.trim()}\n`
    );


    await fs.writeFile(filePath, cssContent, 'utf-8');
    
    return { success: true, message: 'Theme updated successfully!' };
  } catch (error) {
    console.error('Failed to update theme:', error);
    return { success: false, message: 'Failed to update theme.' };
  }
}
