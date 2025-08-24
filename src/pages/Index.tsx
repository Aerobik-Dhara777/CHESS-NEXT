import { useMemo, useState } from "react";
import ChessBoard from "@/components/ChessBoard";
import { THEMES, DEFAULT_THEME_ID, Theme } from "@/config/chess-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [themeId, setThemeId] = useState<string>(DEFAULT_THEME_ID);
  const theme: Theme = useMemo(() => THEMES.find(t => t.id === themeId) || THEMES[0], [themeId]);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: `hsl(${theme.background})` }}>
      <header className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Responsive Chessboard UI</h1>
        <nav aria-label="Theme selector" className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Theme</span>
          <Select value={themeId} onValueChange={setThemeId}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent align="end">
              {THEMES.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </nav>
      </header>

      <main className="w-full max-w-6xl mx-auto px-6 pb-10">
        <section className="w-full flex items-center justify-center">
          <ChessBoard theme={theme} />
        </section>
      </main>
    </div>
  );
};

export default Index;
