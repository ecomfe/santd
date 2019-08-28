/**
 * @file Santd form createFormField
 * @author mayihui@baidu.com
 **/

class Field {
    constructor(fields) {
        Object.assign(this, fields);
    }
}

export function isFormField(field) {
    return field instanceof Field;
}

export default function createFormField(field) {
    if (isFormField(field)) {
        return field;
    }
    return new Field(field);
}
