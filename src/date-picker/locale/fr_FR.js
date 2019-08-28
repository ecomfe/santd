import CalendarLocale from '../../calendar/src/locale/fr_FR';
import TimePickerLocale from '../../timepicker/locale/fr_FR';

// Merge into a locale object
export default {
    lang: {
        placeholder: 'Sélectionner une date',
        rangePlaceholder: ['Date de début', 'Date de fin'],
        ...CalendarLocale
    },
    timePickerLocale: {
        ...TimePickerLocale
    }
};
