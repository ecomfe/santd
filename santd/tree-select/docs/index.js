import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Multiple from './multiple.md';
import Checkable from './checkable.md';
import TreeData from './treeData.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        multiple: Multiple,
        checkable: Checkable,
        treedata: TreeData
    },
    template: `
        <div>

        <checkable/>


            <treeData/>
            <basic/>
            <multiple/>
            <!--

            -->
            <readme/>
        </div>
    `
})
