/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */
import BaseComp from 'santd/base';
import Base from './Base';
import Title, {TTitle} from './Title';
import {classCreator} from '../core/util';

type ReturnTypeOfCreate = ReturnType<typeof Base['create']>;

const prefixCls = classCreator('typography')();

class Typography extends BaseComp {
    static template = `
        <article class="${prefixCls}"><slot /></article>
    `
    static Text: ReturnTypeOfCreate;
    static Paragraph: ReturnTypeOfCreate;
    static Title: TTitle

}

Typography.Text = Base.create('text');
Typography.Title = Title;
Typography.Paragraph = Base.create('paragraph');

export default Typography;