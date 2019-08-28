/**
 * @file 组件 skeleton
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

import Avatar, {SkeletonAvatarProps} from './Avatar';
import Title, {SkeletonTitleProps} from './Title';
import Paragraph, {SkeletonParagraphProps} from './Paragraph';

const prefixCls = classCreator('skeleton')();

function getComponentProps(prop) {
    return prop && typeof prop === 'object' ? prop : {};
}

function getAvatarBasicProps(hasTitle, hasParagraph) {
    return {
        shape: hasTitle && !hasParagraph ? 'square' : 'circle',
        size: 'large'
    };
}

function getTitleBasicProps(hasAvatar, hasParagraph) {
    if (hasParagraph) {
        return {
            width: !hasAvatar ? '38%' : '50%'
        };
    }
    return {};
}

function getParagraphBasicProps(hasAvatar, hasTitle) {
    let basicProps = {};

    if (!hasAvatar || !hasTitle) {
        basicProps.width = '61%';
    }
    basicProps.rows = !hasAvatar && hasTitle ? 3 : 2;
    return basicProps;
}

export default san.defineComponent({
    template: `
        <div style="display: table; width: 100%;">
            <slot s-if="{{!(loading || undefined === loading)}}"/>
            <div s-if="{{loading || undefined === loading}}" class="{{className}}">
                <div s-if="{{avatar}}" class="${prefixCls}-header">
                    <avatar props="{{avatarProps}}"/>
                </div>
                <div s-if="{{title || paragraph}}" class="${prefixCls}-content">
                    <title s-if="{{title}}" props="{{titleProps}}"/>
                    <paragraph s-if="{{paragraph}}" props="{{paragraphProps}}"/>
                </div>
            </div>
        </div>
    `,
    dataTypes: {
        active: DataTypes.bool,
        avatar: SkeletonAvatarProps,
        loading: DataTypes.bool,
        paragraph: SkeletonParagraphProps,
        title: SkeletonTitleProps
    },
    components: {
        avatar: Avatar,
        paragraph: Paragraph,
        title: Title
    },
    computed: {
        className() {
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
        avatarProps() {
            const data = this.data;
            const avatar = data.get('avatar');
            const title = data.get('title');
            const paragraph = data.get('paragraph');

            return {
                ...getAvatarBasicProps(!!title, !!paragraph),
                ...getComponentProps(avatar)
            };
        },
        paragraphProps() {
            const data = this.data;
            const paragraph = data.get('paragraph');
            const avatar = data.get('avatar');
            const title = data.get('title');

            return {
                ...getParagraphBasicProps(!!avatar, !!title),
                ...getComponentProps(paragraph)
            };
        },
        titleProps() {
            const data = this.data;
            const title = data.get('title');
            const avatar = data.get('avatar');
            const paragraph = data.get('paragraph');

            return {
                ...getTitleBasicProps(!!avatar, !!paragraph),
                ...getComponentProps(title)
            };
        }
    },
    initData() {
        return {
            avatar: false,
            paragraph: true,
            title: true
        };
    }
});
