import CalendarLocale from '../../calendar/src/locale/kn_IN';
import TimePickerLocale from '../../time-picker/locale/kn_IN';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
        rangePlaceholder: ['ಪ್ರಾರಂಭ ದಿನಾಂಕ', 'ಅಂತಿಮ ದಿನಾಂಕ'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
