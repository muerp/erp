export interface NavItem {
    title: string
    path?: string
    icon?: string,
    children?: NavItem[]
    [key: string] :  any
}
