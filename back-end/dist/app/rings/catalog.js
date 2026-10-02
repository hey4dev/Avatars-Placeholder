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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ringFileExists = exports.getRingFilePath = exports.resolveRing = exports.listRings = exports.RINGS = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const RINGS_DIR = path.join(process.cwd(), "images", "rings");
exports.RINGS = [
    { id: 1, slug: "bronze", name: "Bronze Gear", file: "ring-1.png" },
    { id: 2, slug: "silver", name: "Silver Crystal", file: "ring-2.png" },
    { id: 3, slug: "gold", name: "Gold Wings", file: "ring-3.png" },
    { id: 4, slug: "fire", name: "Fire", file: "ring-4.png" },
    { id: 5, slug: "soccer", name: "Soccer Neon", file: "ring-5.png" },
    { id: 6, slug: "soccer-trail", name: "Soccer Trail", file: "ring-6.png" },
    { id: 7, slug: "energy", name: "Energy Orbit", file: "ring-7.png" },
    { id: 8, slug: "royal", name: "Royal Crown", file: "ring-8.png" },
];
const listRings = () => exports.RINGS.map(({ id, slug, name }) => ({ id, slug, name }));
exports.listRings = listRings;
const resolveRing = (query) => {
    if (query === undefined || query === null || query === "") {
        return null;
    }
    const value = String(query).trim().toLowerCase();
    if (!value) {
        return null;
    }
    const byId = exports.RINGS.find((r) => String(r.id) === value);
    if (byId) {
        return byId;
    }
    const bySlug = exports.RINGS.find((r) => r.slug === value);
    return bySlug || null;
};
exports.resolveRing = resolveRing;
const getRingFilePath = (ring) => {
    return path.join(RINGS_DIR, ring.file);
};
exports.getRingFilePath = getRingFilePath;
const ringFileExists = (ring) => {
    return fs.existsSync((0, exports.getRingFilePath)(ring));
};
exports.ringFileExists = ringFileExists;
