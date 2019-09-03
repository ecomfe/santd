import san from 'san';
import Radio from 'santd/radio';
import Icon from 'santd/icon';
import Input from 'santd/input';
import manifest from 'santd/core/svgIcons/lib/manifest';
import {FilledIcon, OutlinedIcon, TwoToneIcon} from './themeIcons';
import {categories} from './fields';

import './index.less';

const themeTypeMapper = {
    filled: 'fill',
    outlined: 'outline',
    twoTone: 'twotone'
};

export default san.defineComponent({
    components: {
        's-radio': Radio,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button,
        's-icon': Icon,
        's-inputsearch': Input.Search,
        's-outlinedicon': OutlinedIcon,
        's-filledicon': FilledIcon,
        's-twotoneicon': TwoToneIcon
    },
    initData() {
        return {
            theme: 'outlined',
            searchKey: '',
            categoryMap: {
                direction: '方向性图标',
                suggestion: '提示建议性图标',
                editor: '编辑类图标',
                data: '数据类图标',
                logo: '品牌和标识',
                other: '网站通用图标'
            }
        };
    },
    computed: {
        list() {
            const theme = this.data.get('theme');
            return Object.keys(categories).map(category => {
                return {
                    category,
                    icons: (categories[category] || []).filter(name => {
                        return manifest[themeTypeMapper[theme]].indexOf(name) !== -1;
                    })
                };
            }).filter(({icons}) => Boolean(icons.length));
        },
        categories() {
            const list = this.data.get('list');
            const searchKey = this.data.get('searchKey');
            const theme = this.data.get('theme');

            const otherIcons = categories.all.filter(icon => {
                return list.filter(({category}) => category !== 'all')
                    .every(item => !item.icons.includes(icon));
            });

            return list.filter(({category}) => category !== 'all')
                .concat({category: 'other', icons: otherIcons})
                .map(({category, icons}) => {
                    return {
                        category,
                        icons: icons.filter(name => name.includes(searchKey))
                            .filter(name => manifest[themeTypeMapper[theme]].includes(name))
                    };
                }).filter(({icons}) => !!icons.length);
        }
    },
    handleChangeTheme(e) {
        this.data.set('theme', e.target.value);
    },
    handleSearchIcon(value) {
        this.data.set('searchKey', value);
    },
    template: `<div>
        <div style="display: flex; justify-content: space-between">
            <s-radiogroup value="{{theme}}" size="large" buttonStyle="solid" on-change="handleChangeTheme" name="type">
                <s-radiobutton value="outlined">
                    <s-icon><s-outlinedicon slot="component" /></s-icon> 线框风格
                </s-radiobutton>
                <s-radiobutton value="filled">
                    <s-icon><s-filledicon slot="component" /></s-icon> 实底风格
                </s-radiobutton>
                <s-radiobutton value="twoTone">
                    <s-icon><s-twotoneicon slot="component" /></s-icon> 双色风格
                </s-radiobutton>
            </s-radiogroup>
            <s-inputsearch
                placeholder="在此搜索图标"
                style="margin-left: 10px; flex: 1"
                on-change="handleSearchIcon"
                size="large"
            />
        </div>
        <div s-for="category in categories">
            <h3 style="margin-top: 20px;">{{categoryMap[category.category]}}</h3>
            <ul class="sanicons-list">
                <li s-for="icon in category.icons">
                    <s-icon type="{{icon}}" theme="{{theme}}" />
                    <span class="san-icon-class">
                        {{icon}}
                    </span>
                </li>
            </ul>
        </div>
    </div>`
});
