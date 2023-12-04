/**
* @file icon图标
* @author fuqiangqiang@baidu.com
*/
import Base from 'santd/base';
import './style/index.less';
import * as allIcons from '@ant-design/icons-svg';
import {classCreator} from '../core/util';
import sanicon from './Icon';
import iconFont from './Iconfont';
import {svgBaseProps, withThemeSuffix, removeTypeTheme, alias} from './utils';
import {getTwoToneColor, setTwoToneColor} from './twoTonePrimaryColor';
import  {
    IconProps as Props,
    IconComputed as Computed,
    InnerSvgProps
} from './interface';

const prefixCls = classCreator('icon')();

sanicon.add(Object.keys(allIcons).map(key => allIcons[key]));
setTwoToneColor('#1890ff');

export default class Icon extends Base<{}, Props, Computed> {
    static components = {
        's-icon': sanicon
    };

    static computed: Computed = {
        classes(this: Icon) {
            const type = this.data.get('type');
            let classArr = [prefixCls];

            Boolean(type) && classArr.push(`${prefixCls}-${type}`);
            return classArr;
        },
        innerSvgProps(this: Icon) {
            const spin = this.data.get('spin');
            const type = this.data.get('type');
            const rotate = this.data.get('rotate');
            const viewBox = this.data.get('viewBox');
            const theme = this.data.get('theme');

            let svgStyle = rotate
                ? {
                    msTransform: `rotate(${rotate}deg)`,
                    transform: `rotate(${rotate}deg)`
                }
                : undefined;
            let innerSvgProps: InnerSvgProps = {
                ...svgBaseProps,
                class: (!!spin || type === 'loading') ? `${prefixCls}-spin` : '',
                style: svgStyle,
                viewBox
            };

            if (!viewBox) {
                delete innerSvgProps.viewBox;
            }
            if (typeof type === 'string') {
                let computedType = type;
                computedType = withThemeSuffix(
                    removeTypeTheme(alias(computedType)),
                    theme || 'outlined'
                );
                innerSvgProps.computedType = computedType;
            }
            return innerSvgProps;
        }
    };
    static template = `
        <i
            aria-label="{{type && '图标: ' + type}}"
            tabindex="{{iconTabIndex}}"
            on-click="handleClick"
            class="{{classes}}"
        >
            <slot name="component" s-if="{{hasComponent}}" />
            <s-icon
                s-else
                style="{{innerSvgProps.style}}"
                class="{{innerSvgProps.class}}"
                type="{{innerSvgProps.computedType}}"
                primaryColor="{{twoToneColor}}"
                theme="{{theme}}"
                spin="{{spin}}"
                rotate="{{rotate}}"
            >
                <slot />
            </s-icon>
        </i>
    `;

    static createFromIconfontCN = iconFont;

    static getTwoToneColor = getTwoToneColor;

    static setTwoToneColor = setTwoToneColor;

    listeners!: any;

    inited() {
        this.data.set('hasComponent', !!this.sourceSlots.named.component);

        let iconTabIndex = this.data.get('tabIndex');
        if (iconTabIndex === undefined && this.listeners.click) {
            this.data.set('iconTabIndex', -1);
        }
    };
    handleClick(e: MouseEvent) {
        this.fire('click', e);
    };
}
