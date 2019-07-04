import CalendarLocale from '../../calendar/src/locale/mn_MN';
import TimePickerLocale from '../../timepicker/locale/mn_MN';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Огноо сонгох',
        rangePlaceholder: ['Эхлэх огноо', 'Дуусах огноо'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
