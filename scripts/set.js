/**
 * @file 生成hexo文档的配置文件
 * @author chenai13@baidu.com
 */

module.exports = {
    compoPath: './santd',
    url: 'http://bjyz-hulk.epc.baidu.com/docs/santd',
    root: '/docs/santd/',
    rootElementId: 'app',
    menu: {
        link: '/components/affix',
        text: 'santd',
        name: 'santddoc',
        nav: [
            {
                link: '/introduce/quickstart',
                text: '介绍',
                name: 'introduce',
                sidebar: [{
                    link: '/introduce/quickstart',
                    text: '快速开始',
                    name: 'quickstart',
                    source: './docs/introduce/quickstart.md'
                }]
            },
            {
                link: '/components/affix',
                text: '组件',
                name: 'components',
                sidebar: [
                    {
                        subtype: 'subside',
                        text: '通用',
                        leaf: [
                            {
                                link: '/components/button',
                                text: 'Button 按钮',
                                name: 'button'
                            },
                            {
                                link: '/components/icon',
                                text: 'Icon 图标',
                                name: 'icon'
                            },
                            {
                                link: '/components/typography',
                                text: 'Typography 排版',
                                name: 'typography'
                            }
                        ]
                    },
                    {
                        subtype: 'subside',
                        text: '布局',
                        leaf: [
                            {
                                link: '/components/grid',
                                text: 'Grid 栅格',
                                name: 'grid'
                            },
                            {
                                link: '/components/layout',
                                text: 'Layout 布局',
                                name: 'layout'
                            }
                        ]
                    },
                    {
                        subtype: 'subside',
                        text: '导航',
                        leaf: [
                            {
                                link: '/components/affix',
                                text: 'Affix 图钉',
                                name: 'affix'
                            },
                            {
                                link: '/components/breadcrumb',
                                text: 'Breadcrumb 面包屑',
                                name: 'breadcrumb'
                            },
                            {
                                link: '/components/dropdown',
                                text: 'dropdown 下拉菜单',
                                name: 'dropdown'
                            },
                            {
                                link: '/components/menu',
                                text: 'Menu 导航菜单',
                                name: 'menu'
                            },
                            {
                                link: '/components/pagination',
                                text: 'Pagination 分页',
                                name: 'pagination'
                            },
                            {
                                link: '/components/steps',
                                text: 'Steps 步骤条',
                                name: 'steps'
                            }
                        ]
                    },
                    {
                        subtype: 'subside',
                        text: '数据录入',
                        leaf: [
                            {
                                link: '/components/auto-complete',
                                text: 'AutoComplete 自动完成',
                                name: 'auto-complete'
                            },
                            {
                                link: '/components/checkbox',
                                text: 'Checkbox 多选框',
                                name: 'checkbox'
                            },
                            {
                                link: '/components/cascader',
                                text: 'Cascader 级联选择',
                                name: 'cascader'
                            },
                            {
                                link: '/components/date-picker',
                                text: 'DatePicker 日期选择框',
                                name: 'date-picker'
                            },
                            {
                                link: '/components/form',
                                text: 'Form 表单',
                                name: 'form'
                            },
                            {
                                link: '/components/input-number',
                                text: 'InputNumber 数字输入框',
                                name: 'input-number'
                            },
                            {
                                link: '/components/input',
                                text: 'Input 输入框',
                                name: 'input'
                            },
                            {
                                link: '/components/mention',
                                text: 'Mention 提及',
                                name: 'mention'
                            },
                            {
                                link: '/components/rate',
                                text: 'Rate 评分',
                                name: 'rate'
                            },
                            {
                                link: '/components/radio',
                                text: 'Radio 单选框',
                                name: 'radio'
                            },
                            {
                                link: '/components/switch',
                                text: 'Switch 开关',
                                name: 'switch'
                            },
                            {
                                link: '/components/slider',
                                text: 'Slider 滑动输入条',
                                name: 'slider'
                            },
                            {
                                link: '/components/select',
                                text: 'Select 选择器',
                                name: 'select'
                            },
                            {
                                link: '/components/tree-select',
                                text: 'TreeSelect 树选择',
                                name: 'tree-select'
                            },
                            {
                                link: '/components/transfer',
                                text: 'Transfer 穿梭框',
                                name: 'transfer'
                            },
                            {
                                link: '/components/timepicker',
                                text: 'TimePicker 时间选择框',
                                name: 'timepicker'
                            },
                            {
                                link: '/components/upload',
                                text: 'Upload 上传',
                                name: 'upload'
                            }
                        ]
                    },
                    {
                        subtype: 'subside',
                        text: '数据展示',
                        leaf: [
                            {
                                link: '/components/avatar',
                                text: 'Avatar 头像',
                                name: 'avatar'
                            },
                            {
                                link: '/components/badge',
                                text: 'Badge 徽标数',
                                name: 'badge'
                            },
                            {
                                link: '/components/comment',
                                text: 'Comment 评论',
                                name: 'comment'
                            },
                            {
                                link: '/components/collapse',
                                text: 'Collapse 折叠面板',
                                name: 'collapse'
                            },
                            {
                                link: '/components/carousel',
                                text: 'Carousel 走马灯',
                                name: 'carousel'
                            },
                            {
                                link: '/components/card',
                                text: 'Card 卡片',
                                name: 'card'
                            },
                            {
                                link: '/components/calendar',
                                text: 'Calendar 日历',
                                name: 'calendar'
                            },
                            {
                                link: '/components/empty',
                                text: 'Empty 空状态',
                                name: 'empty'
                            },
                            {
                                link: '/components/list',
                                text: 'List 列表',
                                name: 'list'
                            },
                            {
                                link: '/components/popover',
                                text: 'Popover 气泡卡片',
                                name: 'popover'
                            },
                            {
                                link: '/components/statistic',
                                text: 'Statistic 统计数值',
                                name: 'statistic'
                            },
                            {
                                link: '/components/tree',
                                text: 'Tree 树形控件',
                                name: 'tree'
                            },
                            {
                                link: '/components/tooltip',
                                text: 'Tooltip 文字提示',
                                name: 'tooltip'
                            },
                            {
                                link: '/components/timeline',
                                text: 'Timeline 时间轴',
                                name: 'timeline'
                            },
                            {
                                link: '/components/tag',
                                text: 'Tag 标签',
                                name: 'tag'
                            },
                            {
                                link: '/components/tabs',
                                text: 'Tabs 标签页',
                                name: 'tabs'
                            },
                            {
                                link: '/components/table',
                                text: 'Table 表格',
                                name: 'table'
                            }
                        ]
                    },
                    {
                        subtype: 'subside',
                        text: '反馈',
                        leaf: [
                            {
                                link: '/components/alert',
                                text: 'Alert 警告提示',
                                name: 'alert'
                            },
                            {
                                link: '/components/drawer',
                                text: 'Drawer 抽屉',
                                name: 'drawer'
                            },
                            {
                                link: '/components/modal',
                                text: 'Modal 对话框',
                                name: 'modal'
                            },
                            {
                                link: '/components/message',
                                text: 'Message 全局提示',
                                name: 'message'
                            },
                            {
                                link: '/components/notification',
                                text: 'Notification 通知提醒框',
                                name: 'notification'
                            },
                            {
                                link: '/components/progress',
                                text: 'Progress 进度条',
                                name: 'progress'
                            },
                            {
                                link: '/components/popconfirm',
                                text: 'Popconfirm 气泡确认框',
                                name: 'popconfirm'
                            },
                            {
                                link: '/components/spin',
                                text: 'Spin 加载中',
                                name: 'spin'
                            },
                            {
                                link: '/components/skeleton',
                                text: 'Skeleton 骨架屏',
                                name: 'skeleton'
                            }
                        ]
                    },
                    {
                        subtype: 'subside',
                        text: '其他',
                        leaf: [
                            {
                                link: '/components/anchor',
                                text: 'Anchor 锚点',
                                name: 'anchor'
                            },
                            {
                                link: '/components/back-top',
                                text: 'BackTop 回到顶部',
                                name: 'back-top'
                            },
                            {
                                link: '/components/divider',
                                text: 'Divider 分割线',
                                name: 'divider'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    title: 'Santd'
};