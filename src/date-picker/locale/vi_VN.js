import CalendarLocale from '../../calendar/src/locale/vi_VN';
import TimePickerLocale from '../../timepicker/locale/vi_VN';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Chọn thời điểm',
        rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
