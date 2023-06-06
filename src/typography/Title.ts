/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */
import Base from 'santd/base';
import './style/index.less';
import {classCreator} from '../core/util';
import baseUtil from './Base';

interface PrivateProps {
    prefixCls: string;
    baseTemplate: string;
}

interface Props {
    level?: number;
}

const prefixCls = classCreator('typography')();

const baseTemplate = `<s-base
    copyable="{{copyable}}"
    delete="{{delete}}"
    disabled="{{disabled}}"
    ellipsis="{{ellipsis}}"
    level="{{level}}"
    mark="{{mark}}"
    underline="{{underline}}"
    type="{{type}}"
    ><slot /></s-base>
`;

export default class Title extends Base<{}, Props & PrivateProps> {
    static template = `
        <div>
            <h2 s-if="level === 2" class="${prefixCls}">${baseTemplate}</h2>
            <h3 s-elif="level === 3" class="${prefixCls}">${baseTemplate}</h3>
            <h4 s-elif="level === 4" class="${prefixCls}">${baseTemplate}</h4>
            <h1 s-else class="${prefixCls}">${baseTemplate}</h1>
        </div>
    `

    static components = {
        's-base': baseUtil.create('title')
    }
}

export type TTitle = typeof Title;