"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRingToFile = exports.applyRing = exports.listRings = exports.resolveRing = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const catalog_1 = require("./catalog");
var catalog_2 = require("./catalog");
Object.defineProperty(exports, "resolveRing", { enumerable: true, get: function () { return catalog_2.resolveRing; } });
Object.defineProperty(exports, "listRings", { enumerable: true, get: function () { return catalog_2.listRings; } });
/** How much of the canvas the face fills (must sit inside the ring hole). */
const FACE_SCALE = 0.52;
/**
 * Circle-mask the avatar and composite a PNG ring overlay from images/rings.
 */
const applyRing = async (avatarBuffer, ring, targetSize) => {
    const ringPath = (0, catalog_1.getRingFilePath)(ring);
    const ringMeta = await (0, sharp_1.default)(ringPath).metadata();
    const ringNative = Math.max(ringMeta.width || 341, ringMeta.height || 341);
    const meta = await (0, sharp_1.default)(avatarBuffer).metadata();
    const width = meta.width || 256;
    const height = meta.height || 256;
    const size = targetSize && targetSize > 0
        ? targetSize
        : Math.max(width, height, ringNative);
    const faceSize = Math.round(size * FACE_SCALE);
    const offset = Math.round((size - faceSize) / 2);
    const circleSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${faceSize}" height="${faceSize}">
      <circle cx="${faceSize / 2}" cy="${faceSize / 2}" r="${faceSize / 2}" fill="#fff"/>
    </svg>`);
    const maskedFace = await (0, sharp_1.default)(avatarBuffer)
        .resize(faceSize, faceSize, { fit: "cover" })
        .composite([
        {
            input: circleSvg,
            blend: "dest-in",
        },
    ])
        .png()
        .toBuffer();
    const ringOverlay = await (0, sharp_1.default)(ringPath)
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha()
        .png()
        .toBuffer();
    return (0, sharp_1.default)({
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
exports.applyRing = applyRing;
const applyRingToFile = async (filePath, ring) => {
    // Match Express sendFile({ root: '.' }) — UPLOAD_DIR paths like "/images/..."
    // are project-relative, not filesystem-absolute (especially on Windows).
    const normalized = String(filePath).trim().replace(/^[\\/]+/, "");
    const absolute = path.resolve(process.cwd(), normalized);
    const avatarBuffer = await fs.promises.readFile(absolute);
    return (0, exports.applyRing)(avatarBuffer, ring);
};
exports.applyRingToFile = applyRingToFile;
