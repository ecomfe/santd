/**
 * @file 组件 skeleton
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import classNames from 'classnames';
import {classCreator} from '../core/util';

import Avatar, {SkeletonAvatarProps} from './Avatar';
import Title, {SkeletonTitleProps} from './Title';
import Paragraph, {SkeletonParagraphProps} from './Paragraph';

const prefixCls = classCreator('skeleton')();

function getComponentProps(prop) {
    if (prop && typeof prop === 'object') {
        return prop;
    }

    return {};
}

function getAvatarBasicProps(hasTitle, hasParagraph) {
    let shape = 'circle';
    const size = 'large';

    if (hasTitle && !hasParagraph) {
        shape = 'square';
    }

    return {shape, size};
}

function getTitleBasicProps(hasAvatar, hasParagraph) {
    if (!hasAvatar && hasParagraph) {
        return {width: '38%'};
    }

    if (hasAvatar && hasParagraph) {
        return {width: '50%'};
    }

    return {};
}

function getParagraphBasicProps(hasAvatar, hasTitle) {
    const basicProps = {};

    // Width
    if (!hasAvatar || !hasTitle) {
        basicProps.width = '61%';
    }

    // Rows
    if (!hasAvatar && hasTitle) {
        basicProps.rows = 3;
    }
    else {
        basicProps.rows = 2;
    }

    return basicProps;
}

export default san.defineComponent({
    template: `
        <div>
            <slot s-if="!showSkeleton"/>
            <div s-if="showSkeleton" class="{{className}}">
                <div s-if="hasAvatar" class="${prefixCls}-header">
                    <avatar props="{{avatarProps}}"/>
                </div>
                <div s-if="{{hasTitle || hasParagraph}}" class="${prefixCls}-content">
                    <title s-if="{{hasTitle}}" props="{{titleProps}}"/>
                    <paragraph s-if="{{hasParagraph}}" props="{{paragraphProps}}"/>
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
            const data = this.data;
            const showSkeleton = data.get('showSkeleton');

            if (showSkeleton) {
                const active = data.get('active');
                const hasAvatar = data.get('hasAvatar');

                return classNames(prefixCls, {
                    [`${prefixCls}-with-avatar`]: hasAvatar,
                    [`${prefixCls}-active`]: active
                });
            }
        },
        showSkeleton() {
            const data = this.data;
            const loading = data.get('loading');
            return loading || undefined === loading;
        },
        hasAvatar() {
            return !!this.data.get('avatar');
        },
        hasTitle() {
            return !!this.data.get('title');
        },
        hasParagraph() {
            return !!this.data.get('paragraph');
        },
        avatarProps() {
            const data = this.data;
            const avatar = data.get('avatar');
            const hasTitle = data.get('hasTitle');
            const hasParagraph = data.get('hasParagraph');

            return {
                ...getAvatarBasicProps(hasTitle, hasParagraph),
                ...getComponentProps(avatar)
            };
        },
        paragraphProps() {
            const data = this.data;
            const paragraph = data.get('paragraph');
            const hasAvatar = data.get('hasAvatar');
            const hasTitle = data.get('hasTitle');

            return {
                ...getParagraphBasicProps(hasAvatar, hasTitle),
                ...getComponentProps(paragraph)
            };
        },
        titleProps() {
            const data = this.data;
            const title = data.get('title');
            const hasAvatar = data.get('hasAvatar');
            const hasParagraph = data.get('hasParagraph');

            return {
                ...getTitleBasicProps(hasAvatar, hasParagraph),
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
