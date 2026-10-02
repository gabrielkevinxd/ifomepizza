import Image from "next/image";
import type { Imagem } from "@/lib/media";

/** Imagem do manifest; se faltar, mostra um bloco tipográfico em vez de quebrar. */
export default function Foto({ img, legenda, sizes, className = "" }: { img?: Imagem; legenda: string; sizes: string; className?: string }) {
  if (!img) {
    return (
      <div className={`foto foto--vazia ${className}`} role="img" aria-label={legenda}>
        <span>{legenda}</span>
      </div>
    );
  }
  return (
    <div className={`foto ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} />
    </div>
  );
}
