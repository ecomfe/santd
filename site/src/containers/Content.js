/**
 * @file doc content
 * @author baozhixin <baoxinzhi@baidu.com>
 */

import {Component} from 'san';

export default class Content extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <article class="{{content ? 'markdown' : ''}}">
            <div class="markdown-section">
                {{content | raw}}
            </div>
            <div id="content"></div>
        </article>
    `;
}
