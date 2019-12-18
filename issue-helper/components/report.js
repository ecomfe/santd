/**
 * @file issue helper header file
 **/

import Button from 'santd/button';
import Form from 'santd/form';
import Grid from 'santd/grid';
import Select from 'santd/select';
import Input from 'santd/input';
import i18n from '../i18n';
import * as api from '../servies/request';
import ReproModal from './repromodal';
import PreivewModal from './previewmodal';
import createPreview from './createpreview';

const params = location.search.slice(1).split('&').reduce((acc, param) => {
    const [key, value] = param.split('=');
    return {...acc, [key]: value};
}, {});

if (!params.repo) {
    params.repo = 'santd';
}

const bugForm = `
    <s-row>
        <s-col span="11">
            <s-form-item label="{{i18n['issue.version']}}" help="{{i18n['issue.versionHelp']}}">
                <s-select decorator="{{{name: 'version', initialValue: versions[0]}}}">
                    <s-select-option s-for="version in versions" value="{{version}}">{{version}}</s-select-option>
                </s-select>
            </s-form-item>
        </s-col>
        <s-col span="12" offset="1">
            <s-form-item label="{{i18n['issue.reproduction']}}">
                <s-repro-modal slot="help" i18n="{{i18n}}" lang="{{lang}}" />
                <s-input type="url" decorator="{{{name: 'reproduction', rules: [{required: true}]}}}" />
            </s-form-item>
        </s-col>
    </s-row>
    <s-form-item label="{{i18n['issue.environment']}}" help="{{i18n['issue.environmentHelp']}}">
        <s-input decorator="{{{name: 'environment', rules: [{required: true}]}}}" />
    </s-form-item>
    <s-form-item label="{{i18n['issue.steps']}}">
        <s-i18n id="stepsHelp" lang="{{lang}}" slot="help" />
        <s-textarea decorator="{{{name: 'steps', rules: [{required: true}]}}}" autosize="{{{minRows: 2}}}" />
    </s-form-item>
    <s-form-item label="{{i18n['issue.expected']}}">
        <s-textarea decorator="{{{name: 'expected', rules: [{required: true}]}}}" autosize="{{{minRows: 2}}}" />
    </s-form-item>
    <s-form-item label="{{i18n['issue.actually']}}">
        <s-textarea decorator="{{{name: 'actual', rules: [{required: true}]}}}" autosize="{{{minRows: 2}}}" />
    </s-form-item>
    <s-form-item label="{{i18n['issue.extra']}}" help="{{i18n['issue.extraHelp']}}">
        <s-textarea decorator="{{{name: 'extra'}}}" autosize="{{{minRows: 2}}}" />
    </s-form-item>
`;

const featureForm = `
    <s-form-item label="{{i18n['issue.motivation']}}">
        <s-i18n slot="help" id="motivationHelp" lang="{{lang}}" />
        <s-textarea decorator="{{{name: 'motivation', rules: [{required: true}]}}}" autosize="{{{minRows: 2}}}" />
    </s-form-item>
    <s-form-item label="{{i18n['issue.proposal']}}">
        <s-i18n slot="help" id="proposalHelp" lang="{{lang}}" />
        <s-textarea decorator="{{{name: 'proposal', rules: [{required: true}]}}}" autosize="{{{minRows: 2}}}" />
    </s-form-item>
`;

export default Form.create({})({
    initData() {
        return {
            repoVersions: {},
            similarIssues: [],
            preview: false,
            typeDecorator: {
                name: 'type',
                initialValue: ['bug']
            }
        };
    },

    components: {
        's-form': Form,
        's-form-item': Form.FormItem,
        's-col': Grid.Col,
        's-row': Grid.Row,
        's-select': Select,
        's-select-option': Select.Option,
        's-input': Input,
        's-textarea': Input.TextArea,
        's-button': Button,
        's-repro-modal': ReproModal,
        's-i18n': i18n,
        's-preview-modal': PreivewModal
    },

    computed: {
        issueType() {
            const form = this.data.get('form');
            return form && form.getFieldValue('type') || ['bug'];
        },

        versions() {
            const form = this.data.get('form');
            const repo = form && form.getFieldValue('repo') || 'santd';
            const repoVersions = this.data.get('repoVersions');

            return repoVersions[repo];
        },

        repo() {
            const form = this.data.get('form');
            return form && form.getFieldValue('repo');
        },

        title() {
            const form = this.data.get('form');
            return form && form.getFieldValue('title');
        },

        fieldsValue() {
            const form = this.data.get('form');
            return form && form.getFieldsValue();
        }
    },

    fetchVersions(repo) {
        api.fetchVersions(repo).then(versions => {
            let repoVersions = this.data.get('repoVersions');
            repoVersions = {
                ...repoVersions,
                [repo]: versions
            };

            this.data.set('repoVersions', repoVersions);
        });
    },

    handlePreview(e) {
        e.preventDefault();
        this.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.data.set('preview', true);
            }
        });
    },

    handleClosePreview() {
        this.data.set('preview', false);
    },

    handleCreate() {
        const issueType = this.data.get('issueType');
        const repo = this.data.get('repo');
        const title = encodeURIComponent(this.data.get('title')).replace(/%2B/gi, '+');
        const content = this.createPreview(issueType[0], this.data.get('fieldsValue'));
        const withConfirm = `- [ ] I have searched the [issues](https://github.com/ecomfe/${repo}/issues) \
        of this repository and believe that this is not a duplicate.

        ${content}
        `;
        const withMarker = `${withConfirm}\n\n<!-- generated by issue-helper. DO NOT REMOVE -->`;
        const body = encodeURIComponent(withMarker).replace(/%2B/gi, '+');
        const label = issueType === 'feature' ? '&labels=Feature%20Request' : '';

        window.open(`https://github.com/ecomfe/${repo}/issues/new?title=${title}&body=${body}${label}`);
    },

    attached() {
        this.fetchVersions(params.repo);
    },

    createPreview,

    template: `<div class="bug-report" style="margin: 0;">
        <s-preview-modal
            visible="{{preview}}"
            content="{{createPreview(issueType[0], fieldsValue)}}"
            i18n="{{i18n}}"
            on-cancel="handleClosePreview"
            on-create="handleCreate"
        />
        <div class="san-grid col-2 default-gap">
            <s-form layout="horizontal" on-submit="handlePreview">
                <s-row >
                    <s-col span="11">
                        <s-form-item label="{{i18n['issue.repo']}}" help="{{i18n['issue.repoHelp']}}">
                            <s-select decorator="{{{name: 'repo', initialValue: ['santd']}}}">
                                <s-select-option value="santd">santd</s-select-option>
                            </s-select>
                        </s-form-item>
                    </s-col>
                    <s-col span="12" offset="1">
                        <s-form-item label="{{i18n['issue.type']}}">
                            <s-select decorator="{{{name: 'type', initialValue: ['bug']}}}">
                                <s-select-option value="bug">Bug Report</s-select-option>
                                <s-select-option value="feature">Feature Request</s-select-option>
                            </s-select>
                    </s-form-item>
                </s-col>
                </s-row>
                <s-form-item label="{{i18n['issue.title']}}">
                    <s-input decorator="{{{name: 'title', rules: [{required: true}]}}}" />
                </s-form-item>
                <template s-if="issueType[0] === 'bug'">
                    ${bugForm}
                </template>
                <template s-else>
                    ${featureForm}
                </template>
                <s-form-item>
                    <div style="margin-top: 20px; text-align: center">
                        <s-button type="primary" size="large" htmlType="submit">
                            {{i18n['issue.preview']}}
                        </s-button>
                    </div>
                </s-form-item>
            </s-form>
        </div>
    </div>`
});
