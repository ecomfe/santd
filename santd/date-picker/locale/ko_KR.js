import CalendarLocale from '../../calendar/src/locale/ko_KR';
import TimePickerLocale from '../../timepicker/locale/ko_KR';

// Merge into a locale object
export default {
    lang: {
        placeholder: '날짜 선택',
        rangePlaceholder: ['시작일', '종료일'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
