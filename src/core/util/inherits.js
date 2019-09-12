/**
 * @file Santd inherits file
 * @author mayihui@baidu.com
 **/

function extend(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            let value = source[key];
            if (typeof value !== 'undefined') {
                target[key] = value;
            }
        }
    }

    return target;
}

export default function (subClass, superClass) {
    /*const subClassProto = subClass.prototype;

    let F = new Function();
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    extend(subClass.prototype, subClassProto);*/

    const newSubClassProto = subClass.prototype;
    for (let i in superClass.prototype) {
        if (superClass.prototype.hasOwnProperty(i) && i !== 'constructor') {
            const newProto = newSubClassProto[i];
            const superProto = superClass.prototype[i];
            if (typeof superProto === 'function') {
                newSubClassProto[i] = function (...args) {
                    const superProtoValue = superProto && superProto.bind(this)(...args);
                    const newProtoValue = newProto && newProto.bind(this)(...args);
                    if (Object.prototype.toString.call(superProtoValue) === '[object Object]') {
                        return {
                            ...superProtoValue,
                            ...newProtoValue
                        };
                    }
                    return newProtoValue || superProtoValue;
                };
            }
            else if (typeof newProto === 'object') {
                newSubClassProto[i] = {
                    ...superProto,
                    ...newProto
                };
            }
            else {
                newSubClassProto[i] = superProto;
            }
        }
    }
    return subClass;
}
