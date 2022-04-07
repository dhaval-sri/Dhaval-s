export interface IHeaderDTO {
    navItems: NavItem[];
}
export interface NavItem {
    id?: string;
    label: string;
    url?: string;
    popoverItems?: PopoverItem[];
}

export interface PopoverItem {
    game: string;
    ign: string;
}
