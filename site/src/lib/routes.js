/**
 * @file 路由配置，同时用于导航菜单
 */

export default [
    {
        name: 'Ant Design of San',
        key: '/docs/introduce',
        path: 'introduce'
    },
    {
        name: '快速上手',
        path: 'quickstart',
        key: '/docs/quickstart'
    },
    {
        name: '定制主题',
        path: 'theme',
        key: '/docs/theme'
    },
    {
        name: '更新日志',
        path: 'changelog',
        key: '/docs/changelog'
    },
    {
        name: '国际化',
        path: 'i18n',
        key: '/docs/i18n'
    },
    {
        name: '组件',
        key: 'components',
        list: [
            {
                groupName: '通用',
                groupKey: 'common',
                leaf: [
                    {
                        name: 'Button',
                        text: '按钮',
                        path: 'button',
                        key: '/components/button'
                    },
                    {
                        name: 'Icon',
                        text: '图标',
                        path: 'icon',
                        key: '/components/icon'
                    },
                    {
                        name: 'Typography',
                        text: '排版',
                        path: 'typography',
                        key: '/components/typography'
                    }
                ]
            },
            {
                groupName: '布局',
                groupKey: 'layout',
                leaf: [
                    {
                        name: 'Grid',
                        text: '栅格',
                        path: 'grid',
                        key: '/components/grid'
                    },
                    {
                        name: 'Layout',
                        text: '布局',
                        path: 'layout',
                        key: '/components/layout'
                    },
                    {
                        name: 'Space',
                        text: '间距',
                        path: 'space',
                        key: '/components/space'
                    }
                ]
            },
            {
                groupName: '导航',
                groupKey: 'nav',
                leaf: [
                    {
                        name: 'Affix',
                        text: '固钉',
                        path: 'affix',
                        key: '/components/affix'
                    },
                    {
                        name: 'Breadcrumb',
                        text: '面包屑',
                        path: 'breadcrumb',
                        key: '/components/breadcrumb'
                    },
                    {
                        name: 'Dropdown',
                        text: '下拉菜单',
                        path: 'dropdown',
                        key: '/components/dropdown'
                    },
                    {
                        name: 'Menu',
                        text: '导航菜单',
                        path: 'menu',
                        key: '/components/menu'
                    },
                    {
                        name: 'Pagination',
                        text: '分页',
                        path: 'pagination',
                        key: '/components/pagination'
                    },
                    {
                        name: 'PageHeader',
                        text: '页头',
                        path: 'page-header',
                        key: '/components/page-header'
                    },
                    {
                        name: 'Steps',
                        text: '步骤条',
                        path: 'steps',
                        key: '/components/steps'
                    }
                ]
            },
            {
                groupName: '数据录入',
                groupKey: 'datainput',
                leaf: [
                    {
                        name: 'AutoComplete',
                        text: '自动完成',
                        path: 'auto-complete',
                        key: '/components/auto-complete'
                    },
                    {
                        name: 'Checkbox',
                        text: '多选框',
                        path: 'checkbox',
                        key: '/components/checkbox'
                    },
                    {
                        name: 'Cascader',
                        text: '级联选择',
                        path: 'cascader',
                        key: '/components/cascader'
                    },
                    {
                        name: 'DatePicker',
                        text: '日期选择框',
                        path: 'date-picker',
                        key: '/components/date-picker'
                    },
                    {
                        name: 'Form',
                        text: '表单',
                        path: 'form',
                        key: '/components/form'
                    },
                    {
                        name: 'InputNumber',
                        text: '数字输入框',
                        path: 'input-number',
                        key: '/components/input-number'
                    },
                    {
                        name: 'Input',
                        text: '输入框',
                        path: 'input',
                        key: '/components/input'
                    },
                    {
                        name: 'Mention',
                        text: '提及',
                        path: 'mention',
                        key: '/components/mention'
                    },
                    {
                        name: 'Rate',
                        text: '评分',
                        path: 'rate',
                        key: '/components/rate'
                    },
                    {
                        name: 'Radio',
                        text: '单选框',
                        path: 'radio',
                        key: '/components/radio'
                    },
                    {
                        name: 'Switch',
                        text: '开关',
                        path: 'switch',
                        key: '/components/switch'
                    },
                    {
                        name: 'Slider',
                        text: '滑动输入条',
                        path: 'slider',
                        key: '/components/slider'
                    },
                    {
                        name: 'Select',
                        text: '选择器',
                        path: 'select',
                        key: '/components/select'
                    },
                    {
                        name: 'TreeSelect',
                        text: '树选择',
                        path: 'tree-select',
                        key: '/components/tree-select'
                    },
                    {
                        name: 'Transfer',
                        text: '穿梭框',
                        path: 'transfer',
                        key: '/components/transfer'
                    },
                    {
                        name: 'TimePicker',
                        text: '时间选择框',
                        path: 'time-picker',
                        key: '/components/time-picker'
                    },
                    {
                        name: 'Upload',
                        text: '上传',
                        path: 'upload',
                        key: '/components/upload'
                    }
                ]
            },
            {
                groupName: '数据展示',
                groupKey: 'datadisplay',
                leaf: [
                    {
                        name: 'Avatar',
                        text: '头像',
                        path: 'avatar',
                        key: '/components/avatar'
                    },
                    {
                        name: 'Badge',
                        text: '徽标数',
                        path: 'badge',
                        key: '/components/badge'
                    },
                    {
                        name: 'Comment',
                        text: '评论',
                        path: 'comment',
                        key: '/components/comment'
                    },
                    {
                        name: 'Collapse',
                        text: '折叠面板',
                        path: 'collapse',
                        key: '/components/collapse'
                    },
                    {
                        name: 'Carousel',
                        text: '走马灯',
                        path: 'carousel',
                        key: '/components/carousel'
                    },
                    {
                        name: 'Card',
                        text: '卡片',
                        path: 'card',
                        key: '/components/card'
                    },
                    {
                        name: 'Calendar',
                        text: '日历',
                        path: 'calendar',
                        key: '/components/calendar'
                    },
                    {
                        name: 'Descriptions',
                        text: '描述列表',
                        path: 'descriptions',
                        key: '/components/descriptions'
                    },
                    {
                        name: 'Empty',
                        text: '空状态',
                        path: 'empty',
                        key: '/components/empty'
                    },
                    {
                        name: 'List',
                        text: '列表',
                        path: 'list',
                        key: '/components/list'
                    },
                    {
                        name: 'Popover',
                        text: '气泡卡片',
                        path: 'popover',
                        key: '/components/popover'
                    },
                    {
                        name: 'Statistic',
                        text: '统计数值',
                        path: 'statistic',
                        key: '/components/statistic'
                    },
                    {
                        name: 'Tree',
                        text: '树形控件',
                        path: 'tree',
                        key: '/components/tree'
                    },
                    {
                        name: 'Tooltip',
                        text: '文字提示',
                        path: 'tooltip',
                        key: '/components/tooltip'
                    },
                    {
                        name: 'Timeline',
                        text: '时间轴',
                        path: 'timeline',
                        key: '/components/timeline'
                    },
                    {
                        name: 'Tag',
                        text: '标签',
                        path: 'tag',
                        key: '/components/tag'
                    },
                    {
                        name: 'Tabs',
                        text: '标签页',
                        path: 'tabs',
                        key: '/components/tabs'
                    },
                    {
                        name: 'Table',
                        text: '表格',
                        path: 'table',
                        key: '/components/table'
                    }
                ]
            },
            {
                groupName: '反馈',
                groupKey: 'feedback',
                leaf: [
                    {
                        name: 'Alert',
                        text: '警告提示',
                        path: 'alert',
                        key: '/components/alert'
                    },
                    {
                        name: 'Drawer',
                        text: '抽屉',
                        path: 'drawer',
                        key: '/components/drawer'
                    },
                    {
                        name: 'Modal',
                        text: '对话框',
                        path: 'modal',
                        key: '/components/modal'
                    },
                    {
                        name: 'Message',
                        text: '全局提示',
                        path: 'message',
                        key: '/components/message'
                    },
                    {
                        name: 'Notification',
                        text: '通知提醒框',
                        path: 'notification',
                        key: '/components/notification'
                    },
                    {
                        name: 'Progress',
                        text: '进度条',
                        path: 'progress',
                        key: '/components/progress'
                    },
                    {
                        name: 'Popconfirm',
                        text: '气泡确认框',
                        path: 'popconfirm',
                        key: '/components/popconfirm'
                    },
                    {
                        name: 'Result',
                        text: '结果',
                        path: 'result',
                        key: '/components/result'
                    },
                    {
                        name: 'Spin',
                        text: '加载中',
                        path: 'spin',
                        key: '/components/spin'
                    },
                    {
                        name: 'Skeleton',
                        text: '骨架屏',
                        path: 'skeleton',
                        key: '/components/skeleton'
                    }
                ]
            },
            {
                groupName: '其他',
                groupKey: 'other',
                leaf: [
                    {
                        name: 'Anchor',
                        text: '锚点',
                        path: 'anchor',
                        key: '/components/anchor'
                    },
                    {
                        name: 'BackTop',
                        text: '回到顶部',
                        path: 'back-top',
                        key: '/components/back-top'
                    },
                    {
                        name: 'LocaleProvider',
                        text: '国际化',
                        path: 'locale-provider',
                        key: '/components/locale-provider'
                    },
                    {
                        name: 'Divider',
                        text: '分割线',
                        path: 'divider',
                        key: '/components/divider'
                    }
                ]
            }
        ]
    }
];
