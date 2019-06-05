/**
 * @file Santd icon twoTonePrimaryColor
 * @author mayihui@baidu.com
 **/

import icon from './icon';

export function setTwoToneColor(primaryColor) {
    return icon.setTwoToneColors({
        primaryColor
    });
}

export function getTwoToneColor() {
    const colors = icon.getTwoToneColors();
    return colors.primaryColor;
}
