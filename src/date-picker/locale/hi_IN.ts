import CalendarLocale from '../../calendar/src/locale/hi_IN';
import TimePickerLocale from '../../time-picker/locale/hi_IN';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'तारीख़ चुनें',
        rangePlaceholder: ['प्रारंभ तिथि', 'समाप्ति तिथि'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
