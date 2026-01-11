import chroma from 'chroma-js';

export function getTextColor(color: string): '#FFFFFF' | '#000000' {
  return chroma(color).luminance() < 0.5 ? '#FFFFFF' : '#000000';
}
