/**
* @file icon图标
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import './style/index.less';
import * as allIcons from '../core/svgIcons/lib/dist';
import {classCreator} from '../core/util';
import sanicon from './icon';
import iconFont from './iconfont';
import {svgBaseProps, withThemeSuffix, removeTypeTheme, alias} from './utils';
import {getTwoToneColor, setTwoToneColor} from './twoTonePrimaryColor';

const prefixCls = classCreator('icon')();

sanicon.add(Object.keys(allIcons).map(key => allIcons[key]));
setTwoToneColor('#1890ff');

const icon = san.defineComponent({
    components: {
        's-icon': sanicon
    },
    computed: {
        classes() {
            const type = this.data.get('type');
            let classArr = [prefixCls];

            Boolean(type) && classArr.push(`${prefixCls}-${type}`);
            return classArr;
        },
        innerSvgProps() {
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
            let innerSvgProps = {
                ...svgBaseProps,
                class: (!!spin || type === 'loading') ? `${prefixCls}-spin` : '',
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
                    theme || 'outlined'
                );
                innerSvgProps.computedType = computedType;
            }
            return innerSvgProps;
        }
    },
    inited() {
        this.data.set('hasComponent', !!this.sourceSlots.named.component);
    },
    handleClick(e) {
        this.fire('click', e);
    },
    template: `<i
        aria-label="{{type && '图标: ' + type}}"
        tabIndex="{{tabIndex === undefined ? -1 : tabIndex}}"
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
    </i>`
});

icon.createFromIconfontCN = iconFont;
icon.getTwoToneColor = getTwoToneColor;
icon.setTwoToneColor = setTwoToneColor;

export default icon;
