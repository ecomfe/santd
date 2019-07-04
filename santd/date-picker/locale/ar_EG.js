import CalendarLocale from '../../calendar/src/locale/ar_EG';
import TimePickerLocale from '../../timepicker/locale/ar_EG';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'اختيار التاريخ',
        rangePlaceholder: ['البداية', 'النهاية'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    },
    dateFormat: 'DD-MM-YYYY',
    monthFormat: 'MM-YYYY',
    dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
    weekFormat: 'wo-YYYY'
};
