import type { ContentBlock } from "@app/modules/portfolio/entities/entities";
import { useModal } from "@app/modules/portfolio/hooks/useModal";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";

function pickText(language: "es" | "en", es: string, en?: string): string {
  return language === "en" && en ? en : es;
}

function ModalBlockButton({ title, text }: { title: string; text: string }) {
  const { modal } = useModal();
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor, isDarkMode } = getPortfolioState;

  return (
    <button
      type="button"
      onClick={() => modal.open(title, <p className={`p-5 ${textColor}`}>{text}</p>)}
      className={`px-5 py-2.5 text-sm uppercase tracking-widest border rounded-full transition-opacity hover:opacity-70 ${textColor} ${
        isDarkMode ? "border-white/20" : "border-black/20"
      }`}
    >
      {title}
    </button>
  );
}

function groupIntoRows(blocks: ContentBlock[]): ContentBlock[][] {
  const rows: ContentBlock[][] = [];
  for (const block of blocks) {
    if (block.sameRow && rows.length > 0) {
      rows[rows.length - 1].push(block);
    } else {
      rows.push([block]);
    }
  }
  return rows;
}

export default function ContentBlocksInterface({
  title,
  blocks
}: {
  title: string;
  blocks: ContentBlock[];
}) {
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor, isDarkMode, language } = getPortfolioState;

  function renderBlock(block: ContentBlock) {
    if (block.type === "modal") {
      return (
        <ModalBlockButton
          title={pickText(language, block.titleEs, block.titleEn)}
          text={pickText(language, block.textEs, block.textEn)}
        />
      );
    }
    if (block.type === "text") {
      return (
        <p className="text-center max-w-md opacity-70 leading-relaxed">
          {pickText(language, block.textEs, block.textEn)}
        </p>
      );
    }
    if (block.type === "titledText") {
      return (
        <div className="flex flex-col items-center gap-2 max-w-md">
          <h2 className="text-lg font-semibold text-center">
            {pickText(language, block.titleEs, block.titleEn)}
          </h2>
          <p className="text-center opacity-70 leading-relaxed">
            {pickText(language, block.textEs, block.textEn)}
          </p>
        </div>
      );
    }
    return (
      <img
        src={block.src}
        alt={block.alt}
        className={`w-full rounded-lg border ${isDarkMode ? "border-white/10" : "border-black/10"}`}
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center w-screen min-h-screen gap-8 px-6 py-[12vh] ${textColor}`}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center">{title}</h1>

      <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
        {groupIntoRows(blocks).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={
              row.length > 1
                ? "flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full justify-center"
                : "flex justify-center w-full"
            }
          >
            {row.map((block, blockIndex) => (
              <div
                key={blockIndex}
                className={row.length > 1 ? "flex-1 flex justify-center" : "flex justify-center"}
              >
                {renderBlock(block)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
