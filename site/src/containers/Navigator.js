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
                <template s-for="item in routes">
                    <s-sub-menu
                        s-if="item.list || item.leaf"
                        key="{{item.key}}"
                    >
                        <div slot="title">{{item.name}}<span class="chinese">{{count}}</span></div>
                        <s-menu-item-group
                            s-if="item.list"
                            s-for="listItem in item.list"
                            key="{{listItem.groupKey}}"
                            title="{{listItem.groupName}}"
                        >
                            <s-menu-item
                                s-for="leafItem in listItem.leaf"
                                key="{{leafItem.key}}"
                            >
                                <span>{{leafItem.name}}</span>
                                <span class="chinese">{{leafItem.text}}</span>
                            </s-menu-item>
                        </s-menu-item-group>
                        <s-menu-item
                            s-if="item.leaf"
                            s-for="leafItem in item.leaf"
                            key="{{'/' + item.key + '/' + leafItem.path}}"
                        >
                            <span>{{leafItem.name}}</span>
                        </s-menu-item>
                    </s-sub-menu>
                    <s-menu-item s-else key="{{item.key}}" title="{{item.name}}">
                        <span>{{item.name}}</span>
                    </s-menu-item>
                </template>
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
        },
        count() {
            let routes = this.data.get('routes').filter(route => route.list);
            let count = 0;
            routes.forEach(route => {
                route.list.forEach(r => {
                    count += r.leaf.length;
                });
            });

            return count;
        }
    };

    handleClick(item) {
        this.fire('redirect', item);
    }
}
