import { ICardsSectionProps } from "../../components/sections/cards/cardsSection.model";
import { ILinksProps } from "../../components/sections/links/links.model";
import { IOneColContentProps } from "../../components/sections/oneColContent/oneColContent.model";
import { ESectionType } from "../../components/sections/sections.model";
import { ITimelineCardInfo } from "../../components/sections/timeline/timeline-card/timelineCard";
import { ITimelineProps } from "../../components/sections/timeline/timeline.model";
import { ITwoColContentProps } from "../../components/sections/twoColContent/twoColContent.model";

export interface IHomepageDTO {
    panels: PanelDTO[];
}

export interface PanelDTO {
    data: TimelineDataDTO[] | TwoColDataDTO | OneColDataDTO | ILinksDataDTO | IMediaCardsDataDTO[];
    id: string;
    panelName: string;
    type: string;
}
/* eslint-disable  @typescript-eslint/no-empty-interface */
export interface TwoColDataDTO extends ITwoColContentProps {
}

export interface OneColDataDTO extends IOneColContentProps {
}

export interface IMediaCardsDataDTO {
    title: string;
    image: string;
    description: string;
    url?: string;
    buttonText?: string;
}

export interface ILinksDataDTO {
    title: string;
    mediaBtnList: ILinksMediaBtnDTO[];
}

export interface ILinksMediaBtnDTO {
    type: string;
    url: string;
    color?: string;
    icon?: string;
}

export interface TimelineDataDTO {
    games: GameDTO[];
    year: number;
}

export interface GameDTO {
    description: string;
    infoList: InfoListDTO[];
    skillsList: string[];
    title: string;
}

export interface InfoListDTO {
    icon: IconDTO;
    label: string;
}

export interface IconDTO {
    name: string;
    prefix: string;
}

export interface IHomepage {
    panels: IPanel[];
}

export interface IPanel {
    panelName: string;
    id: string;
    type: ESectionType;
    data?: ITimelineProps[] | ITwoColContentProps | IOneColContentProps | ILinksProps | ICardsSectionProps;
}

export interface IGame {
    title: string;
    infoList: ITimelineCardInfo[];
    description: string;
    skillsList: string[];
}

export const titleAllowedTypes = [
    ESectionType.TITLE_WITH_ONE_COL,
    ESectionType.TITLE_WITH_TWO_COL,
    ESectionType.TIMELINE,
    ESectionType.CARDS
];
