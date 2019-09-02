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
                s-elif="numberStyles.length"
                s-for="numStyle, idx in numberStyles trackBy idx"
                class="{{prefixCls}}-only"
                style="{{numStyle}};"
            >
                <p s-for="item in numberList">{{item}}</p>
            </span>
        </sup>
    `,

    computed: {
        isOverflow() {
            let count = +this.data.get('count');
            return !count;
        },

        numberStyles() {
            let results = [];

            // 简单点，就不依赖 isOverflow 了
            let count = +this.data.get('count');
            if (count) {
                let nums = count.toString().split('');

                for (let i = 0; i < nums.length; i++) {
                    let num = +nums[i];
                    results.push('transform: translateY(' + ((10 + num) * -100) + '%);');
                }
            }
            
            return results;
        }
    },

    getStyleArr() {
        let numberArray = this.data.get('numberArray');
        let styleArr = [];

        if (numberArray) {
            for (let i = 0; i < numberArray.length; i++) {
                let num = numberArray[i];
                styleArr.push('transform: translateY(' + ((10 + num) * -100) + '%);');
            }
        }

        return styleArr;
    },

    initData() {
        return {
            numberList
        };
    }
});