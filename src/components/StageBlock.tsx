import type { FeelingStage } from "@/lib/types";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";

export function StageBlock({
  index,
  label,
  stage,
  question,
  text,
  videoUrl,
  verse,
  children,
}: {
  index: string;
  label: string;
  stage: FeelingStage;
  question: string;
  text: string;
  videoUrl?: string | null;
  verse?: { text: string; reference: string };
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 border-t border-border py-12 sm:grid-cols-[100px_1fr] sm:py-16">
      <div>
        <p className="text-xs label-caps text-muted-foreground">{index}</p>
        <p className="font-display mt-1 text-xl">{label}</p>
      </div>
      <div>
        <p className="font-display text-2xl sm:text-3xl">{question}</p>
        <div className="mt-6">
          <VideoPlaceholder stage={stage} videoUrl={videoUrl} />
        </div>
        <p className="mt-6 whitespace-pre-line text-muted-foreground">{text}</p>

        {verse && (
          <blockquote className="mt-8 border-l-2 border-accent pl-6">
            <p className="font-display text-xl sm:text-2xl">«{verse.text}»</p>
            <footer className="mt-3 text-xs label-caps text-accent">{verse.reference}</footer>
          </blockquote>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
