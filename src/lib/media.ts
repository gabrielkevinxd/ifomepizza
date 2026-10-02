import fs from "node:fs";
import path from "node:path";

export type HeroManifest = {
  frameDir: string;
  frameCount: number;
  ext: string;
  width: number;
  height: number;
  poster?: string;
  mobileFrameDir?: string;
  mobileFrameCount?: number;
};
export type Imagem = { src: string; alt: string };
export type Manifest = { hero: HeroManifest | null; images: Record<string, Imagem> };

const pub = path.join(process.cwd(), "public");
const existe = (url?: string) => !!url && fs.existsSync(path.join(pub, url.replace(/^\//, "")));

/** Lê public/media/manifest.json; devolve só o que existe em disco, para o site degradar com elegância. */
export function lerManifest(): Manifest {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(pub, "media", "manifest.json"), "utf8"));
    const h = raw.hero as HeroManifest | undefined;
    const primeiro = h ? `${h.frameDir}/${String(1).padStart(4, "0")}.${h.ext}` : undefined;
    const hero = h && h.frameCount > 0 && existe(primeiro) ? h : null;
    if (hero && hero.mobileFrameDir && !existe(`${hero.mobileFrameDir}/0001.${hero.ext}`)) {
      delete hero.mobileFrameDir;
      delete hero.mobileFrameCount;
    }
    if (hero && hero.poster && !existe(hero.poster)) delete hero.poster;
    const images: Record<string, Imagem> = {};
    for (const [k, v] of Object.entries((raw.images ?? {}) as Record<string, Imagem>)) if (existe(v?.src)) images[k] = v;
    if (hero?.poster) images["hero-poster"] ??= { src: hero.poster, alt: "iFome Pizzaria" };
    return { hero, images };
  } catch {
    return { hero: null, images: {} };
  }
}
