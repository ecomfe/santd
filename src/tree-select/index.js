/**
 * @file tree-select 树选中组件
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import {SHOW_ALL, SHOW_PARENT, SHOW_CHILD} from './treeStrategies';
import TreeSelect from './tree-select';
import TreeNode from '../tree/treeNode';

TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;

export default TreeSelect;
