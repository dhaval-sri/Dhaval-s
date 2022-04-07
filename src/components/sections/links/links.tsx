import { logUserEvent } from "../../../services/analytics.service"
import { ILinksProps } from "./links.model"
import MediaBtn from "./media-button/mediaBtn";
import "./links.css";

export const Links = ({ title, mediaBtnList }: ILinksProps) => {

    const email = 'dhavalsrivastava7@gmail.com'

    function logAnalytics() {
        logUserEvent({
            content_type: 'Social link',
            content_id: email
        });
    }

    return <div className="Links-container">
        <div className="Links-title">{title}</div>
        <a href={`mailto:${email}`} onClick={() => logAnalytics()} className="DuskBtn--outline Home__email btn"
            role="button" type="button">
            {email}
        </a>
        <div className="Links-mediaBtn-row">
            {mediaBtnList.map(btn => <MediaBtn key={btn.url} {...btn} />)}
        </div>
    </div>
}