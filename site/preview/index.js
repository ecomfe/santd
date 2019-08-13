import './style/preview.less';
import {defineComponent} from 'san';
import hotClient from 'webpack-hot-middleware/client?noInfo=true&reload=true';
import 'prismjs';

import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';

import Entry from '~entry';

hotClient.subscribe(event => {
    if (event.action === 'reload') {
        window.location.reload();
    }
});

const AppComponent = defineComponent({
    components: {
        'ui-entry': Entry
    },
    template: `
    <div class="page-wrapper">
        <div class="main-wrapper">
            <div class="main-container"><ui-entry/></div>
        </div>
    </div>`
});
const app = new AppComponent();
app.attach(document.getElementById('app'));
