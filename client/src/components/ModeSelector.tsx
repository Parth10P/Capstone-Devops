import { useApp, type UIMode } from "@/contexts/AppContext";
import { Eye, Hand, Zap } from "lucide-react";

const modes: { key: UIMode; icon: React.ReactNode; emoji: string }[] = [
  { key: "simple", icon: <Hand className="w-6 h-6" />, emoji: "👆" },
  { key: "visual", icon: <Eye className="w-6 h-6" />, emoji: "👁️" },
  { key: "pro", icon: <Zap className="w-6 h-6" />, emoji: "⚡" },
];

const ModeSelector = () => {
  const { mode, setMode, t } = useApp();

  return (
    <section className="container mx-auto px-4 py-10" aria-label={t("modes")}>
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2">{t("modes")}</h2>
      <p className="text-center text-muted-foreground text-sm mb-8">
        {mode === "simple" ? "Currently: Simple Mode 👆" : mode === "visual" ? "Currently: Visual Mode 👁️" : "Currently: Pro Mode ⚡"}
      </p>

      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg mx-auto">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`bazaar-card flex flex-col items-center gap-2 p-5 md:p-6 transition-all duration-200 ${
              mode === m.key
                ? "ring-2 ring-primary border-primary bg-primary/5"
                : "hover:border-primary/20"
            }`}
            aria-pressed={mode === m.key}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="font-semibold text-sm">{t(m.key)}</span>
            <span className="text-xs text-muted-foreground text-center leading-tight">
              {t(`${m.key}Desc`)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ModeSelector;
