import { IGamerTagProps } from "../../shared-components/gamerTag/gamerTag.model";

export interface INavItem {
    id?: string;
    label: string;
    url?: string;
    isGamertags?: boolean;
}

export interface IHeader {
    navItemList: INavItem[];
    gamerTagList: IGamerTagProps[];
}