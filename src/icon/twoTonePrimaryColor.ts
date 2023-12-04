/**
 * @file Santd icon twoTonePrimaryColor
 * @author mayihui@baidu.com
 **/

import icon from './Icon';

export function setTwoToneColor(primaryColor: string) {
    return icon.setTwoToneColors({
        primaryColor
    });
}

export function getTwoToneColor() {
    const colors = icon.getTwoToneColors();
    return colors.primaryColor;
}
