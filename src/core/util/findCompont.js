/**
* @file 获得组件间关系
* @author fuqiangqiang@baidu.com
*/

// 向上寻找目标组件是否存在，查找并返回目标组件
export const findComponentUpward = (context, componentName, componentNames) => {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }
    let parent = context.parent;
    let name = parent && parent.data && parent.data.get('componentPropName') || '';
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.parent;
        if (parent) {
            name = parent.data && parent.data.get('componentPropName') || '';
        }
    }
    return parent;

};
// 向上找到所有的目标组件，查找并放在数组中返回
export const findAllCompUpward = (context, componentName) => {
    let targetComponent = [];
    function findAll(context, componentName) {
        let parent = context.parentComponent || context.parent;
        let propName = parent && parent.data && parent.data.get('componentPropName') || '';
        if (parent && componentName === propName) {
            targetComponent.push(parent);
        }
        if (parent) {
            findAll(parent, componentName);
        }
        return targetComponent;
    }
    return findAll(context, componentName);
};

// 找到目标组件是在第几层
export const findComponentsLevel = (context, componentName) => {
    let parents = [];
    let parent = context.parent;
    if (parent) {
        let propName = parent && parent.data && parent.data.get('componentPropName') || '';
        if (propName === componentName) {
            parents.push(parent);
        }
        return parents.concat(findComponentsLevel(parent, componentName));
    } else {
        return [];
    }
};
// 向下找到第一层组件
export const findOneLevelItem = (children, componentName) => {
    let oneLevels = [];
    function levelItem(children, componentName) {
        children.forEach(item => {
            const itemName = item.data && item.data.get('componentPropName') || '';
            if (itemName === componentName) {
                oneLevels.push(item);
            }
        });
        return oneLevels;
    }
    return levelItem(children, componentName);
};
// 向下寻找目标组件
export const loopMenuItem = (children, componentName, defaultKeys) => {
    let targetMenuList = [];
    function childLoop(children, componentName, defaultKeys) {
        if (!children) {
            return;
        }
        children.forEach(item => {
            let childName = item.data && item.data.get('componentPropName') || '';
            if (childName !== componentName) {
                let childrenSlot = item.slotChildren && item.slotChildren.length ? item.slotChildren : item.children;
                childLoop(childrenSlot, componentName, defaultKeys);
            } else if (defaultKeys === item.data.get('key')) {
                // 对应上了
                targetMenuList.push(item);
                return false;
            }
        });
        return targetMenuList;
    }
    return childLoop(children, componentName, defaultKeys);
};

// 找到下面所有的目标组件，放到数组中
export const loopComponentList = (children, componentName, noslot = null) => {
    let loopList = [];
    function childLoop(children, componentName, noslot) {
        if (!children) {
            return false;
        }
        children.forEach(item => {
            let childName = item.data && item.data.get('componentPropName') || '';
            if (childName !== componentName) {
                // 有,但并不是要找的那个
                let childrenSlot
                if (noslot) {
                    childrenSlot = item.children;
                } else {
                    childrenSlot = item.slotChildren && item.slotChildren.length ? item.slotChildren : item.children;
                }
                childLoop(childrenSlot, componentName, noslot);
            } else {
                loopList.push(item);
            }
        });
        return loopList;
    }
    return childLoop(children, componentName, noslot);
};

// 向下递归所有的目标组件，包括所有的子孙组件
export const recursiveAllComponents = (children, componentName) => {
    let loopList = [];
    function childLoop(children, componentName) {
        if (!children) {
            return false;
        }
        children.forEach(item => {
            let childName = item.data && item.data.get('componentPropName') || '';
            if (childName !== componentName) {
                // 有,但并不是要找的那个
                let childrenSlot = item.slotChildren && item.slotChildren.length ? item.slotChildren : item.children;
                childLoop(childrenSlot, componentName);
            } else {
                loopList.push(item);
                let childrenSlot = item.slotChildren && item.slotChildren.length ? item.slotChildren : item.children;
                if (childrenSlot) {
                    childLoop(childrenSlot, componentName);
                }
            }
        });
        return loopList;
    }
    return childLoop(children, componentName);
}
