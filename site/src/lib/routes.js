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
        name: '组件',
        key: 'components',
        list: [
            {
                groupName: '通用',
                groupKey: 'common',
                leaf: [
                    {
                        name: 'Button 按钮',
                        path: 'button',
                        key: '/components/button'
                    },
                    {
                        name: 'Icon 图标',
                        path: 'icon',
                        key: '/components/icon'
                    },
                    {
                        name: 'Typography 排版',
                        path: 'typography',
                        key: '/components/typography'
                    },
                    {
                        name: 'Grid 栅格',
                        path: 'grid',
                        key: '/components/grid'
                    },
                    {
                        name: 'Layout 布局',
                        path: 'layout',
                        key: '/components/layout'
                    }
                ]
            },
            {
                groupName: '导航',
                groupKey: 'nav',
                leaf: [
                    {
                        name: 'Affix 图钉',
                        path: 'affix',
                        key: '/components/affix'
                    },
                    {
                        name: 'Breadcrumb 面包屑',
                        path: 'breadcrumb',
                        key: '/components/breadcrumb'
                    },
                    {
                        name: 'dropdown 下拉菜单',
                        path: 'dropdown',
                        key: '/components/dropdown'
                    },
                    {
                        name: 'Menu 导航菜单',
                        path: 'menu',
                        key: '/components/menu'
                    },
                    {
                        name: 'Pagination 分页',
                        path: 'pagination',
                        key: '/components/pagination'
                    },
                    {
                        name: 'Steps 步骤条',
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
                        name: 'AutoComplete 自动完成',
                        path: 'auto-complete',
                        key: '/components/auto-complete'
                    },
                    {
                        name: 'Checkbox 多选框',
                        path: 'checkbox',
                        key: '/components/checkbox'
                    },
                    {
                        name: 'Cascader 级联选择',
                        path: 'cascader',
                        key: '/components/cascader'
                    },
                    {
                        name: 'DatePicker 日期选择框',
                        path: 'date-picker',
                        key: '/components/date-picker'
                    },
                    {
                        name: 'Form 表单',
                        path: 'form',
                        key: '/components/form'
                    },
                    {
                        name: 'InputNumber 数字输入框',
                        path: 'input-number',
                        key: '/components/input-number'
                    },
                    {
                        name: 'Input 输入框',
                        path: 'input',
                        key: '/components/input'
                    },
                    {
                        name: 'Mention 提及',
                        path: 'mention',
                        key: '/components/mention'
                    },
                    {
                        name: 'Rate 评分',
                        path: 'rate',
                        key: '/components/rate'
                    },
                    {
                        name: 'Radio 单选框',
                        path: 'radio',
                        key: '/components/radio'
                    },
                    {
                        name: 'Switch 开关',
                        path: 'switch',
                        key: '/components/switch'
                    },
                    {
                        name: 'Slider 滑动输入条',
                        path: 'slider',
                        key: '/components/slider'
                    },
                    {
                        name: 'Select 选择器',
                        path: 'select',
                        key: '/components/select'
                    },
                    {
                        name: 'TreeSelect 树选择',
                        path: 'tree-select',
                        key: '/components/tree-select'
                    },
                    {
                        name: 'Transfer 穿梭框',
                        path: 'transfer',
                        key: '/components/transfer'
                    },
                    {
                        name: 'TimePicker 时间选择框',
                        path: 'timepicker',
                        key: '/components/timepicker'
                    },
                    {
                        name: 'Upload 上传',
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
                        name: 'Avatar 头像',
                        path: 'avatar',
                        key: '/components/avatar'
                    },
                    {
                        name: 'Badge 徽标数',
                        path: 'badge',
                        key: '/components/badge'
                    },
                    {
                        name: 'Comment 评论',
                        path: 'comment',
                        key: '/components/comment'
                    },
                    {
                        name: 'Collapse 折叠面板',
                        path: 'collapse',
                        key: '/components/collapse'
                    },
                    {
                        name: 'Carousel 走马灯',
                        path: 'carousel',
                        key: '/components/carousel'
                    },
                    {
                        name: 'Card 卡片',
                        path: 'card',
                        key: '/components/card'
                    },
                    {
                        name: 'Calendar 日历',
                        path: 'calendar',
                        key: '/components/calendar'
                    },
                    {
                        name: 'Empty 空状态',
                        path: 'empty',
                        key: '/components/empty'
                    },
                    {
                        name: 'List 列表',
                        path: 'list',
                        key: '/components/list'
                    },
                    {
                        name: 'Popover 气泡卡片',
                        path: 'popover',
                        key: '/components/popover'
                    },
                    {
                        name: 'Statistic 统计数值',
                        path: 'statistic',
                        key: '/components/statistic'
                    },
                    {
                        name: 'Tree 树形控件',
                        path: 'tree',
                        key: '/components/tree'
                    },
                    {
                        name: 'Tooltip 文字提示',
                        path: 'tooltip',
                        key: '/components/tooltip'
                    },
                    {
                        name: 'Timeline 时间轴',
                        path: 'timeline',
                        key: '/components/timeline'
                    },
                    {
                        name: 'Tag 标签',
                        path: 'tag',
                        key: '/components/tag'
                    },
                    {
                        name: 'Tabs 标签页',
                        path: 'tabs',
                        key: '/components/tabs'
                    },
                    {
                        name: 'Table 表格',
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
                        name: 'Alert 警告提示',
                        path: 'alert',
                        key: '/components/alert'
                    },
                    {
                        name: 'Drawer 抽屉',
                        path: 'drawer',
                        key: '/components/drawer'
                    },
                    {
                        name: 'Modal 对话框',
                        path: 'modal',
                        key: '/components/modal'
                    },
                    {
                        name: 'Message 全局提示',
                        path: 'message',
                        key: '/components/message'
                    },
                    {
                        name: 'Notification 通知提醒框',
                        path: 'notification',
                        key: '/components/notification'
                    },
                    {
                        name: 'Progress 进度条',
                        path: 'progress',
                        key: '/components/progress'
                    },
                    {
                        name: 'Popconfirm 气泡确认框',
                        path: 'popconfirm',
                        key: '/components/popconfirm'
                    },
                    {
                        name: 'Spin 加载中',
                        path: 'spin',
                        key: '/components/spin'
                    },
                    {
                        name: 'Skeleton 骨架屏',
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
                        name: 'Anchor 锚点',
                        path: 'anchor',
                        key: '/components/anchor'
                    },
                    {
                        name: 'BackTop 回到顶部',
                        path: 'back-top',
                        key: '/components/back-top'
                    },
                    {
                        name: 'Divider 分割线',
                        path: 'divider',
                        key: '/components/divider'
                    }
                ]
            }
        ]
    }
];
