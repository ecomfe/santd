/**
 * @file header component
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import {Component} from 'san';
import {Icon, Col, Row, Menu} from 'santd';

export default class Header extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <header class="doc-header-wrapper clearfix">
            <s-row>
                <s-col xs="24" sm="24" md="5" lg="5" xl="5" xxl="4">
                    <div class="doc-logo">Santd</div>
                </s-col>
            </s-row>
        </header>
    `;

    static components = {
        's-col': Col,
        's-row': Row,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-sub-menu': Menu.Sub
    };
}
