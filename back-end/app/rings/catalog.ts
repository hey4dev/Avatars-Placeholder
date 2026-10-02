import * as path from "path";
import * as fs from "fs";

export type RingDefinition = {
    id: number;
    slug: string;
    name: string;
    file: string;
};

const RINGS_DIR = path.join(process.cwd(), "images", "rings");

export const RINGS: RingDefinition[] = [
    { id: 1, slug: "bronze", name: "Bronze Gear", file: "ring-1.png" },
    { id: 2, slug: "silver", name: "Silver Crystal", file: "ring-2.png" },
    { id: 3, slug: "gold", name: "Gold Wings", file: "ring-3.png" },
    { id: 4, slug: "fire", name: "Fire", file: "ring-4.png" },
    { id: 5, slug: "soccer", name: "Soccer Neon", file: "ring-5.png" },
    { id: 6, slug: "soccer-trail", name: "Soccer Trail", file: "ring-6.png" },
    { id: 7, slug: "energy", name: "Energy Orbit", file: "ring-7.png" },
    { id: 8, slug: "royal", name: "Royal Crown", file: "ring-8.png" },
];

export const listRings = (): Array<{ id: number; slug: string; name: string }> =>
    RINGS.map(({ id, slug, name }) => ({ id, slug, name }));

export const resolveRing = (query: unknown): RingDefinition | null => {
    if (query === undefined || query === null || query === "") {
        return null;
    }
    const value = String(query).trim().toLowerCase();
    if (!value) {
        return null;
    }
    const byId = RINGS.find((r) => String(r.id) === value);
    if (byId) {
        return byId;
    }
    const bySlug = RINGS.find((r) => r.slug === value);
    return bySlug || null;
};

export const getRingFilePath = (ring: RingDefinition): string => {
    return path.join(RINGS_DIR, ring.file);
};

export const ringFileExists = (ring: RingDefinition): boolean => {
    return fs.existsSync(getRingFilePath(ring));
};
