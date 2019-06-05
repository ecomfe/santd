import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Picture from './picture.md';
import Picturewall from './picturewall.md';
import Dragger from './dragger.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        picture: Picture,
        picturewall: Picturewall,
        dragger: Dragger
    },
    template: `
        <div>
            <basic/>
            <picture/>
            <picturewall/>
            <dragger/>
            <readme/>
        </div>
    `
})