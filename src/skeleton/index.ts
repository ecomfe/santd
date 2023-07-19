/**
 * @file 组件 skeleton
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import './style/index.less';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import {State, Props, Computed} from './interface';

const prefixCls = classCreator('skeleton')();
// const widthUnit = DataTypes.oneOfType([DataTypes.number, DataTypes.string]);

export default class Skeleton extends Base<State, Props> {
    static template = `
        <div style="display: table; width: 100%;">
            <slot s-if="!(loading || undefined === loading)" />
            <div s-if="loading || undefined === loading" class="{{classes}}">
                <div s-if="avatar" class="${prefixCls}-header">
                    <span class="{{getAvatarClasses(avatar.shape || 'circle', avatar.size || 'large')}}" />
                </div>
                <div s-if="title || paragraph" class="${prefixCls}-content">
                    <h3 class="${prefixCls}-title" style="width: {{title.width || !avatar ? '38%' : '50%'}}" s-if="title" />
                    <ul class="${prefixCls}-paragraph">
                        <li s-for="row, index in rowList" style="{{getParagraphStyle(index)}}" />
                    </ul>
                </div>
            </div>
        </div>
    `;
    getAvatarClasses(shape: string, size: string) {
        const avatarPrefixCls = `${prefixCls}-avatar`;
        let classArr = [avatarPrefixCls];

        shape && classArr.push(`${avatarPrefixCls}-${shape}`);
        size && classArr.push(`${avatarPrefixCls}-${size}`);

        return classArr;
    }
    getParagraphStyle(index: number) {
        const {width, rows = 2} = this.data.get('paragraph');
        if (Array.isArray(width)) {
            return `width: ${width[index]};`;
        }
        // last paragraph
        if (rows - 1 === index) {
            return `width: ${width};`;
        }
        return undefined;
    };
    static computed: Computed = {
        classes(this: Skeleton) {
            const loading = this.data.get('loading');

            if (loading || undefined === loading) {
                const active = this.data.get('active');
                const avatar = this.data.get('avatar');
                let classArr = [prefixCls];
                avatar && classArr.push(`${prefixCls}-with-avatar`);
                active && classArr.push(`${prefixCls}-active`);
                return classArr;
            }
        },
        rowList(this: Skeleton) {
            const paragraph = this.data.get('paragraph') || {};
            const avatar = this.data.get('avatar');
            const title = this.data.get('title');

            const rows = paragraph.rows || (!avatar && title ? 3 : 2);
            return new Array(rows);
        }
    }
    initData():State {
        return {
            avatar: false,
            paragraph: true,
            title: true
        };
    }
};
