<text lang="cn">
#### 倒计时
倒计时组件。
</text>

```html
<template>
  <div>
    <s-row gutter="{{16}}">
        <s-col span="{{12}}">
            <s-countdown
                title="Countdown" value="{{deadline}}" on-finish="handleFinish"/>
        </s-col>
        <s-col span="{{12}}">
            <s-countdown
                title="Million Seconds" value="{{deadline}}" format="HH:mm:ss:SSS"/>
        </s-col>
        <s-col span="{{24}}" style="margin-top: 32px">
            <s-countdown
                title="Day Level" value="{{deadline}}" format="D 天 H 时 m 分 s 秒"/>
        </s-col>
    </s-row>
  </div>
</template>
<script>
import {Statistic, Col, Row} from 'santd';

export default {
    components: {
        's-statistic': Statistic,
        's-countdown': Statistic.Countdown,
        's-col': Col,
        's-row': Row
    },
    initData() {
        return {
            deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30
        };
    },
    handleFinish() {
        console.log('on-finish');
    }
}
</script>
```