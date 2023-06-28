/**
 * @file Santd form createFormField
 * @author mayihui@baidu.com
 **/

/* eslint-disable @typescript-eslint/no-extraneous-class */
class Field {
/* eslint-enable @typescript-eslint/no-extraneous-class */
    constructor(fields: Record<string, any>) {
        Object.assign(this, fields);
    }
}

export function isFormField(field: any) {
    return field instanceof Field;
}

export default function createFormField(field: any): Field {
    if (isFormField(field)) {
        return field;
    }
    return new Field(field);
}
