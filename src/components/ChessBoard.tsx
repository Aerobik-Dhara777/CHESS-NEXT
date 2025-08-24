import { useMemo, useState } from "react";
import { Theme, PieceCode } from "@/config/chess-themes";

import wK from "@/assets/pieces/cburnett/wK.svg";
import wQ from "@/assets/pieces/cburnett/wQ.svg";
import wR from "@/assets/pieces/cburnett/wR.svg";
import wB from "@/assets/pieces/cburnett/wB.svg";
import wN from "@/assets/pieces/cburnett/wN.svg";
import wP from "@/assets/pieces/cburnett/wP.svg";
import bK from "@/assets/pieces/cburnett/bK.svg";
import bQ from "@/assets/pieces/cburnett/bQ.svg";
import bR from "@/assets/pieces/cburnett/bR.svg";
import bB from "@/assets/pieces/cburnett/bB.svg";
import bN from "@/assets/pieces/cburnett/bN.svg";
import bP from "@/assets/pieces/cburnett/bP.svg";

const PIECE_SPRITES: Record<PieceCode, string> = {
  wK, wQ, wR, wB, wN, wP, bK, bQ, bR, bB, bN, bP,
};

function createStartingPosition() {
  // 8x8 board with standard initial setup
  const empty: (PieceCode | null)[][] = Array.from({ length: 8 }, () => Array(8).fill(null));
  const backRank: PieceCode[] = ["wR","wN","wB","wQ","wK","wB","wN","wR"] as PieceCode[];
  empty[7] = backRank; // White back rank (row 8)
  empty[6] = Array(8).fill("wP") as PieceCode[];
  empty[1] = Array(8).fill("bP") as PieceCode[];
  const blackBack: PieceCode[] = ["bR","bN","bB","bQ","bK","bB","bN","bR"] as PieceCode[];
  empty[0] = blackBack; // Black back rank (row 1)
  return empty;
}

type ChessBoardProps = {
  theme: Theme;
};

export default function ChessBoard({ theme }: ChessBoardProps) {
  const [board, setBoard] = useState<(PieceCode | null)[][]>(() => createStartingPosition());
  const [dragFrom, setDragFrom] = useState<{ r: number; c: number } | null>(null);

  const boardVars = useMemo(() => ({
    light: `hsl(${theme.board.light})`,
    dark: `hsl(${theme.board.dark})`,
  }), [theme]);

  const onDragStart = (r: number, c: number) => () => {
    if (!board[r][c]) return;
    setDragFrom({ r, c });
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const onDrop = (r: number, c: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragFrom) return;
    const from = dragFrom;
    if (from.r === r && from.c === c) return setDragFrom(null);

    setBoard((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = prev[from.r][from.c];
      next[from.r][from.c] = null;
      return next;
    });
    setDragFrom(null);
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center transition-colors duration-300 ease-out"
      style={{ backgroundColor: `hsl(${theme.background})` }}
    >
      <div
        className="aspect-square w-full max-w-[min(90vmin,720px)] rounded-lg shadow-sm border"
        role="grid"
        aria-label={`${theme.name} chessboard`}
      >
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {Array.from({ length: 8 }).map((_, rIdx) =>
            Array.from({ length: 8 }).map((_, cIdx) => {
              const isLight = (rIdx + cIdx) % 2 === 0;
              const piece = board[rIdx][cIdx];
              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  role="gridcell"
                  onDragOver={onDragOver}
                  onDrop={onDrop(rIdx, cIdx)}
                  className="relative select-none transition-colors duration-300 ease-out"
                  style={{
                    backgroundColor: isLight ? boardVars.light : boardVars.dark,
                  }}
                >
                  {piece && (
                    <img
                      src={PIECE_SPRITES[piece]}
                      alt={`Piece ${piece}`}
                      draggable
                      onDragStart={onDragStart(rIdx, cIdx)}
                      className="w-[85%] h-[85%] object-contain mx-auto my-auto cursor-grab active:cursor-grabbing transition-transform duration-300 ease-out hover:scale-105"
                      style={{
                        filter: `${theme.piece.dropShadow ?? ''} ${theme.piece.filter ?? ''}`.trim(),
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
