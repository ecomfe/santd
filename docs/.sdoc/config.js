/**
 * 文档配置
 * @author kidnes
 */
'use strict';

const path = require('path');
const resolve = dir => path.join(__dirname, '../../src', dir);

module.exports = {
    base: '/santd/',
    title: 'Santd - San Toolkit for Ant Design',
    head: [
        ['link', {rel: 'icon', href: '/santd/logo.svg'}]
    ],
    logo: 'logo.svg',

    themeConfig: {
        nav: [
            {text: 'San', link: 'https://baidu.github.io/san/'},
            {text: 'San CLI', link: 'https://ecomfe.github.io/san-cli/'},
            {text: 'Github', link: 'https://github.com/ecomfe/santd'}
        ],
        sidebar: {
            '/': [{
                    title: 'Ant Design of San',
                    path: '/',
                }, {
                    title: '快速上手',
                    path: '/quickstart/'
                }, {
                    title: '定制主题',
                    path: '/theme/'
                }, {
                    title: '更新日志',
                    path: '/changelog/'
                },{
                    title: '国际化',
                    path: '/i18n/'
                },{
                    title: '组件',
                    children: [{
                        title: '通用',
                        children: [{
                            title: 'Button 按钮',
                            path: '/components/button/',
                            filename: resolve('button/docs/index.js')
                        }, {
                            title: 'Icon 图标',
                            path: '/components/icon/',
                            filename: resolve('icon/docs/index.js')
                        }, {
                            title: 'Typography 排版',
                            path: '/components/typography/',
                            filename: resolve('typography/docs/index.js')
                        }]
                    }, {
                        title: '布局',
                        children: [{
                            title: 'Grid 栅格',
                            path: '/components/grid/',
                            filename: resolve('grid/docs/index.js')
                        }, {
                            title: 'Layout 布局',
                            path: '/components/layout/',
                            filename: resolve('layout/docs/index.js')
                        }]
                    }, {
                        title: '导航',
                        children: [{
                            title: 'Affix 图钉',
                            path: '/components/affix/',
                            filename: resolve('affix/docs/index.js')
                        }, {
                            title: 'Breadcrumb 面包屑',
                            path: '/components/breadcrumb/',
                            filename: resolve('breadcrumb/docs/index.js')
                        }, {
                            title: 'Dropdown 下拉菜单',
                            path: '/components/dropdown/',
                            filename: resolve('dropdown/docs/index.js')
                        }, {
                            title: 'Menu 导航菜单',
                            path: '/components/menu/',
                            filename: resolve('menu/docs/index.js')
                        }, {
                            title: 'Pagination 分页',
                            path: '/components/pagination/',
                            filename: resolve('pagination/docs/index.js')
                        }, {
                            title: 'PageHeader 页头',
                            path: '/components/pageheader/',
                            filename: resolve('pageheader/docs/index.js')
                        }, {
                            title: 'Steps 步骤条',
                            path: '/components/steps/',
                            filename: resolve('steps/docs/index.js')
                        }]
                    }, {
                        title: '数据录入',
                        children: [{
                            title: 'AutoComplete 自动完成',
                            path: '/components/auto-complete/',
                            filename: resolve('auto-complete/docs/index.js')
                        }, {
                            title: 'Checkbox 多选框',
                            path: '/components/checkbox/',
                            filename: resolve('checkbox/docs/index.js')
                        }, {
                            title: 'Cascader 级联选择',
                            path: '/components/cascader/',
                            filename: resolve('cascader/docs/index.js')
                        }, {
                            title: 'DatePicker 日期选择框',
                            path: '/components/date-picker/',
                            filename: resolve('date-picker/docs/index.js')
                        }, {
                            title: 'Form 表单',
                            path: '/components/form/',
                            filename: resolve('form/docs/index.js')
                        }, {
                            title: 'InputNumber 数字输入框',
                            path: '/components/input-number/',
                            filename: resolve('input-number/docs/index.js')
                        }, {
                            title: 'Input 输入框',
                            path: '/components/input/',
                            filename: resolve('input/docs/index.js')
                        }, {
                            title: 'Mention 提及',
                            path: '/components/mention/',
                            filename: resolve('mention/docs/index.js')
                        }, {
                            title: 'Rate 评分',
                            path: '/components/rate/',
                            filename: resolve('rate/docs/index.js')
                        }, {
                            title: 'Radio 单选框',
                            path: '/components/radio/',
                            filename: resolve('radio/docs/index.js')
                        }, {
                            title: 'Switch 开关',
                            path: '/components/switch/',
                            filename: resolve('switch/docs/index.js')
                        }, {
                            title: 'Slider 滑动输入条',
                            path: '/components/slider/',
                            filename: resolve('slider/docs/index.js')
                        }, {
                            title: 'Select 选择器',
                            path: '/components/select/',
                            filename: resolve('select/docs/index.js')
                        }, {
                            title: 'TreeSelect 树选择',
                            path: '/components/tree-select/',
                            filename: resolve('tree-select/docs/index.js')
                        }, {
                            title: 'Transfer 穿梭框',
                            path: '/components/transfer/',
                            filename: resolve('transfer/docs/index.js')
                        }, {
                            title: 'TimePicker 时间选择框',
                            path: '/components/timepicker/',
                            filename: resolve('timepicker/docs/index.js')
                        }, {
                            title: 'Upload 上传',
                            path: '/components/upload/',
                            filename: resolve('upload/docs/index.js')
                        }]
                    }, {
                        title: '数据展示',
                        children: [{
                            title: 'Avatar 头像',
                            path: '/components/avatar/',
                            filename: resolve('avatar/docs/index.js')
                        }, {
                            title: 'Badge 徽标数',
                            path: '/components/badge/',
                            filename: resolve('badge/docs/index.js')
                        }, {
                            title: 'Comment 评论',
                            path: '/components/comment/',
                            filename: resolve('comment/docs/index.js')
                        }, {
                            title: 'Collapse 折叠面板',
                            path: '/components/collapse/',
                            filename: resolve('collapse/docs/index.js')
                        }, {
                            title: 'Carousel 走马灯',
                            path: '/components/carousel/',
                            filename: resolve('carousel/docs/index.js')
                        }, {
                            title: 'Card 卡片',
                            path: '/components/card/',
                            filename: resolve('card/docs/index.js')
                        }, {
                            title: 'Calendar 日历',
                            path: '/components/calendar/',
                            filename: resolve('calendar/docs/index.js')
                        }, {
                            title: 'Descriptions 描述列表',
                            path: '/components/descriptions/',
                            filename: resolve('descriptions/docs/index.js')
                        }, {
                            title: 'Empty 空状态',
                            path: '/components/empty/',
                            filename: resolve('empty/docs/index.js')
                        }, {
                            title: 'List 列表',
                            path: '/components/list/',
                            filename: resolve('list/docs/index.js')
                        }, {
                            title: 'Popover 气泡卡片',
                            path: '/components/popover/',
                            filename: resolve('popover/docs/index.js')
                        }, {
                            title: 'Statistic 统计数值',
                            path: '/components/statistic/',
                            filename: resolve('statistic/docs/index.js')
                        }, {
                            title: 'Tree 树形控件',
                            path: '/components/tree/',
                            filename: resolve('tree/docs/index.js')
                        }, {
                            title: 'Tooltip 文字提示',
                            path: '/components/tooltip/',
                            filename: resolve('tooltip/docs/index.js')
                        }, {
                            title: 'Timeline 时间轴',
                            path: '/components/timeline/',
                            filename: resolve('timeline/docs/index.js')
                        }, {
                            title: 'Tag 标签',
                            path: '/components/tag/',
                            filename: resolve('tag/docs/index.js')
                        }, {
                            title: 'Tabs 标签页',
                            path: '/components/tabs/',
                            filename: resolve('tabs/docs/index.js')
                        }, {
                            title: 'Table 表格',
                            path: '/components/table/',
                            filename: resolve('table/docs/index.js')
                        }]
                    }, {
                        title: '反馈',
                        children: [{
                            title: 'Alert 警告提示',
                            path: '/components/alert/',
                            filename: resolve('alert/docs/index.js')
                        }, {
                            title: 'Drawer 抽屉',
                            path: '/components/drawer/',
                            filename: resolve('drawer/docs/index.js')
                        }, {
                            title: 'Modal 对话框',
                            path: '/components/modal/',
                            filename: resolve('modal/docs/index.js')
                        }, {
                            title: 'Message 全局提示',
                            path: '/components/message/',
                            filename: resolve('message/docs/index.js')
                        }, {
                            title: 'Notification 通知提醒框',
                            path: '/components/notification/',
                            filename: resolve('notification/docs/index.js')
                        }, {
                            title: 'Progress 进度条',
                            path: '/components/progress/',
                            filename: resolve('progress/docs/index.js')
                        }, {
                            title: 'Popconfirm 气泡确认框',
                            path: '/components/popconfirm/',
                            filename: resolve('popconfirm/docs/index.js')
                        }, {
                            title: 'Result 结果',
                            path: '/components/result/',
                            filename: resolve('result/docs/index.js')
                        }, {
                            title: 'Spin 加载中',
                            path: '/components/spin/',
                            filename: resolve('spin/docs/index.js')
                        }, {
                            title: 'Skeleton 骨架屏',
                            path: '/components/skeleton/',
                            filename: resolve('skeleton/docs/index.js')
                        }]
                    }, {
                        title: '其他',
                        children: [{
                            title: 'Anchor 锚点',
                            path: '/components/anchor/',
                            filename: resolve('anchor/docs/index.js')
                        }, {
                            title: 'BackTop 回到顶部',
                            path: '/components/back-top/',
                            filename: resolve('back-top/docs/index.js')
                        }, {
                            title: 'LocaleProvider 国际化',
                            path: '/components/localeprovider/',
                            filename: resolve('localeprovider/docs/index.js')
                        }, {
                            title: 'Divider 分割线',
                            path: '/components/divider/',
                            filename: resolve('divider/docs/index.js')
                        }]
                    }]
                }]
        }
    },
    chainWebpack(config) {
        // 这里可以用来扩展 webpack 的配置，使用的是 webpack-chain 语法
        config.resolve.alias
            .set('santd/es', resolve('.'))
            .set('santd', resolve('.'))
    }
};

