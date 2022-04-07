export interface IPanelProps {
    children?: React.ReactNode,
    color: EPanelColor,
    panelId: string;
    nextPanelId?: string;
    keepFooter?: boolean;
    isLoading?: boolean;
}

export enum EPanelColor {
    L_GRAY,
    D_GRAY,
    BLACK,
}