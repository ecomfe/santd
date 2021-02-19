<text lang="cn">
#### 栅格配置器

可以简单配置几种等分栅格和间距。
</text>

```html
<template>
    <div id="components-grid-demo-config">
        <div style="margin-bottom: 16px;">
            <span style="margin-right: 6px;">Gutter（px）:</span>
            <div style="width: 50%">
                <s-slider
                    value="{{gutterKey}}"
                    on-change="handleGutterChange"
                    marks="{{gutters}}"
                    step="{{noValue}}"
                ></s-slider>
            </div>
            <span style="margin-right: 6px;">Column Count:</span>
            <div style="width: 50%">
                <s-slider
                    value="{{colCountKey}}"
                    on-change="handleColCountChange"
                    marks="{{colCounts}}"
                    step="{{noValue}}"
                ></s-slider>
            </div>
        </div>
        <s-row gutter="{{gutter}}">
            <s-col
                s-for="col in colCountArr"
                span="{{24 / colCount}}"
            >
                <div>Column</div>
            </s-col>
        </s-row>
    </div>
</template>
<script>
import {Grid, Slider} from 'santd';

export default {
    components: {
        's-col': Grid.Col,
        's-row': Grid.Row,
        's-slider': Slider
    },
    computed: {
        gutter() {
            const gutterKey = this.data.get('gutterKey');
            return this.data.get('gutters')[gutterKey];
        },
        colCount() {
            const colCountKey = this.data.get('colCountKey');
            return this.data.get('colCounts')[colCountKey];
        },
        colCountArr() {
            const colCount = this.data.get('colCount');
            const arr = [];
            for (let i = 0; i < colCount; i++) {
                arr.push(i);
            }
            return arr;
        }
    },
    initData() {
        return {
            noValue: null,
            gutterKey: 20,
            colCountKey: 40,
            gutters: {0: 8, 20: 16, 40: 24, 60: 32, 80: 40, 100: 48},
            colCounts: {0: 2, 20: 3, 40: 4, 60: 6, 80: 8, 100: 12}
        }
    },
    handleGutterChange(value) {
        this.data.set('gutterKey', value);
    },
    handleColCountChange(value) {
        this.data.set('colCountKey', value);
    }
}
</script>
```
