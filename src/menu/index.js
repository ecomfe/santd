/**
* @file menu入口文件
* @author fuqiangqiang@baidu.com
*/
import Menu from './menu';
import MenuSub from './subMenu';
import MenuItem from './menuItem';
import MenuItemGroup from './menuItemGroup';
import MenuDivider from './divider';

Menu.Sub = MenuSub;
Menu.Item = MenuItem;
Menu.MenuItemGroup = MenuItemGroup;
Menu.MenuDivider = MenuDivider;

export default Menu;
