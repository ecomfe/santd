/**
* @file menu入口文件
* @author fuqiangqiang@baidu.com
*/
import Menu from './Menu';
import MenuSub from './SubMenu';
import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';
import MenuDivider from './Divider';

Menu.Sub = MenuSub;
Menu.Item = MenuItem;
Menu.MenuItemGroup = MenuItemGroup;
Menu.MenuDivider = MenuDivider;

export default Menu;
