/**
 * @file 组件 radio
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import {classCreator} from '../core/util';
import Radio from './Radio';
import {
    RadioButtonState as State
} from './interface';

const prefixCls = classCreator('radio-button')();

export default class RadioButton extends Radio {
    initData(): State {
        return {
            ...Radio.prototype.initData(),
            prefixCls
        };
    }
};
export type TRadioButton = typeof RadioButton;
