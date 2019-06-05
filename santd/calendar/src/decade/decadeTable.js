/**
 * @file Santd calendar decade table file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';

const ROW = 4;
const COL = 3;

export default san.defineComponent({
    dataTypes: {
        renderFooter: DataTypes.func,
        rootPrefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        prefixCls() {
            const rootPrefixCls = this.data.get('rootPrefixCls');
            return rootPrefixCls + '-decade-panel';
        },
        decades() {
            const refresh = this.data.get('refresh');
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
        const dStartDecade = decadeData.startDecade;
        const dEndDecade = decadeData.endDecade;
        const currentYear = value.year();

        return classNames(`${prefixCls}-cell`, {
            [`${prefixCls}-selected-cell`]: dStartDecade <= currentYear && currentYear <= dEndDecade,
            [`${prefixCls}-last-century-cell`]: dStartDecade < startYear,
            [`${prefixCls}-next-century-cell`]: dEndDecade > endYear
        });
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
        <table className="{{prefixCls}}-table" cellSpacing="0" role="grid">
            <tbody className="{{prefixCls}}-tbody">
                <tr
                    s-for="decade, index in decades"
                    key="{{index}}"
                    role="row"
                >
                    <td
                        s-for="decadeData in decade"
                        role="gridcell"
                        key="{{decadeData.startDecade}}"
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
