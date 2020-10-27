/**
 * @file Santd tree select docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Desc from './desc.md';
import Multiple from './multiple.md';
import Checkable from './checkable.md';
import TreeData from './treeData.md';
import LoadData from './loadData.md';
import Showicon from './showicon.md';
import ReplaceFields from './replaceFields.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        multiple: Multiple,
        checkable: Checkable,
        treedata: TreeData,
        loaddata: LoadData,
        showicon: Showicon,
        replacefields: ReplaceFields

    },
    template: `
        <div>
            <desc/>
            <basic/>
            <treeData/>
            <loaddata/>
            <multiple/>
            <checkable/>
            <showicon/>
            <replacefields/>
            <readme/>
        </div>
    `
});
