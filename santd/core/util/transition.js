/**
 * @file san动画控制器
 * @author jinzhan@baidu.com
 *
 * 过渡动画控制器是一个包含 enter 和 leave 方法的对象。
 * 详见：https://baidu.github.io/san/tutorial/transition/
 */

/**
 * 透明度动画
 * demo：
 * san.defineComponent({
 *    template: '<div><button s-transition="opacityTransition">click</button></div>',
 *    opacityTransition: opacity()
 * });
 *
 * @param {number} steps 动画步骤，默认：20
 * @param {number} finValue 最终的透明度，默认：1
 * @return {Object} 返回一个包含 enter 和 leave 方法的对象
 * */
export function opacity(steps = 20, finValue = 1) {
    return {
        enter(el, done) {
            let currentStep = 0;

            function goStep() {
                if (currentStep >= steps) {
                    el.style.opacity = finValue;
                    done();
                    return;
                }
                el.style.opacity = (finValue / steps) * currentStep++;
                requestAnimationFrame(goStep);
            }

            goStep();
        },
        leave(el, done) {
            let currentStep = 0;

            function goStep() {
                if (currentStep >= steps) {
                    el.style.opacity = 0;
                    done();
                    return;
                }
                el.style.opacity = finValue - (finValue / steps) * currentStep++;
                requestAnimationFrame(goStep);
            }

            goStep();
        }
    };
}
