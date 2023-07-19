export interface State {
    avatar: boolean;
    title: boolean;
    paragraph?: boolean | SkeletonParagraphProps;
}

export interface Props {
    active?:boolean;
    avatar?: boolean | SkeletonAvatarProps;
    loading?: boolean;
    paragraph?: boolean | SkeletonParagraphProps;
    title?: boolean | SkeletonTitleProps
}

export interface SkeletonAvatarProps {
    size?: 'large' | 'small' | 'default';
    shape: 'circle' | 'square';
}

export interface SkeletonParagraphProps {
    rows?: number;
    width: number | string | Array<number | string>;
}

export interface SkeletonTitleProps {
    width?: number | string;
}

export interface Computed {
    classes: () => string[] | void;
    rowList: () => number[];
}