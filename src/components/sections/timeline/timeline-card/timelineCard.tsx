import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Collapse } from 'reactstrap';
import { IGame } from '../../../../pages/home/homepage.model';
import { logUserEvent } from '../../../../services/analytics.service';
import './timelineCard.css';

export interface ITimelineCardProps extends IGame {
    panelDirection: 'left' | 'right';
}

export interface ITimelineCardInfo {
    icon: [IconPrefix, IconName];
    text: string;
}

export function TimelineCard({ title, description, infoList, skillsList, panelDirection }: ITimelineCardProps) {

    const [isOpen, setOpenState] = useState(false);

    const toggleState = () => {
        isOpen ? logUserEvent({
            content_type: 'Timeline collapse',
            content_id: title,
        }) : logUserEvent({
            content_type: 'Timeline expand',
            content_id: title
        })
        setOpenState(wasOpen => !wasOpen);
    }

    return (
        <div className={`Timeline-card ${panelDirection == 'left' ? 'Timeline-card--left' : ''}`}
            onClick={() => toggleState()}>
            <div className="Timeline-card__heading text-center">{title}</div>
            <Collapse isOpen={isOpen} className="Timeline-card__collapse">
                <div className="Timeline-card__info">
                    {infoList.map((info, index) =>
                    (<span className="Timeline-card__info-item" key={index}>
                        <FontAwesomeIcon icon={info.icon} />&nbsp;&nbsp;&nbsp;{info.text}
                    </span>)
                    )}
                </div>
                <p className="Timeline-card__description">{description}</p>
                <ul className="Timeline-card__list">
                    {skillsList.map((item, index) =>
                        (<li className="Timeline-card__list-item" key={index}>{item}</li>)
                    )}
                </ul>
            </Collapse>
        </div>
    )
}