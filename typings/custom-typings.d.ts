declare module '*.less';
declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module "*.md" {
    const value: string;
    export default value;
};

// 常见 JSON 类型数据
type JSONValue = string | number | boolean | null | JSONValue[] | {[key: string]: JSONValue};
// CSS modules 样式映射
type Styles = JSONValue;