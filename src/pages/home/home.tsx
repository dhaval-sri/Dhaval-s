import { ContentTitle } from "../../components/sections/contentTitle/contentTitle";
import { Cover } from "../../components/sections/cover/cover";
import { CardsSection } from "../../components/sections/cards/cardsSection";
import { ICardsSectionProps } from "../../components/sections/cards/cardsSection.model";
import { Links } from "../../components/sections/links/links";
import { ILinksProps } from "../../components/sections/links/links.model";
import { OneColContent } from "../../components/sections/oneColContent/oneColContent";
import { IOneColContentProps } from "../../components/sections/oneColContent/oneColContent.model";
import { Timeline } from "../../components/sections/timeline/timeline";
import { ITimelineProps } from "../../components/sections/timeline/timeline.model";
import { TwoColContent } from "../../components/sections/twoColContent/twoColContent";
import { ITwoColContentProps } from "../../components/sections/twoColContent/twoColContent.model";
import Panel from "../../shared-components/panel/panel";
import { EPanelColor } from "../../shared-components/panel/panel.model";
import './home.css';
import { getHomepageData } from "./homepage.service";
import { IPanel, titleAllowedTypes } from "./homepage.model";
import { ESectionType } from "../../components/sections/sections.model";

export function Home() {
    const { data, loading } = getHomepageData();

    function getContentTitle(panel: IPanel): string | undefined {
        return titleAllowedTypes.includes(panel.type) ? panel.panelName : undefined;
    }

    function hasTwoCol(panelType: ESectionType): boolean {
        return panelType == ESectionType.NO_TITLE_WITH_TWO_COL || panelType == ESectionType.TITLE_WITH_TWO_COL;
    }

    function getContentForPanel(type:ESectionType, props?: IPanel['data']) {
        if (type == ESectionType.TIMELINE) {
            return <Timeline timelineItem={props as ITimelineProps[]} />
        } else if (type == ESectionType.CARDS) {
            return (
                <CardsSection {...props as ICardsSectionProps}></CardsSection>
            )
        } else if (type == ESectionType.LINKS) {
            return (
                <Links {...props as ILinksProps}></Links>
            )
        } else if (hasTwoCol(type)) {
            return (<TwoColContent {...props as ITwoColContentProps}></TwoColContent>)
        } else {
            return <OneColContent {...props as IOneColContentProps}></OneColContent>
        }
    }

    return (
        <>
            <Cover nextPanelId={data?.panels[0].id} isLoading={loading}></Cover>
            {
                data?.panels.map((panel, index, arr) =>
                (panel.data ?
                    <Panel key={panel.id} color={index % 2 == 0 ? EPanelColor.L_GRAY : EPanelColor.D_GRAY}
                        panelId={panel.id} nextPanelId={index != arr.length - 1 ? arr[index + 1].id : undefined}>
                        {<ContentTitle title={getContentTitle(panel)}
                            hasTwoCol={hasTwoCol(panel.type)}>
                            {getContentForPanel(panel.type, panel.data)}
                        </ContentTitle>}
                    </Panel> :
                    <></>)
                )
            }
        </>
    )
}