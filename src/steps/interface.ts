export interface StepsComputed {
    classes: () => string[];
}

// steps StepsProps
export interface StepsProps {
    direction?: 'horizontal' | 'vertical';
    current?: number;
    labelPlacement: 'horizontal',
    status: 'process',
    size: '',
    progressDot: false,
    flexSupported: true,
    type: '',
    initial: 0
}