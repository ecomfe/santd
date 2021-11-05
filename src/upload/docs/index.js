/**
 * @file Santd upload docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import DefaultFileList from './defaultFileList.md';
import ControlledFileList from './controlledFileList.md';
import Directory from './directory.md';
import Avatar from './avatar.md';
import MaxCount from './maxCount.md';
import Picture from './picture.md';
import Picturewall from './picturewall.md';
import Manual from './manual.md';
import Preview from './preview.md';
import Dragger from './dragger.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        defaultfilelist: DefaultFileList,
        controlledfilelist: ControlledFileList,
        directory: Directory,
        avatar: Avatar,
        maxcount: MaxCount,
        picture: Picture,
        picturewall: Picturewall,
        manual: Manual,
        preview: Preview,
        dragger: Dragger
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <defaultfilelist/>
            <controlledfilelist/>
            <directory/>
            <picture/>
            <avatar/>
            <maxcount/>
            <picturewall/>
            <dragger/>
            <manual/>
            <preview/>
            <readme/>
        </div>
    `
});
