/**
 * @file Santd calendar year table file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';

const ROW = 4;
const COL = 3;

export default san.defineComponent({
    dataTypes: {
        disabledDate: DataTypes.func,
        renderFooter: DataTypes.func,
        rootPrefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        years() {
            const refresh = this.data.get('refresh');
            const startYear = this.data.get('startYear');
            const previousYear = startYear - 1;
            const years = [];
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
    },
    getContentClass(yearData) {
        const value = this.data.get('value');
        const currentYear = value.year();
        const startYear = this.data.get('startYear');
        const endYear = this.data.get('endYear');
        const prefixCls = this.data.get('prefixCls');

        return classNames(`${prefixCls}-cell`, {
            [`${prefixCls}-selected-cell`]: yearData.year === currentYear,
            [`${prefixCls}-last-decade-cell`]: yearData.year < startYear,
            [`${prefixCls}-next-decade-cell`]: yearData.year > endYear
        });
    },
    handleChooseYear(yearData) {
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
    },
    goYear(year) {
        const value = this.data.get('value').clone();
        value.add(year, 'year');
        this.data.set('value', value);
    },
    chooseYear(year) {
        const value = this.data.get('value').clone();
        value.year(year);
        value.month(this.data.get('value').month());
        this.fire('select', value);
        this.nextTick(() => {
            this.data.set('refresh', Math.random(), {force: true});
        });
    },
    template: `
        <table className="{{prefixCls}}-table" cellSpacing="0" role="grid">
            <tbody className="{{prefixCls}}-tbody">
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
});
