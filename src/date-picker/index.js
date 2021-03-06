/**
 * @file Santd datepicker
 * @author mayihui@baidu.com
 */

import './style/index';
import Calendar from '../calendar/src/calendar';
import MonthCalendar from '../calendar/src/monthCalendar';
import RangePicker from './RangePicker';
import createPicker from './CreatePicker';
import wrapPicker from './wrapPicker';
import WeekPicker from './WeekPicker';

const DatePicker = wrapPicker(createPicker(Calendar), 'date');

DatePicker.MonthPicker = wrapPicker(createPicker(MonthCalendar), 'month');
DatePicker.WeekPicker = wrapPicker(WeekPicker, 'week');
DatePicker.RangePicker = wrapPicker(RangePicker, 'date');

export default DatePicker;

