/**
* @file input-number中上下键处理
* @author fuqiangqiang@baidu.com
*/
import Icon from '../icon';
import Base from 'santd/base';
import type {HandlerProps, HandlerState, HandlerComputed} from './interface';


export default class InputHandle extends Base <HandlerProps, HandlerState, HandlerComputed> {
    static template = `
        <span
            class="{{classes}}"
            unselectable="unselectable"
            role="button"
            aria-label="Decrease Value"
            aria-disabled="{{disabled || false}}"
            on-click="valueChange"
        >
            <s-icon type="{{direction}}" class="{{prefixCls}}-handler-{{direction}}-inner" />
        </span>
    `
    
    static components = {
        's-icon': Icon
    }

    static computed:  HandlerComputed= {
        classes(this: InputHandle) {
            const prefixCls = this.data.get('prefixCls');
            const direction = this.data.get('direction');
            let classArr = [`${prefixCls}-handler`, `${prefixCls}-handler-${direction}`];

            this.data.get('disabled') && direction && classArr.push(`${prefixCls}-handler-${direction}-disabled`);
            return classArr;
        }
    }

    valueChange(e: Event) {
        this.dispatch('santd_inputnumber_' + this.data.get('direction'), e);
    }
};
