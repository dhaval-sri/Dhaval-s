import './panel.css';
import { ReactComponent as Arrow } from './../../assets/circular_down.svg';
import { EPanelColor, IPanelProps } from './panel.model';
import { logUserEvent } from '../../services/analytics.service';

const Panel = ({ color, children, panelId, nextPanelId, keepFooter, isLoading }: IPanelProps) => {

    return (<div id={panelId} className={`Panel-container ${mapClassToColor(color)}`}>
        <div className={`Panel-content ${!(keepFooter || nextPanelId) ? 'Panel-content--fullHeight' : ''}`}>
            {children}
        </div>
        {(keepFooter || nextPanelId) && <div className="Panel-footer">
            {isLoading &&
                <div className='Panel__loader'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            {nextPanelId && <Arrow className="Panel__arrow" onClick={() => scrollToNextSection(panelId, nextPanelId)} />}
        </div>}
    </div>)
};

const scrollToNextSection = (currentPanelId: string, nextPanelId: string) => {
    document.getElementById(nextPanelId)?.scrollIntoView();
    logUserEvent({
        content_type: 'Auto Scroll button',
        content_id: currentPanelId,
    })
}

function mapClassToColor(_color: EPanelColor): string {
    switch (_color) {
        case EPanelColor.L_GRAY:
            return 'Panel-container--lgray';
        case EPanelColor.D_GRAY:
            return 'Panel-container--dgray';
        default:
            return '';
    }
}

export default Panel;