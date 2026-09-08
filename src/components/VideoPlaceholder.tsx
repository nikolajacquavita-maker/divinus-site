import type { FeelingStage } from "@/lib/types";

const STAGE_IMAGES: Record<FeelingStage, string> = {
  corpo: "/images/sentimentos/corpo.jpg",
  mente: "/images/sentimentos/mente.jpg",
  espirito: "/images/sentimentos/espirito.jpg",
  acao: "/images/sentimentos/acao.jpg",
};

const DIRECT_VIDEO = /\.(mp4|webm|ogg)(\?.*)?$/i;

export function VideoPlaceholder({
  stage,
  videoUrl,
}: {
  stage: FeelingStage;
  videoUrl?: string | null;
}) {
  if (videoUrl && DIRECT_VIDEO.test(videoUrl)) {
    return (
      <div className="aspect-video w-full overflow-hidden border border-border bg-card">
        <video src={videoUrl} controls className="h-full w-full object-cover" />
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden border border-border bg-card">
        <iframe
          src={videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-border bg-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={STAGE_IMAGES[stage]} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-deep/55">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-deep-foreground/60 text-lg text-deep-foreground">
          ▶
        </span>
        <span className="text-xs label-caps text-deep-foreground">Vídeo em breve</span>
      </div>
    </div>
  );
}
