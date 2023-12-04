/**
 * @file Space 组件
 * @author Lohoyo
*/
import Base, {NodeChild} from 'santd/base';
import './style/index.less';
import {State, Props, Computed, Size, Direction} from './interface'
import {classCreator} from '../core/util/index';
const prefixCls = classCreator('space')();

export default class Space extends Base<State, Props> {
    initData(): State {
        return {
            direction: 'horizontal',
            size: 'small'
        };
    }

    static computed: Computed = {
        classes(this: Space) {
            const direction = this.data.get('direction');
            const size = this.data.get('size');
            const align = this.data.get('align');
            const wrap = this.data.get('wrap');
            let classArr = [prefixCls];

            classArr.push(`${prefixCls}-${direction}`);
            if (!Array.isArray(size)) {
                classArr.push(`${prefixCls}-${size}`);
            } else if (size.length === 1) {
                classArr.push(`${prefixCls}-${size[0]}`);
            } else {
                classArr.push(`${prefixCls}-horizontal-${size[0]}`);
                classArr.push(`${prefixCls}-vertical-${size[1]}`);
            }
            align && classArr.push(`${prefixCls}-${align}`);
            wrap && classArr.push(`${prefixCls}-wrap`);

            return classArr;
        },

        styles(this: Space) {
            const slotChildren = this.data.get('slotChildren');
            if (!slotChildren) {
                return '';
            }
            const size = this.data.get('size');
            const direction = this.data.get('direction');
            let styles = '';
            if (!Array.isArray(size)) {
                if (isNum(size)) {
                    setNumberSize(slotChildren, direction, size);
                    styles += computeContainerMargin(direction, size);
                }
            } else if (size.length === 1) {
                if (isNum(size[0])) {
                    setNumberSize(slotChildren, direction, size[0]);
                    styles += computeContainerMargin(direction, size[0]);
                }
            } else {
                if (isNum(size[0])) {
                    setNumberSize(slotChildren, 'horizontal', size[0]);
                    styles += computeContainerMargin('horizontal', size[0]);
                }
                if (isNum(size[1])) {
                    setNumberSize(slotChildren, 'vertical', size[1]);
                    styles += computeContainerMargin('vertical', size[1]);
                }
            }
            return styles;
        }
    }

    attached() {
        // nodeType 的各个值的含义见：https://github.com/baidu/san/blob/d296d8e7c575da41bb6334c2864d61f0e543df2f/types/index.d.ts#L226
        this.data.set('slotChildren', this.slotChildren[0].children.filter(child => [2, 3, 4, 5].includes(child.nodeType)));
    }

    static template = `
        <div class="{{classes}}" style="{{styles}}">
            <slot></slot>
        </div>
    `
};

function setNumberSize(htmlNodes: NodeChild[], direction: Direction, numberSize: Size) {
    htmlNodes.forEach(htmlNode => {
        if (htmlNode.nodeType === 2 || htmlNode.nodeType === 3) {
            // @ts-ignore
            setNumberSize(htmlNode.children, direction, numberSize);
        } else {
            if (direction === 'horizontal') {
                 // @ts-ignore
                htmlNode.el.style.marginRight = numberSize + 'px';
            } else {
                 // @ts-ignore
                htmlNode.el.style.marginBottom = numberSize + 'px';
            }
        }
    });
}

function isNum(value: Size) {
    return /^[0-9]+\.?[0-9]*$/.test(value + '');
}

function computeContainerMargin(direction: Direction, size: Size) {
    return direction === 'horizontal' ? ('margin-right: -' + size + 'px; ') : ('margin-bottom: -' + size + 'px; ');
}
