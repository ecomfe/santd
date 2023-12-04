
const BUTTON_TYPES = ['default', 'primary', 'ghost', 'dashed', 'danger', 'link'] as const;
type ButtonType = typeof BUTTON_TYPES[number];

const BUTTON_SHAPES = ['circle', 'circle-outline', 'round'] as const;
type ButtonShape = typeof BUTTON_SHAPES[number];

const BUTTON_HTMLTYPES = ['submit', 'button', 'reset'] as const;
export type ButtonHTMLType = typeof BUTTON_HTMLTYPES[number];

interface BaseButtonProps {
    type?: ButtonType;
    shape?: ButtonShape;
    size?: Exclude<SizeType, 'middle'>;
    disabled?: boolean;
    /**
     * 设置按钮载入状态
     */
    loading?: boolean | { delay?: number };
    /**
     * 幽灵属性，使按钮背景透明
     */
    ghost?: boolean;
    /**
     * 将按钮宽度调整为其父宽度的选项
     */
    block?: boolean;
    /**
     * 设置按钮的图标类型
     */
    icon?: string;
}

// 可能需要补充更多的 信息
type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: (event: HTMLAnchorElement) => void;
} & BaseButtonProps;

type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: (event: HTMLButtonElement) => void;
} & BaseButtonProps;

type SizeMap = {
    [key in SizeType]?: key extends 'large'
        ? 'lg'
        : key extends 'small'
            ? 'sm'
            : undefined
};


// Button
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

export interface ButtonState extends Required<Pick<ButtonProps, 'disabled' | 'loading' | 'size'>> {
    noWave: boolean;
    icons: null;
    sizeMap: SizeMap;
}

export interface ButtonComputed {
    classes: () => string[];
}

// ButtonGroup
export interface ButtonGroupProps {
    slot: san.SlotNode;
    size: SizeType;
}

export interface ButtonGroupState {
    sizeMap: SizeMap;
}

export interface ButtonGroupComputed {
    classes: () => string[];
}
