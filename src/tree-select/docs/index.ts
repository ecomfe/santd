/**
 * @file Santd tree select docs file
 **/

import Readme from '../README.md';
import Basic from './basic.md';
import Desc from './desc.md';
import Multiple from './multiple.md';
import Checkable from './checkable.md';
import TreeData from './treeData.md';
import LoadData from './loadData.md';
import Showicon from './showicon.md';
import ReplaceFields from './replaceFields.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        multiple: Multiple,
        checkable: Checkable,
        treedata: TreeData,
        loaddata: LoadData,
        showicon: Showicon,
        replacefields: ReplaceFields

    }
    static template = `
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
};
