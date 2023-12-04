/**
 * @file Santd form util
 * @author mayihui@baidu.com
 */
import {ValidateFieldsCallback, ValidateFieldsOptions, ValidateRule} from '../interface';

type TreeType = any;
type IsLeafNodeFun = (path: string, tree: TreeType[]) => boolean;
type CallbackFun = (path: string, tree: TreeType[]) => void;


export function identity(obj: any) {
    return obj;
}

export function flattenArray<T = any>(arr: T[]) {
    return Array.prototype.concat.apply([], arr);
}

export function treeTraverse(path = '', tree: TreeType, isLeafNode: IsLeafNodeFun, errorMessage: string, callback: CallbackFun) {
    if (isLeafNode(path, tree)) {
        callback(path, tree);
    }
    else if (Array.isArray(tree)) {
        tree.forEach((subTree, index) => treeTraverse(
            `${path}[${index}]`,
            subTree,
            isLeafNode,
            errorMessage,
            callback
        ));
    }
    else { // It's object and not a leaf node
        if (typeof tree !== 'object') {
            return;
        }
        Object.keys(tree).forEach(subTreeKey => {
            const subTree = tree[subTreeKey];
            treeTraverse(
                `${path}${path ? '.' : ''}${subTreeKey}`,
                subTree,
                isLeafNode,
                errorMessage,
                callback
            );
        });
    }
}
// 待确定类型
export function flattenFields(maybeNestedFields: unknown, isLeafNode: IsLeafNodeFun, errorMessage: string) {
    const fields: Record<string, any> = {};
    treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, (path, node) => {
        fields[path] = node;
    });
    return fields;
}

export function normalizeValidateRules(validate: ValidateRule[], rules?: RuleItem[], validateTrigger?: string | string[]) {
    const validateRules = validate.map(item => {
        const newItem = {
            ...item,
            trigger: item.trigger || []
        };
        if (typeof newItem.trigger === 'string') {
            newItem.trigger = [newItem.trigger];
        }
        return newItem;
    });
    if (rules) {
        validateRules.push({
            trigger: validateTrigger ? ([] as string[]).concat(validateTrigger) : [],
            rules
        });
    }
    return validateRules;
}

export function getValidateTriggers(validateRules: ValidateRule[]) {
    return (validateRules
        .filter(item => !!item.rules && item.rules.length)
        .map(item => item.trigger) as Array<string | string[]>)
        .reduce((pre: string[], curr) => pre?.concat(curr), []);
}

export function getValueFromEvent(e: Event) {
    // To support custom element
    if (!e || !e.target) {
        return e;
    }
    const target = e.target as HTMLFormElement;
    return target.type === 'checkbox' ? target.checked : target.value;
}

export function getErrorStrs(errors: ValidateError[]) {
    if (errors) {
        return errors.map(e => {
            if (e && e.message) {
                return e.message;
            }
            return e;
        });
    }
    return errors;
}

export function getParams(
    ns?: string[] | ValidateFieldsOptions | ValidateFieldsCallback,
    opt?: ValidateFieldsOptions | ValidateFieldsCallback,
    cb?: ValidateFieldsCallback
) {
    let names = ns;
    let options = opt;
    let callback: ValidateFieldsCallback | undefined = cb;
    if (cb === undefined) {
        if (typeof names === 'function') {
            callback = names as ValidateFieldsCallback;
            options = {};
            names = undefined;
        }
        else if (Array.isArray(names)) {
            if (typeof options === 'function') {
                callback = options as ValidateFieldsCallback;
                options = {};
            }
            else {
                options = options || {};
            }
        }
        else {
            callback = options as ValidateFieldsCallback;
            options = names || {};
            names = undefined;
        }
    }

    return {
        names,
        options,
        callback
    } as {
        names: string[] | undefined;
        options: ValidateFieldsOptions | undefined;
        callback: ValidateFieldsCallback | undefined
    };
}

export function isEmptyObject(obj: Record<string, any>) {
    return Object.keys(obj).length === 0;
}

export function hasRules(validate?: ValidateRule[]) {
    if (validate) {
        return validate.some(item => item.rules && item.rules.length);
    }
    return false;
}

export function startsWith(str: string, prefix: string) {
    return str.lastIndexOf(prefix, 0) === 0;
}

export function getComputedStyle<T extends Element>(el: T, prop: string) {
    const getComputedStyle = window.getComputedStyle;
    const style = getComputedStyle
        ? getComputedStyle(el)
        // @ts-ignore
        : el.currentStyle;
    if (style) {
        return style[prop.replace(/-(\w)/gi, (_word, letter) => letter.toUpperCase())];
    }
    return undefined;
}

export function getScrollableContainer(node: Element) {
    let currentNode = node;
    let nodeName;
    while ((nodeName = currentNode.nodeName.toLowerCase()) !== 'body') {
        const overflowY = getComputedStyle(currentNode, 'overflowY');
        if (currentNode !== node
            && (overflowY === 'auto' || overflowY === 'scroll')
            && currentNode.scrollHeight > currentNode.clientHeight) {
            return currentNode;
        }
        currentNode = currentNode.parentNode as Element;
    }
    return nodeName === 'body' ? currentNode.ownerDocument : currentNode;
}
