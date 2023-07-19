export interface StepsComputed {
    classes: () => string[];
}

export interface StepsState {
    direction?: 'horizontal' | 'vertical';
    current: number;
    labelPlacement: 'horizontal';
    status: 'wait' | 'process' | 'finish' | 'error';
    size: 'default' | 'small';
    progressDot: boolean;
    flexSupported: true;
    type: string;
    initial?: number;
}

// steps StepsProps
export interface StepsProps {
    direction?: 'horizontal' | 'vertical';
    current?: number;
    labelPlacement?: 'horizontal';
    status?: 'wait' | 'process' | 'finish' | 'error';
    size?: 'default' | 'small';
    progressDot?: boolean| san.SlotNode;
    flexSupported?: true;
    type?: string;
    initial?: number;
}

export interface StepProps {
    description?: string | san.SlotNode;
    icon?: string | san.SlotNode;
    status?: 'wait' | 'process' | 'finish' | 'error';
    title?: string | san.SlotNode;
    subTitle?: string | san.SlotNode;
    disabled?: boolean;
}
