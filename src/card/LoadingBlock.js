/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import {Col, Row} from '../grid';

const prefix = classCreator('card')('loading');

export default san.defineComponent({
    template: `
    	<div
            class="${prefix}-content"
        >
            <s-row gutter="8">
                <s-col span="22">
                    <div class="${prefix}-block" />
                </s-col>
            </s-row>
            <s-row gutter="8">
                <s-col span="8">
                    <div class="${prefix}-block" />
                </s-col>
                <s-col span="15">
                    <div class="${prefix}-block" />
                </s-col>
            </s-row>
            <s-row gutter="8">
                <s-col span="6">
                    <div class="${prefix}-block" />
                </s-col>
                <s-col span="18">
                    <div class="${prefix}-block" />
                </s-col>
            </s-row>
            <s-row gutter="8">
                <s-col span="13">
                    <div class="${prefix}-block" />
                </s-col>
                <s-col span="9">
                    <div class="${prefix}-block" />
                </s-col>
            </s-row>
            <s-row gutter="8">
                <s-col span="4">
                    <div class="${prefix}-block" />
                </s-col>
                <s-col span="3">
                    <div class="${prefix}-block" />
                </s-col>
                <s-col span="16">
                    <div class="${prefix}-block" />
                </s-col>
            </s-row>
            <s-row gutter="8">
                <s-col span="8">
                    <div class="${prefix}-block" />
                </s-col>
                <s-col span="6">
                    <div class="${prefix}-block" />
                </s-col>
                <s-col span="8">
                    <div class="${prefix}-block" />
                </s-col>
            </s-row>
        </div>
    `,
    components: {
        's-row': Row,
        's-col': Col
    }
});
