/**
* @file icon图标
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import './style/index.less';
import * as allIcons from 'santd/core/svgIcons/lib/dist';
import classNames from 'classnames';
import {classCreator} from 'santd/core/util';
import sanicon from './icon';
import iconFont from './iconfont';
import {svgBaseProps, withThemeSuffix, removeTypeTheme, alias} from './utils';
import {getTwoToneColor, setTwoToneColor} from './twoTonePrimaryColor';

const prefixCls = classCreator('icon')();
let defaultTheme = 'outlined';
let dangerousTheme;

sanicon.add(Object.keys(allIcons).map(key => allIcons[key]));
setTwoToneColor('#1890ff');

const icon = san.defineComponent({
    components: {
        's-icon': sanicon
    },
    computed: {
        classes() {
            const type = this.data.get('type');
            const className = this.data.get('className');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-${type}`]: Boolean(type)
            }, className);
        },
        iconTabIndex() {
            const tabIndex = this.data.get('tabIndex');
            return tabIndex === undefined && -1;
        },
        innerSvgProps() {
            const spin = this.data.get('spin');
            const type = this.data.get('type');
            const rotate = this.data.get('rotate');
            const viewBox = this.data.get('viewBox');
            const theme = this.data.get('theme');
            const svgClasses = classNames({
                [`${prefixCls}-spin`]: !!spin || type === 'loading'
            });
            const svgStyle = rotate
                ? {
                    msTransform: `rotate(${rotate}deg)`,
                    transform: `rotate(${rotate}deg)`
                }
                : undefined;
            const innerSvgProps = {
                ...svgBaseProps,
                class: svgClasses,
                style: svgStyle,
                viewBox
            };

            if (!viewBox) {
                delete innerSvgProps['viewBox'];
            }
            if (typeof type === 'string') {
                let computedType = type;
                computedType = withThemeSuffix(
                    removeTypeTheme(alias(computedType)),
                    dangerousTheme || theme || defaultTheme
                );
                innerSvgProps.computedType = computedType;
            }
            return innerSvgProps;
        }
    },
    handleClick(e) {
        this.fire('click', e);
    },
    template: `<i
        aria-label="{{type && '图标: ' + type}}"
        tabIndex="{{iconTabIndex}}"
        on-click="handleClick"
        class="{{classes}}"
    >
        <s-icon
            style="{{innerSvgProps.style}}"
            class="{{innerSvgProps.class}}"
            type="{{innerSvgProps.computedType}}"
            primaryColor="{{twoToneColor}}"
            theme="{{theme}}"
            spin="{{spin}}"
            rotate="{{rotate}}"
        >
            <slot></slot>
        </s-icon>
    </i>`
});

icon.createFromIconfontCN = iconFont;
icon.getTwoToneColor = getTwoToneColor;
icon.setTwoToneColor = setTwoToneColor;

export default icon;
