import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export enum EMediaBtnType {
    LINK,
    TWITCH,
    YOUTUBE,
    INSTAGRAM,
    DISCORD,
    TWITTER
}

export interface IMediaBtnProps {
    url: string;
    type?: EMediaBtnType;
    dynamicIcon?: string;
    color?: string;
}

export interface IMediaBtnObj extends IMediaBtnProps {
    classString?: string;
    icon: [IconPrefix, IconName];
}