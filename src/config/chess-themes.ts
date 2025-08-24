export type PieceCode = 'wK' | 'wQ' | 'wR' | 'wB' | 'wN' | 'wP' | 'bK' | 'bQ' | 'bR' | 'bB' | 'bN' | 'bP';

export type Theme = {
  id: string;
  name: string;
  board: {
    light: string; // HSL string, e.g. "49 53% 86%"
    dark: string;  // HSL string
  };
  background: string; // HSL string
  piece: {
    filter?: string; // CSS filter to subtly tint pieces per theme
    dropShadow?: string; // optional CSS filter drop shadow
  };
};

export const THEMES: Theme[] = [
  {
    id: 'classic-green',
    name: 'Classic Green',
    board: {
      light: '49 53% 86%', // ~#EEEED2
      dark: '96 26% 46%', // ~#769656
    },
    background: '60 9% 98%',
    piece: {
      filter: 'none',
      dropShadow: 'drop-shadow(0 1px 0 hsl(0 0% 0% / 0.25))',
    },
  },
  {
    id: 'blue-ice',
    name: 'Blue Ice',
    board: {
      light: '205 56% 88%',
      dark: '207 40% 45%',
    },
    background: '210 40% 98%',
    piece: {
      filter: 'hue-rotate(185deg) saturate(1.05)',
      dropShadow: 'drop-shadow(0 1px 0 hsl(207 40% 20% / 0.25))',
    },
  },
  {
    id: 'brown-wood',
    name: 'Brown Wood',
    board: {
      light: '34 58% 80%',
      dark: '28 35% 40%',
    },
    background: '30 30% 96%',
    piece: {
      filter: 'sepia(0.3) saturate(1.1)',
      dropShadow: 'drop-shadow(0 1px 0 hsl(28 35% 20% / 0.3))',
    },
  },
  {
    id: 'dark-slate',
    name: 'Dark Slate',
    board: {
      light: '210 14% 30%',
      dark: '210 14% 18%',
    },
    background: '222 24% 10%',
    piece: {
      filter: 'contrast(1.05)',
      dropShadow: 'drop-shadow(0 1px 0 hsl(210 14% 5% / 0.5))',
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    board: {
      light: '22 85% 85%',
      dark: '18 70% 45%',
    },
    background: '18 40% 96%',
    piece: {
      filter: 'hue-rotate(15deg) saturate(1.1)',
      dropShadow: 'drop-shadow(0 1px 0 hsl(18 70% 25% / 0.3))',
    },
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    board: {
      light: '265 35% 82%',
      dark: '262 35% 40%',
    },
    background: '260 40% 96%',
    piece: {
      filter: 'hue-rotate(285deg) saturate(1.05)',
      dropShadow: 'drop-shadow(0 1px 0 hsl(262 35% 25% / 0.3))',
    },
  },
  {
    id: 'minimal-white',
    name: 'Minimal White',
    board: {
      light: '0 0% 98%',
      dark: '0 0% 88%',
    },
    background: '0 0% 100%',
    piece: {
      filter: 'grayscale(0.1) contrast(1.05)',
      dropShadow: 'drop-shadow(0 1px 0 hsl(0 0% 0% / 0.15))',
    },
  },
];

export const DEFAULT_THEME_ID = 'classic-green';
