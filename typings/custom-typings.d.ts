declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module "*.md" {
    const value: string;
    export default value;
};
declare module 'lodash/debounce';
declare module 'lodash/isEmpty';

// 常见 JSON 类型数据
type JSONValue = string | number | boolean | null | JSONValue[] | {[key: string]: JSONValue};
// CSS modules 样式映射
type Styles = JSONValue;

// 方向
type Direction = 'left' | 'top' | 'right' | 'bottom';


// enquire.js 的简易实现
type EnquireHandler = {
    match?: () => void;
    unmatch?: () => void;
    setup?: () =>  void;
    destroy?: () =>  void;
    deferSetup?: boolean;
}
type Enquire = {
    register: (type: string, fn: (() => void) | EnquireHandler) => void;
    unregister: (type: string) => void;
} | null;