import CalendarLocale from '../../calendar/src/locale/fa_IR';
import TimePickerLocale from '../../timepicker/locale/fa_IR';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'انتخاب تاریخ',
        rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
