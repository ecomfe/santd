/**
 * @file 组件 ScrollNumber
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';

let numberList = [];
for (let i = 0; i < 30; i++) {
    numberList.push(i % 10);
}

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        count: DataTypes.oneOfType([DataTypes.string, DataTypes.object, DataTypes.number]),
        title: DataTypes.oneOfType([DataTypes.string, DataTypes.object, DataTypes.number])
    },
    template: `
        <sup class="{{prefixCls}}" title="{{title}}">
            <template s-if="isOverflow">
                {{count}}
            </template>
            <span
                s-elif="numberArray.length"
                s-for="num, idx in numberArray"
                class="{{prefixCls}}-only"
                style="{{styleArr[idx]}};"
            >
                <p s-for="item in numberList">{{item}}</p>
            </span>
        </sup>
    `,
    computed: {
        isOverflow() {
            let count = +this.data.get('count');
            return !count || isNaN(count);
        },

        numberArray() {
            let num = this.data.get('count');
            return num != null ? num.toString().split('').map(i => Number(i)) : [];
        },

        posArray() {
            let numArr = this.data.get('numberArray');
            let resArr = [];
            for (let i in numArr) {
                resArr.push(10 + numArr[i]);
            }
            return resArr;
        }
    },

    getStyleArr() {
        let posArray = this.data.get('posArray');
        let styleArr = [];
        for (let i in posArray) {
            let pos = posArray[i];
            let style = `transform: translateY(${pos * -100}%);`;
            styleArr.push(style);
        }
        return styleArr;
    },

    initData() {
        return {
            numberList,
            count: null,
            overflowCount: 99
        };
    },

    updateStyle() {
        if (!this.animated) {
            this.nextTick(() => {
                requestAnimationFrame(() => {
                    this.data.set('styleArr', this.getStyleArr());
                    this.nextTick(() => {
                        this.animated = true;
                    });
                });
                this.animated = false;
            });
        }
    },

    inited() {
        this.data.set('styleArr', this.getStyleArr());
    },

    updated() {
        this.updateStyle();
    }
});