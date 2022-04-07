import Panel from '../../../shared-components/panel/panel';
import { EPanelColor } from '../../../shared-components/panel/panel.model';
import { ContentTitle } from '../contentTitle/contentTitle';
import { ICoverProps } from './cover.model';

export const Cover = ({nextPanelId, isLoading}: ICoverProps) => {
    return <Panel color={EPanelColor.BLACK} panelId="cover" nextPanelId={nextPanelId} isLoading={isLoading} keepFooter>
        <ContentTitle>
            <div className="Home__title">Dhaval Srivastava</div>
        </ContentTitle>
    </Panel>
}