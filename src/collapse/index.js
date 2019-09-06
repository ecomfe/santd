/**
 * @file 组件 collapse
 * @author chenkai13 <chenkai13@baidu.com>
 */

import Collapse from './collapse';
import Panel from './panel';
import './style/index.less';

Panel.initPrefixCls(Collapse.prefixCls);
Collapse.Panel = Panel;

export default Collapse;