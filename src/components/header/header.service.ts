import { useFetch } from "../../hooks/useFetch";
import { EGames, IGamerTagProps } from "../../shared-components/gamerTag/gamerTag.model";
import { IHeader, INavItem } from "./header.model";
import { IHeaderDTO } from "./header.service.model";

export const fetchHeaderData = () => {
    const { data, loading } = useFetch<IHeaderDTO>(`${process.env.REACT_APP_BASE_API_URL}/header.json`);
    return {
        data: data && convertHeaderFromDTO(data),
        loading: loading
    }
}

const convertHeaderFromDTO = (data: IHeaderDTO): IHeader => {

    const navItemList: INavItem[] = [];
    let gamerTagList: IGamerTagProps[] = [];

    data.navItems.forEach((navItem) => {
        if (navItem.popoverItems?.length) {
            gamerTagList = navItem.popoverItems.map(gamertag => ({
                ign: gamertag.ign,
                game: mapGameToEnum(gamertag.game)
            }));
        }
        navItemList.push({
            id: navItem.id,
            label: navItem.label,
            isGamertags: !!navItem.popoverItems,
            url: navItem.url
        });
    });

    return {
        navItemList: navItemList,
        gamerTagList: gamerTagList
    }
}

const mapGameToEnum = (game: string): EGames => {
    switch (game) {
        case 'VALO':
            return EGames.VALO;
        case 'LOL':
            return EGames.LOL
        case 'SUPER_PPL':
            return EGames.SUPER_PPL;
    }
    return EGames.VALO;
}