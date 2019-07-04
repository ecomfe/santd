import CalendarLocale from '../../calendar/src/locale/th_TH';
import TimePickerLocale from '../../timepicker/locale/th_TH';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'เลือกวันที่',
        rangePlaceholder: ['วันเริ่มต้น', 'วันสิ้นสุด'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
