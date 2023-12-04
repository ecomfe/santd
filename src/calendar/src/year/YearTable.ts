/**
 * @file Santd calendar year table file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';

const ROW = 4;
const COL = 3;

export default class YearTable extends Base<I.YearTableState, I.YearTableProps, I.YearTableComputed>{
    static computed: I.YearTableComputed = {
        years(this: YearTable) {
            const startYear = this.data.get('startYear');
            const previousYear = startYear - 1;
            const years: I.YearTableItemType[][] = [];
            let index = 0;
            for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
                years[rowIndex] = [];
                for (let colIndex = 0; colIndex < COL; colIndex++) {
                    const year = previousYear + index;
                    const content = String(year);
                    years[rowIndex][colIndex] = {
                        content,
                        year,
                        title: content
                    };
                    index++;
                }
            }
            return years;
        }
    };
    getContentClass(yearData: I.YearTableItemType): string[] {
        const value = this.data.get('value');
        const currentYear = value.year();
        const startYear = this.data.get('startYear');
        const endYear = this.data.get('endYear');
        const prefixCls = this.data.get('prefixCls');

        let classArr = [`${prefixCls}-cell`];
        yearData.year === currentYear && classArr.push(`${prefixCls}-selected-cell`);
        yearData.year < startYear && classArr.push(`${prefixCls}-last-decade-cell`);
        yearData.year > endYear && classArr.push(`${prefixCls}-next-decade-cell`);
        return classArr;
    }
    handleChooseYear(yearData: I.YearTableItemType): void {
        const startYear = this.data.get('startYear');
        const endYear = this.data.get('endYear');

        if (yearData.year < startYear) {
            this.goYear(-10);
        }
        else if (yearData.year > endYear) {
            this.goYear(10);
        }
        else {
            this.chooseYear(yearData.year);
        }
    };
    goYear(year: number): void {
        const value = this.data.get('value').add(year, 'year');
        this.data.set('value', value);
    };
    chooseYear(year: number): void {
        const value = this.data.get('value').year(year).month(this.data.get('value').month());
        this.fire('select', value);
        this.nextTick(() => {
            this.data.set('refresh', Math.random());
        });
    };
    static template = /* html */ `
        <table class="{{prefixCls}}-table" cellSpacing="0" role="grid">
            <tbody class="{{prefixCls}}-tbody">
                <tr
                    s-for="year, index in years"
                    key="{{index}}"
                    role="row"
                >
                    <td
                        s-for="yearData in year"
                        role="gridcell"
                        key="{{yearData.content}}"
                        title="{{yearData.title}}"
                        class="{{getContentClass(yearData)}}"
                        on-click="handleChooseYear(yearData)"
                    >
                        <a class="{{prefixCls}}-year">{{yearData.content}}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `
};
