export type TTarget = {

}

export type TTheme = 'filled' | 'outlined' | 'twoTone' | 'outlined';

export interface DoubleColorIcon {
    primaryColor: string;
    secondaryColor?: string;
}

export interface CustomIconOption {
    scriptUrl?: string;
    extraCommonProps?: {
        [key: string]: any;
    }
}

interface BaseIconProps {
    theme: TTheme;
    spin: boolean;
    rotate: number;
    type: string;
    twoToneColor: string;
    viewBox?: string;
}

// InternalIcon
export interface InternalIconProps extends Partial<BaseIconProps> {
    primaryColor?: string;
    bodyStyle?: string;
    secondaryColor?: string;
}

export interface InternalIconState {

}

export interface InternalIconComputed {
    target: () => any;
}

// Icon
export interface IconPrivateProps {
    tabIndex?: number;
}

export interface IconProps extends Partial<BaseIconProps>, IconPrivateProps {
    loading?: boolean;
    style?: string;
    component?: san.SlotNode;
}

export interface InnerSvgProps {
    class: string;
    style: {
        msTransform: string;
        transform: string;
    } | undefined;
    viewBox: string | undefined;
    width: string;
    height: string;
    fill: string;
    "aria-hidden": string;
    focusable: string;
    computedType?: string;
}
export interface IconComputed {
    classes: () => string[];
    innerSvgProps: () => InnerSvgProps;
}




