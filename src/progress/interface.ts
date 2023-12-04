export interface State {
    percent: number;
    showInfo: true;
    size: 'default' | 'small';
    strokeLinecap: string;
    successPercent: number;
    trailColor: string;
    type: 'line' | 'circle' | 'dashboard';
    width: number;
    statusColorMap: {
        normal: string;
        exception: string;
        success: string;
    };
}

export interface Props {
    /**
     * 内容的模板函数
     */
    format?: (args0: number, args1: number) => string;
    /**
     * 圆形进度条缺口角度，可取值 0 ~ 360
     */
    gapDegree?: number;
    /**
     * 圆形进度条缺口位置
     */
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * 百分比	
     */
    percent?: number;
    /**
     * 是否显示进度数值或状态图标	
     */
    showInfo?: boolean;
    /**
     * 大小	
     */
    size?: 'default' | 'small';
    /**
     * 状态		
     */
    status?: 'success' | 'active' | 'exception';
    /**
     * 进度条线的宽度，单位 px
     * type=line时为8
     * type=circle时为6
     */
    strokeWidth?: number;
    /**
     * 形状
     */
    strokeLinecap?: 'round' | 'square';
    /**
     * 进度条的色彩
     */
    strokeColor?: string;
    /**
     * 已完成的分段百分比，type="line" 时有效
     */
    successPercent?: number;
    /**
     * 踪迹的色彩
     */
    trailColor?: string;
    /**
     * 类型	
     */
    type?: 'line' | 'circle' | 'dashboard';
    /**
     * 圆形进度条画布宽度，单位 px
     */
    width?: number
}

type gapDegType = number | false

export interface Computed {
    classes: () => string[];
    percentStyle: () => string;
    successPercentStyle: () => string;
    lineWidth: () => string;
    lineHeight: () => string;
    progressStatus: () => 'success' | 'exception' | 'normal';
    progressText: () => string
    progressIcon: () => string
    showIcon: () => boolean
    circleStyle: () => string;
    gapDeg: () => gapDegType;
}

export interface ProgressCirleComputed {
    pathStyles: () => {
        pathString: string;
        trailPathStyle: string;
        strokePathStyle: string;
    };
    pathString: () => string;
    trailPathStyle: () => string;
    strokePathStyle: () => string;
}

export interface ProgressCirleState {
    gapPosition: string;
}
export interface ProgressCirleProps {
    
}