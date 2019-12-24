/**
 * @file Santd cascader array tree filter file
 **/

export default (data, filterFn, options = {}) => {
    options.childrenKeyName = options.childrenKeyName || 'children';
    let children = data || [];
    let result = [];
    let level = 0;
    do {
        let foundItem = children.filter(item => filterFn(item, level))[0];
        if (!foundItem) {
            break;
        }
        result.push(foundItem);
        children = foundItem[options.childrenKeyName] || [];
        level += 1;
    } while (children.length > 0);
    return result;
};
