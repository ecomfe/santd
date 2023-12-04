export interface Props {

};

export interface State {
    iconMap: {
        success: string;
        info: string;
        error: string;
        warning: string;
    };
    closing: boolean;
};

export interface Computed {
    classes: () => string[];
};