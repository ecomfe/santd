export interface Route {
    path: String,
    breadcrumbName: String;
}

export interface Params {
    [key: string]: string;
}

// Breadcrumb BreadcrumbState 
export interface BreadcrumbState {
    separator: string;
    paths: string[];
    routes?: Route[];
}

// Breadcrumb BreadcrumbProps 
export interface BreadcrumbProps {
   routes: Route[];
   separator: string;
   params: Params;
   item: san.SlotNode;
}

// item ItemState 
export interface ItemState {
    separator: string;
}

//  item ItemProps
export interface ItemProps {
    href?: string;
    separator: string;
}