/**
 * @file doc navigator
 * @author baozhixin <baoxinzhi@baidu.com>
 */

import {Component} from 'san';
import {Menu} from 'santd';

export default class Navigator extends Component {
    static template = /*html*/ `
        <template>
            <s-menu mode="inline"
                defaultOpenKeys="{{defaultOpenKeys}}"
                selectedKeys="{{selectedKeys}}"
                on-click="handleClick"
            >
                <s-sub-menu s-for="item in routes"
                    key="{{item.key}}"
                    title="{{item.name}}"
                >
                    <template s-if="item.list" s-for="listItem in item.list">
                        <s-menu-item-group
                            key="{{listItem.groupKey}}"
                            title="{{listItem.groupName}}"
                        >
                            <s-menu-item
                                s-for="leafItem in listItem.leaf"
                                key="{{leafItem.key}}"
                            >
                                <span>{{leafItem.name}}</span>
                            </s-menu-item>
                        </s-menu-item-group>
                    </template>
                    <template s-if="item.leaf">
                        <s-menu-item
                            s-for="leafItem in item.leaf"
                            key="{{'/' + item.key + '/' + leafItem.path}}"
                        >
                            <span>{{leafItem.name}}</span>
                        </s-menu-item>
                    </template>
                </s-sub-menu>
            </s-menu>
        </template>
    `;

    static components = {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-menu-item-group': Menu.MenuItemGroup
    };

    static computed = {
        defaultOpenKeys() {
            const routes = this.data.get('routes');
            return routes.map(item => item.key);
        },
        selectedKeys() {
            return [this.data.get('currentPath')];
        }
    };

    handleClick(item) {
        this.fire('redirect', item);
    }
}
