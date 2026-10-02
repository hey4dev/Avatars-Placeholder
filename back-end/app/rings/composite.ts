import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { getRingFilePath, resolveRing, RingDefinition } from "./catalog";

export { resolveRing, listRings } from "./catalog";
export type { RingDefinition } from "./catalog";

/** How much of the canvas the face fills (must sit inside the ring hole). */
const FACE_SCALE = 0.52;

/**
 * Circle-mask the avatar and composite a PNG ring overlay from images/rings.
 */
export const applyRing = async (
    avatarBuffer: Buffer,
    ring: RingDefinition,
    targetSize?: number
): Promise<Buffer> => {
    const ringPath = getRingFilePath(ring);
    const ringMeta = await sharp(ringPath).metadata();
    const ringNative = Math.max(ringMeta.width || 341, ringMeta.height || 341);

    const meta = await sharp(avatarBuffer).metadata();
    const width = meta.width || 256;
    const height = meta.height || 256;
    const size =
        targetSize && targetSize > 0
            ? targetSize
            : Math.max(width, height, ringNative);

    const faceSize = Math.round(size * FACE_SCALE);
    const offset = Math.round((size - faceSize) / 2);

    const circleSvg = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${faceSize}" height="${faceSize}">
      <circle cx="${faceSize / 2}" cy="${faceSize / 2}" r="${faceSize / 2}" fill="#fff"/>
    </svg>`
    );

    const maskedFace = await sharp(avatarBuffer)
        .resize(faceSize, faceSize, { fit: "cover" })
        .composite([
            {
                input: circleSvg,
                blend: "dest-in",
            },
        ])
        .png()
        .toBuffer();

    const ringOverlay = await sharp(ringPath)
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha()
        .png()
        .toBuffer();

    return sharp({
        create: {
            width: size,
            height: size,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
    })
        .composite([
            { input: maskedFace, top: offset, left: offset },
            { input: ringOverlay, top: 0, left: 0 },
        ])
        .png()
        .toBuffer();
};

export const applyRingToFile = async (
    filePath: string,
    ring: RingDefinition
): Promise<Buffer> => {
    // Match Express sendFile({ root: '.' }) — UPLOAD_DIR paths like "/images/..."
    // are project-relative, not filesystem-absolute (especially on Windows).
    const normalized = String(filePath).trim().replace(/^[\\/]+/, "");
    const absolute = path.resolve(process.cwd(), normalized);
    const avatarBuffer = await fs.promises.readFile(absolute);
    return applyRing(avatarBuffer, ring);
};
