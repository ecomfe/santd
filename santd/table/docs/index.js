/**
 * @file Santd Table demo file
 **/
import san from 'san';
import Desc from './desc.md';
import Readme from '../README.md';
import Basic from './basic.md';
import RowSelection from './row-selection.md';
import RowSelectionOperation from './row-selection-operation.md';
import RowSelectionCustom from './row-selection-custom.md';
import FilterSort from './filter-sort.md';
// import FilterSortControl from './filter-sort-control.md'; 可控排序和筛选无法实现
import Ajax from './ajax.md';
import Size from './size.md';
import Bordered from './bordered.md';
import ExpandedRowRender from './expanded-row-render.md';
import Colspan from './colspan-rowspan.md';
import FixedHeader from './fixed-header.md';
import FixedColumn from './fixed-column.md';
import FixedHeaderColumn from './fixed-header-column.md';
import ColumnsChildren from './columns-children.md';
import EditableCell from './editable-cell.md';
import EditableRow from './editable-row.md';
import ExpandedTable from './expanded-table.md';
import Dynamic from './dynamic.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        rowselection: RowSelection,
        rowselectionoperation: RowSelectionOperation,
        rowselectioncustom: RowSelectionCustom,
        filtersort: FilterSort,
        ajax: Ajax,
        size: Size,
        bordered: Bordered,
        expandedrowrender: ExpandedRowRender,
        colspan: Colspan,
        fixedheader: FixedHeader,
        fixedcolumn: FixedColumn,
        fixedheadercolumn: FixedHeaderColumn,
        columnschildren: ColumnsChildren,
        editablecell: EditableCell,
        editablerow: EditableRow,
        expandedtable: ExpandedTable,
        dynamic: Dynamic
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <rowselection/>
            <rowselectionoperation/>
            <rowselectioncustom/>
            <!--<filtersort/>-->
            <ajax/>
            <size/>
            <bordered/>
            <expandedrowrender/>
            <colspan/>
            <fixedheader/>
            <fixedcolumn/>
            <fixedheadercolumn/>
            <columnschildren/>
            <editablecell/>
            <editablerow/>
            <expandedtable/>
            <dynamic/>
            <readme/>
        </div>
    `
});
