/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import Typography from './typography';
import Base from './base';
import Title from './title';

Typography.Text = Base.create('text');
Typography.Title = Title;
Typography.Paragraph = Base.create('paragraph');

export default Typography;
