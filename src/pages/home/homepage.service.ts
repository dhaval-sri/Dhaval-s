import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { EMediaBtnType, IMediaBtnProps } from "../../components/sections/links/media-button/mediaBtn.model";
import { ESectionType } from "../../components/sections/sections.model";
import { ITimelineCardInfo } from "../../components/sections/timeline/timeline-card/timelineCard";
import { ITimelineProps } from "../../components/sections/timeline/timeline.model";
import { useFetch } from "../../hooks/useFetch";
import { IMediaCardProps } from "../../shared-components/mediaCard/mediaCard.model";
import { IGame, IHomepage, IHomepageDTO, IPanel, TimelineDataDTO, PanelDTO, TwoColDataDTO, ILinksDataDTO, ILinksMediaBtnDTO, IMediaCardsDataDTO, OneColDataDTO } from "./homepage.model";


export function getHomepageData(): { data?: IHomepage, loading: boolean } {
    const { data, loading } = useFetch<IHomepageDTO>(`${process.env.REACT_APP_BASE_API_URL}/homepage.json`);
    return {
        data: data && convertHomepageFromDTO(data),
        loading: loading
    }
}

function convertHomepageFromDTO(data: IHomepageDTO): IHomepage {
    return {
        panels: data.panels.map(mapPanels)
    }
}

const mapPanels = (panel: PanelDTO): IPanel => {
    return {
        id: panel.id,
        panelName: panel.panelName,
        type: mapTypes(panel.type),
        data: convertPanelDataFromDTO(panel.data, mapTypes(panel.type))
    }
}

const convertPanelDataFromDTO = (panelData: PanelDTO['data'], type: ESectionType): IPanel['data'] | undefined => {
    // Checking for type
    switch (type) {
        case ESectionType.TIMELINE:
            return (panelData as TimelineDataDTO[]).map(convertTimelineDataFromDTO)
        case ESectionType.CARDS:
            return {
                mediaCardsList: (panelData as IMediaCardsDataDTO[]).map(convertGameCardsFromDTO)
            }
        case ESectionType.LINKS:
            panelData = panelData as ILinksDataDTO;
            return {
                title: panelData.title.replace('\\n','\n'),
                mediaBtnList: panelData.mediaBtnList.map(convertLinksDataFromDTO)
            }
        case ESectionType.NO_TITLE_WITH_ONE_COL:
        case ESectionType.TITLE_WITH_ONE_COL:
            panelData = panelData as TwoColDataDTO;
            return {
                description: panelData.description,
                image: panelData.image,
                alt: panelData.alt
            }
        case ESectionType.NO_TITLE_WITH_TWO_COL:
        case ESectionType.TITLE_WITH_TWO_COL:
            panelData = panelData as OneColDataDTO;
            return panelData
    }
}

const mapTypes = (type: string): ESectionType => {
    switch (type) {
        case 'TIMELINE':
            return ESectionType.TIMELINE;
        case 'CARDS':
            return ESectionType.CARDS;
        case 'LINKS':
            return ESectionType.LINKS;
        case 'NO_TITLE_WITH_ONE_COL':
            return ESectionType.NO_TITLE_WITH_ONE_COL;
        case 'NO_TITLE_WITH_TWO_COL':
            return ESectionType.NO_TITLE_WITH_TWO_COL;
        case 'TITLE_WITH_ONE_COL':
            return ESectionType.TITLE_WITH_ONE_COL;
        case 'TITLE_WITH_TWO_COL':
            return ESectionType.TITLE_WITH_TWO_COL;
        default:
            return ESectionType.NO_TITLE_WITH_ONE_COL;
    }
}

const convertTimelineDataFromDTO = (data: TimelineDataDTO): ITimelineProps => {
    return {
        year: data.year,
        games: data.games.map((game): IGame => ({
            description: game.description,
            infoList: game.infoList.map((infoItem): ITimelineCardInfo => ({
                icon: [infoItem.icon.prefix as IconPrefix, infoItem.icon.name as IconName],
                text: infoItem.label
            })),
            skillsList: game.skillsList,
            title: game.title
        }))
    }
}

const convertGameCardsFromDTO = (card: IMediaCardsDataDTO): IMediaCardProps => {
    return {
        title: card.title,
        description: card.description,
        alt: card.title,
        img: card.image,
        url: card.url,
        buttonText: card.buttonText
    }
}

const convertLinksDataFromDTO = (btn: ILinksMediaBtnDTO): IMediaBtnProps => {
    return {
        url: btn.url,
        type: mapMediaBtnType(btn.type),
        dynamicIcon: btn.icon,
        color: btn.color
    }
}

const mapMediaBtnType = (type: string): EMediaBtnType | undefined => {
    switch (type) {
        case 'TWITCH':
            return EMediaBtnType.TWITCH;
        case 'DISCORD':
            return EMediaBtnType.DISCORD;
        case 'INSTAGRAM':
            return EMediaBtnType.INSTAGRAM;
        case 'TWITTER':
            return EMediaBtnType.TWITTER;
        case 'YOUTUBE':
            return EMediaBtnType.YOUTUBE;
        case 'LINK':
            return EMediaBtnType.LINK;
    }
}