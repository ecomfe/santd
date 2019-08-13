/**
 * @file doc navigator
 * @author baozhixin <baoxinzhi@baidu.com>
 */

import {Component} from 'san';
import {Menu} from 'santd';

export default class Navigator extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <div>
            <s-menu mode="inline"
                defaultOpenKeys="{{defaultOpenKeys}}"
                on-click="onClick"
            >
                <s-sub-menu s-for="item in routes" key="{{item.key}}">
                    <span slot="title">{{item.name}}</span>
                    <s-menu-item
                        s-for="subitem in item.list"
                        key="{{'/' + item.key + '/' + subitem.path}}"
                    >
                        <span>{{subitem.name}}</span>
                    </s-menu-item>
                </s-sub-menu>
            </s-menu>
        </div>
    `;

    static components = {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item
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

    onClick(item) {
        this.fire('redirect', item);
    }
}
