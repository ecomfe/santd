/**
 * @file Santd calendar decade table file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

const ROW = 4;
const COL = 3;

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        decades() {
            const startYear = this.data.get('startYear');
            const preYear = startYear - 10;
            const decades = [];
            let index = 0;

            for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
                decades[rowIndex] = [];
                for (let colIndex = 0; colIndex < COL; colIndex++) {
                    const startDecade = preYear + index * 10;
                    const endDecade = preYear + index * 10 + 9;
                    decades[rowIndex][colIndex] = {
                        startDecade,
                        endDecade
                    };
                    index++;
                }
            }
            return decades;
        }
    },
    getContentClass(decadeData) {
        const {
            prefixCls,
            value,
            startYear,
            endYear
        } = this.data.get();
        const {
            startDecade,
            endDecade
        } = decadeData;
        const currentYear = value.year();

        let classArr = [`${prefixCls}-cell`];
        startDecade <= currentYear && currentYear <= endDecade && classArr.push(`${prefixCls}-selected-cell`);
        startDecade < startYear && classArr.push(`${prefixCls}-last-century-cell`);
        endDecade > endYear && classArr.push(`${prefixCls}-next-century-cell`);
        return classArr;
    },
    handleChooseCentury(decadeData) {
        const startYear = this.data.get('startYear');
        const endYear = this.data.get('endYear');

        if (decadeData.year < startYear) {
            this.goYear(-100);
        }
        else if (decadeData.year > endYear) {
            this.goYear(100);
        }
        else {
            this.chooseDecade(decadeData.startDecade);
        }
    },
    goYear(year) {
        const value = this.data.get('value').clone();
        value.add(year, 'year');
        this.data.set('value', value);
    },
    chooseDecade(year) {
        const value = this.data.get('value').clone();
        value.year(year);
        value.month(this.data.get('value').month());
        this.fire('select', value);
        this.nextTick(() => {
            this.data.set('refresh', Math.random(), {force: true});
        });
    },
    template: `
        <table class="{{prefixCls}}-table" cellSpacing="0" role="grid">
            <tbody class="{{prefixCls}}-tbody">
                <tr
                    s-for="decade, index in decades"
                    role="row"
                >
                    <td
                        s-for="decadeData in decade"
                        role="gridcell"
                        class="{{getContentClass(decadeData)}}"
                        on-click="handleChooseCentury(decadeData)"
                    >
                        <a class="{{prefixCls}}-decade">{{decadeData.startDecade}}-{{decadeData.endDecade}}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `
});
