/**
 * @file Santd date picker locale file
 **/

import CalendarLocale from '../../calendar/src/locale/en_US';
import TimePickerLocale from '../../timepicker/locale/en_US';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Select date',
        rangePlaceholder: ['Start date', 'End date'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
