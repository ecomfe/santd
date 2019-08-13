/**
 * @file doc content
 * @author baozhixin <baoxinzhi@baidu.com>
 */

import {Component} from 'san';

export default class Content extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <div id="content">
            <div class="markdown-section">
                {{content | raw}}
            </div>
        </div>
    `;
}
