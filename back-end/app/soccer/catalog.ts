export type SoccerPlayer = {
    id: number;
    name: string;
    tier: number;
    file: string;
    url: string;
};

const PLAYERS: Omit<SoccerPlayer, "url">[] = [
    { id: 1, name: "Ali Daei", tier: 100, file: "AV1.png" },
    { id: 2, name: "Cristiano Ronaldo", tier: 100, file: "AV2.png" },
    { id: 3, name: "David Beckham", tier: 100, file: "AV3.png" },
    { id: 4, name: "Diego Maradona", tier: 100, file: "AV4.png" },
    { id: 5, name: "Francesco Totti", tier: 100, file: "AV5.png" },
    { id: 6, name: "Lionel Messi", tier: 100, file: "AV6.png" },
    { id: 7, name: "Pelé", tier: 100, file: "AV7.png" },
    { id: 8, name: "Ronaldinho", tier: 100, file: "AV8.png" },
    { id: 9, name: "Ronaldo Nazário", tier: 100, file: "AV9.png" },
    { id: 10, name: "Zinedine Zidane", tier: 100, file: "AV10.png" },
    { id: 11, name: "Alessandro Del Piero", tier: 75, file: "AV11.png" },
    { id: 12, name: "Ali Karimi", tier: 75, file: "AV12.png" },
    { id: 13, name: "Andrés Iniesta", tier: 75, file: "AV13.png" },
    { id: 14, name: "Arjen Robben", tier: 75, file: "AV14.png" },
    { id: 15, name: "Farhad Majidi", tier: 75, file: "AV15.png" },
    { id: 16, name: "Paolo Maldini", tier: 75, file: "AV16.png" },
    { id: 17, name: "Thierry Henry", tier: 75, file: "AV17.png" },
    { id: 18, name: "Wayne Rooney", tier: 75, file: "AV18.png" },
    { id: 19, name: "Xavi Hernández", tier: 75, file: "AV19.png" },
    { id: 20, name: "Zlatan Ibrahimović", tier: 75, file: "AV20.png" },
    { id: 21, name: "Erling Haaland", tier: 50, file: "AV21.png" },
    { id: 22, name: "Harry Kane", tier: 50, file: "AV22.png" },
    { id: 23, name: "Karim Benzema", tier: 50, file: "AV23.png" },
    { id: 24, name: "Kylian Mbappé", tier: 50, file: "AV24.png" },
    { id: 25, name: "Lamine Yamal", tier: 50, file: "AV25.png" },
    { id: 26, name: "Neymar", tier: 50, file: "AV26.png" },
    { id: 27, name: "Ousmane Dembélé", tier: 50, file: "AV27.png" },
    { id: 28, name: "Rafael Leão", tier: 50, file: "AV28.png" },
    { id: 29, name: "Robert Lewandowski", tier: 50, file: "AV29.png" },
    { id: 30, name: "Thomas Müller", tier: 50, file: "AV30.png" },
    { id: 31, name: "Bruno Fernandes", tier: 35, file: "AV31.png" },
    { id: 32, name: "Declan Rice", tier: 35, file: "AV32.png" },
    { id: 33, name: "Jude Bellingham", tier: 35, file: "AV33.png" },
    { id: 34, name: "Julián Álvarez", tier: 35, file: "AV34.png" },
    { id: 35, name: "Kevin De Bruyne", tier: 35, file: "AV35.png" },
    { id: 36, name: "Mohamed Salah", tier: 35, file: "AV36.png" },
    { id: 37, name: "Pedri", tier: 35, file: "AV37.png" },
    { id: 38, name: "Raphinha", tier: 35, file: "AV38.png" },
    { id: 39, name: "Rodri", tier: 35, file: "AV39.png" },
    { id: 40, name: "Vinícius Júnior", tier: 35, file: "AV40.png" },
    { id: 41, name: "Achraf Hakimi", tier: 20, file: "AV41.png" },
    { id: 42, name: "Trent Alexander-Arnold", tier: 20, file: "AV42.png" },
    { id: 43, name: "Gavi", tier: 20, file: "AV43.png" },
    { id: 44, name: "Jasir Asani", tier: 20, file: "AV44.png" },
    { id: 45, name: "Lautaro Martínez", tier: 20, file: "AV45.png" },
    { id: 46, name: "Manuel Neuer", tier: 20, file: "AV46.png" },
    { id: 47, name: "Mehdi Ghayedi", tier: 20, file: "AV47.png" },
    { id: 48, name: "Mehdi Taremi", tier: 20, file: "AV48.png" },
    { id: 49, name: "Oston Urunov", tier: 20, file: "AV49.png" },
    { id: 50, name: "Virgil van Dijk", tier: 20, file: "AV50.png" },
];

export function listSoccerPlayers(): SoccerPlayer[] {
    return PLAYERS.map((player) => ({
        ...player,
        url: `/public/soccer/${player.id}`,
    }));
}

export function getSoccerPlayerById(id: number): SoccerPlayer | undefined {
    return listSoccerPlayers().find((player) => player.id === id);
}

export function getSoccerRange(): { startIndex: number; endIndex: number } {
    return {
        startIndex: PLAYERS[0]?.id ?? 1,
        endIndex: PLAYERS[PLAYERS.length - 1]?.id ?? 0,
    };
}
