/**
 * @file Santd locale provider language file
 **/

import Pagination from '../pagination/locale/en_US';
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';
import Calendar from '../calendar/locale/en_US';

export default {
    locale: 'en',
    Pagination,
    DatePicker,
    TimePicker,
    Calendar,
    global: {
        placeholder: 'Please select'
    },
    Table: {
        filterTitle: 'Filter menu',
        filterConfirm: 'OK',
        filterReset: 'Reset',
        selectAll: 'Select current page',
        selectInvert: 'Invert current page',
        sortTitle: 'Sort'
    },
    Modal: {
        okText: 'OK',
        cancelText: 'Cancel',
        justOkText: 'OK'
    },
    Popconfirm: {
        okText: 'OK',
        cancelText: 'Cancel'
    },
    Transfer: {
        titles: ['', ''],
        searchPlaceholder: 'Search here',
        itemUnit: 'item',
        itemsUnit: 'items'
    },
    Upload: {
        uploading: 'Uploading...',
        removeFile: 'Remove file',
        uploadError: 'Upload error',
        previewFile: 'Preview file'
    },
    Empty: {
        description: 'No Data'
    },
    Icon: {
        icon: 'icon'
    },
    Text: {
        edit: 'edit',
        copy: 'copy',
        copied: 'copy success',
        expand: 'expand'
    },
    PageHeader: {
        back: 'back'
    }
};
