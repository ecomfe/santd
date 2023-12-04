import CalendarLocale from '../../calendar/src/locale/ar_EG';
import TimePickerLocale from '../../time-picker/locale/ar_EG';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);


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
