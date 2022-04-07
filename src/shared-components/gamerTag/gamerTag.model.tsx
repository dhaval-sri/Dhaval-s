export enum EGames {
    VALO,
    SUPER_PPL,
    LOL
}

export interface IGamerTagProps {
    ign: string;
    game?: EGames | null;
}