/**
 * @file Santd inherits file
 * @author mayihui@baidu.com
 **/



export default function (subClass, superClass) {

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