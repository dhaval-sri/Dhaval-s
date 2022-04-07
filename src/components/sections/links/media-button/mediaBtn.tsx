import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import "./mediaBtn.css";
import { EMediaBtnType, IMediaBtnObj, IMediaBtnProps } from "./mediaBtn.model";
import { logUserEvent } from "../../../../services/analytics.service";

const MediaBtn = (props: IMediaBtnProps) => {
    if (!props.url) return (<></>);
    const typeObj: IMediaBtnObj = {
        ...props,
        ...mapTypeToIcon(props)
    }

    function logAnalytics() {
        logUserEvent({
            content_type: 'Social Icon',
            content_id: props.url
        })
    }

    return (
        <a href={typeObj.url} target="_blank" onClick={() => logAnalytics()} rel="noopener noreferrer">
            <span className="fa-layers MediaBtn fa-3x">
                {typeObj.type !== EMediaBtnType.INSTAGRAM ?
                    (typeObj.classString ? <FontAwesomeIcon className={`MediaBtn__Icon MediaBtn__Bg ${typeObj.classString}`}
                        icon="square" />
                        :
                        typeObj.color &&
                        <>
                            <style>
                                {`.MediaBtn:hover .MediaBtn__Icon--dynamic-${typeObj.icon[1]} {color: ${typeObj.color};}`}
                            </style>
                            <FontAwesomeIcon className={`MediaBtn__Icon MediaBtn__Bg MediaBtn__Icon--dynamic-${typeObj.icon[1]}`} icon="square"></FontAwesomeIcon>
                        </>
                    )
                    :
                    <svg className="MediaBtn__Icon MediaBtn__Bg MediaBtn__Icon--instaGr" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512" xlinkTitle="Instagram" aria-labelledby="intagram-title"
                        role="img">
                        <title id="intgaram-title">Instagram</title>
                        <radialGradient id="MediaBtn-InstaRg" r="150%" cx="30%" cy="107%">
                            <stop stopColor="#fdf497" offset="0" />
                            <stop stopColor="#fdf497" offset="0.05" />
                            <stop stopColor="#fd5949" offset="0.45" />
                            <stop stopColor="#d6249f" offset="0.6" />
                            <stop stopColor="#285AEB" offset="0.9" />
                        </radialGradient>
                        <path fill="currentColor" id="MediaBtn-InstaWhite"
                            d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z">
                        </path>
                        <path id="MediaBtn-InstaPath"
                            d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z">
                        </path>
                    </svg>
                }
                <FontAwesomeIcon className="MediaBtn__Icon MediaBtn__Brand"
                    icon={typeObj.icon} transform="shrink-8" />
            </span>
        </a>
    )
}


function mapTypeToIcon(props?: IMediaBtnProps): { icon: [IconPrefix, IconName], classString?: string } {
    if (props?.dynamicIcon) {
        return {
            icon: ['fab', props.dynamicIcon as IconName]
        }
    } else
        switch (props?.type) {
            case EMediaBtnType.TWITCH:
                return {
                    icon: ['fab', 'twitch'],
                    classString: 'MediaBtn__Icon--tw'
                };
            case EMediaBtnType.YOUTUBE:
                return {
                    icon: ['fab', 'youtube'],
                    classString: 'MediaBtn__Icon--yt'
                };
            case EMediaBtnType.DISCORD:
                return {
                    icon: ['fab', 'discord'],
                    classString: 'MediaBtn__Icon--dd'
                };
            case EMediaBtnType.INSTAGRAM:
                return {
                    icon: ['fab', 'instagram'],
                    classString: 'MediaBtn__Icon--insta'
                };
            case EMediaBtnType.TWITTER:
                return {
                    icon: ['fab', 'twitter'],
                    classString: 'MediaBtn__Icon--tweet'
                };
            default:
                return {
                    icon: ['fas', 'link'],
                    classString: 'MediaBtn__Icon--lnk'
                };
        }
}

export default MediaBtn;