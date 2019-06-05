/**
 * @file 组件 transfer
 * @author chenkai13 <chenkai13@baidu.com>
 */
// TODO: empty组件没有 目前直接用的base64图片
import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import checkbox from 'santd/checkbox';
import button from 'santd/button';
import icon from 'santd/icon';
import transList from './transList';

const cc = classCreator('transfer');
const prefix = cc();
export default san.defineComponent({
    dataTypes: {
        className: DataTypes.string,
        dataSource: DataTypes.arrayOf(DataTypes.object),
        disabled: DataTypes.bool,
        filterOption: DataTypes.func,
        listStyle: DataTypes.object,
        operations: DataTypes.arrayOf(DataTypes.string),
        render: DataTypes.func,
        selectedKeys: DataTypes.arrayOf(DataTypes.string),
        showSearch: DataTypes.bool,
        targetKeys: DataTypes.arrayOf(DataTypes.string),
        titles: DataTypes.arrayOf(DataTypes.string)
    },
    template: `
        <div class="{{cls}}">
            <s-translist
                title="{{titles[0]}}"
                direction="left"
                sourceList="{{sourceList}}"
                disabled="{{disabled}}"
                showFooter="{{showFooter}}"
                listStyle="{{listStyle}}"
                showSearch="{{showSearch}}"
                filterOption="{{filterOption}}"
                render="{{render}}">
                <slot name="footer" slot="footer"/>
            </s-translist>
            <div class="${prefix}-operation">
                <s-button type="primary" size="small"
                    on-click="handleTrans('right')" disabled="{{rightDisabled}}">
                    <s-icon type="right"/> {{operations[0]}}
                </s-button>
                <s-button type="primary" size="small"
                    on-click="handleTrans('left')" disabled="{{leftDisabled}}">
                    <s-icon type="left"/> {{operations[1]}}
                </s-button>
            </div>
            <s-translist
                title="{{titles[1]}}"
                sourceList="{{targetList}}"
                direction="right"
                disabled="{{disabled}}"
                showFooter="{{showFooter}}"
                listStyle="{{listStyle}}"
                showSearch="{{showSearch}}"
                filterOption="{{filterOption}}"
                render="{{render}}">
                <slot name="footer" slot="footer"/>
            </s-translist>
        </div>
    `,
    initData() {
        return {
            titles: ['', ''],
            rightDisabled: true,
            leftDisabled: true,
            operations: ['', ''],
            disabled: false,
            render: item => item.title
        };
    },
    components: {
        's-checkbox': checkbox,
        's-button': button,
        's-icon': icon,
        's-translist': transList
    },
    computed: {
        cls() {
            const className = this.data.get('className');
            const disabled = this.data.get('disabled');
            return classNames(prefix, className, {
                [`${prefix}-disabled`]: disabled
            });
        },
        sourceList() {
            const source = this.data.get('dataSource');
            const targetKeys = this.data.get('targetKeys');
            return source.filter(item => !targetKeys.includes(item.key));
        },
        targetList() {
            const source = this.data.get('dataSource');
            const targetKeys = this.data.get('targetKeys');
            return source.filter(item => targetKeys.includes(item.key));
        },
        rightDisabled() {
            const leftSelect = this.data.get('left') || [];
            return leftSelect.length === 0;
        },
        leftDisabled() {
            const rightSelect = this.data.get('right') || [];
            return rightSelect.length === 0;
        }
    },
    messages: {
        'UI:select-list-item'(arg) {
            const {dir, selectKeys} = arg.value;
            this.data.set(dir, selectKeys);
            this.fire('selectChange', {
                source: this.data.get('left') || [],
                target: this.data.get('right') || []
            });
        },
        'UI:input-search'(arg) {
            this.fire('search', arg.value);
        },
        'UI:list-scroll'(arg) {
            this.fire('scroll', arg.value);
        }
    },
    handleTrans(dir) {
        let {targetKeys, dataSource} = this.data.get();
        const frm = dir === 'left' ? 'right' : 'left';
        const frmList = this.data.get(frm);
        if (!frmList) {
            return;
        }
        if (dir === 'right') {
            targetKeys = frmList.concat(targetKeys);
        } else {
            targetKeys = targetKeys.filter(key => !frmList.includes(key));
        }
        dataSource.forEach(item => {
            if (frmList.includes(item.key)) {
                item.checked = false;
            }
        });
        // 清空来源选中列表
        this.data.set(frm, []);
        this.data.set('dataSource', dataSource);
        this.data.set('targetKeys', targetKeys);
        this.fire('change', {
            targetKeys,
            moveKeys: frmList,
            direction: dir
        });
    },
    inited() {
        if (this.sourceSlots.named.footer) {
            this.data.set('showFooter', true);
        }
        const selectedKeys = this.data.get('selectedKeys') || [];
        const targetKeys = this.data.get('targetKeys');
        this.data.set('left', selectedKeys.filter(key => !targetKeys.includes(key)));
        this.data.set('right', selectedKeys.filter(key => targetKeys.includes(key)));
        this.data.apply('dataSource', source => {
            return source.map(item => {
                item.checked = selectedKeys.includes(item.key);
                return item;
            });
        });
    }
});