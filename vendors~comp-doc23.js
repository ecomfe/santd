(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{591:function(e,t,o){"use strict";var a=o(8);t.a=a.x.create({})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-icon":a.z,"s-button":a.i},computed:{userNameError(){const e=this.data.get("form");return e&&e.isFieldTouched("userName")&&e.getFieldError("userName")||""},passwordError(){const e=this.data.get("form");return e&&e.isFieldTouched("password")&&e.getFieldError("password")||""},submitDisabled(){const e=this.data.get("form");return e&&(t=e.getFieldsError(),Object.keys(t).some(e=>t[e]));var t}},attached(){this.validateFields()},initData:()=>({userNameDecorator:{name:"userName",rules:[{required:!0,message:"Please input your username!"}]},passwordDecorator:{name:"password",rules:[{required:!0,message:"Please input your password!"}]}}),handleSubmit(e){e.preventDefault(),this.validateFields((e,t)=>{e||console.log("Received values of form: ",t)})},template:'<div><s-form layout="inline" on-submit="handleSubmit"><s-formitem validateStatus="{{userNameError ? \'error\' : \'\'}}" help="{{userNameError}}"><s-input placeholder="username" decorator="{{userNameDecorator}}"><s-icon type="user" style="color: rgba(0, 0, 0, .25);" slot="prefix"></s-icon></s-input></s-formitem><s-formitem validateStatus="{{passwordError ? \'error\': \'\'}}" help="{{passwordError}}"><s-input placeholder="password" type="password" decorator="{{passwordDecorator}}"><s-icon type="lock" style="color: rgba(0, 0, 0, .25);" slot="prefix"></s-icon></s-input></s-formitem><s-formitem><s-button type="primary" htmlType="submit" disabled="{{submitDisabled}}">Log in</s-button></s-formitem></s-form></div>'})},592:function(e,t,o){"use strict";o(593);var a=o(8);t.a=a.x.create({name:"normal_login"})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-icon":a.z,"s-button":a.i,"s-checkbox":a.n},initData:()=>({userNameDecorator:{name:"userName",rules:[{required:!0,message:"The name cannot be empty"}]},passwordDecorator:{name:"password",rules:[{required:!0,message:"Please input your Password!"}]},rememberDecorator:{name:"remember",valuePropName:"checked",initialValue:!0}}),handleSubmit(e){e.preventDefault();this.data.get("form").validateFields((e,t)=>{e||console.log("Received values of form: ",t)})},template:'<div style="width: 300px;"><s-form on-submit="handleSubmit" class="login-form"><s-formitem><s-input placeholder="username" decorator="{{userNameDecorator}}"><s-icon type="user" slot="prefix" style="color: rgba(0, 0, 0, .25);"></s-icon></s-input></s-formitem><s-formitem><s-input placeholder="password" type="password" decorator="{{passwordDecorator}}"><s-icon type="lock" slot="prefix" style="color: rgba(0, 0, 0, .25);"></s-icon></s-input></s-formitem><s-formitem><s-checkbox decorator="{{rememberDecorator}}">Remember me</s-checkbox><a class="login-form-forgot" href="">Forgot password</a><s-button type="primary" htmlType="submit" class="login-form-button">Log in</s-button>Or <a href="">register now!</a></s-formitem></s-form></div>'})},595:function(e,t,o){"use strict";o(596);var a=o(8);const r=[{value:"zhejiang",label:"Zhejiang",children:[{value:"hangzhou",label:"Hangzhou",children:[{value:"xihu",label:"West Lake"}]}]},{value:"jiangsu",label:"Jiangsu",children:[{value:"nanjing",label:"Nanjing",children:[{value:"zhonghuamen",label:"Zhong Hua Men"}]}]}];t.a=a.x.create({name:"register"})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-input-password":a.A.Password,"s-icon":a.z,"s-button":a.i,"s-checkbox":a.n,"s-cascader":a.m,"s-select":a.S,"s-select-option":a.S.Option,"s-row":a.R,"s-col":a.o,"s-tooltip":a.eb,"s-autocomplete":a.d},initData(){return{residences:r,emailDecorator:{name:"email",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}]},passwordDecorator:{name:"password",rules:[{required:!0,message:"Please input your password!"},{validator:this.validateToNextPassword.bind(this)}]},confirmPasswordDecorator:{name:"confirm",rules:[{required:!0,message:"Please confirm your password!"},{validator:this.compareToFirstPassword.bind(this)}]},nicknameDecorator:{name:"nickname",rules:[{required:!0,message:"Please input your nickname!",whitespace:!0}]},residenceDecorator:{name:"residence",initialValue:["zhejiang","hangzhou","xihu"],rules:[{type:"array",required:!0,message:"Please select your habitual residence!"}]},phoneNumberDecorator:{name:"phone",rules:[{required:!0,message:"Please input your phone number!"}]},phonePrefixDecorator:{name:"prefix",initialValue:"86"},websiteDecorator:{name:"website",rules:[{required:!0,message:"Please input website!"}]},captchaDecorator:{name:"captcha",rules:[{required:!0,message:"Please input the captcha you got!"}]},agreementDecorator:{name:"agreement",valuePropName:"checked"},labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}},tailWrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}}},validateToNextPassword(e,t,o){const a=this.data.get("form");t&&this.data.get("confirmDirty")&&a.validateFields(["confirm"],{force:!0}),o()},compareToFirstPassword(e,t,o){const a=this.data.get("form");t&&t!==a.getFieldValue("password")?o("Two passwords that you enter is inconsistent!"):o()},handleWebsiteSearch(e){let t;t=e?[".com",".org",".net"].map(t=>`${e}${t}`):[],this.data.set("websites",t)},handleSubmit(e){e.preventDefault(),this.validateFieldsAndScroll((e,t)=>{e||console.log("Received values of form: ",t)})},template:'<div><s-form labelCol="{{labelCol}}" wrapperCol="{{wrapperCol}}" on-submit="handleSubmit"><s-formitem label="E-mail"><s-input decorator="{{emailDecorator}}"></s-input></s-formitem><s-formitem label="Password" hasFeedBack="{{true}}"><s-input-password decorator="{{passwordDecorator}}"></s-input-password></s-formitem><s-formitem label="Confirm Password" hasFeedBack="{{true}}"><s-input-password decorator="{{confirmPasswordDecorator}}"></s-input-password></s-formitem><s-formitem><span slot="label">Nickname&nbsp;<s-tooltip title="What do you want others to call you?"><s-icon type="question-circle-o"></s-icon></s-tooltip></span><s-input decorator="{{nicknameDecorator}}"></s-input></s-formitem><s-formitem label="Habitual Residence"><s-cascader options="{{residences}}" decorator="{{residenceDecorator}}"></s-cascader></s-formitem><s-formitem label="Phone Number"><s-input decorator="{{phoneNumberDecorator}}"><s-select style="width: 70px;" slot="addonBefore" decorator="{{phonePrefixDecorator}}"><s-select-option value="86">+86</s-select-option><s-select-option value="87">+87</s-select-option></s-select></s-input></s-formitem><s-formitem label="website"><s-autocomplete placeholder="website" on-search="handleWebsiteSearch" decorator="{{websiteDecorator}}"><s-select-option s-for="website in websites" value="{{website}}">{{website}}</s-select-option></s-autocomplete></s-formitem><s-formitem label="Captcha" extra="We must make sure that you are a human."><s-row gutter="{{8}}"><s-col span="{{12}}"><s-input decorator="{{captchaDecorator}}"></s-input></s-col><s-col span="{{12}}"><s-button>Get captcha</s-button></s-col></s-row></s-formitem><s-formitem wrapperCol="{{tailWrapperCol}}"><s-checkbox decorator="{{agreementDecorator}}">I have read the <a href="javascript:;">agreement</a></s-checkbox></s-formitem><s-formitem wrapperCol="{{tailWrapperCol}}"><s-button class="login-form-button" type="primary" htmlType="submit">Register</s-button></s-formitem></s-form></div>'})},598:function(e,t,o){"use strict";o(599);var a=o(8);const r=[];for(let e=0;e<10;e++)r.push({name:"field_"+e,rules:[{required:!0,message:"Input something!"}]});const s={components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-row":a.R,"s-col":a.o,"s-input":a.A,"s-button":a.i,"s-icon":a.z},initData:()=>({decorator:r,expand:!1}),computed:{count(){return this.data.get("expand")?10:6}},handleSearch(e){e.preventDefault(),this.validateFields((e,t)=>{console.log("Received values of form: ",t)})},handleReset(){this.resetFields()},handleToggle(){const e=this.data.get("expand");this.data.set("expand",!e)},template:'<div><s-form\n        class="san-advanced-search-form"\n        on-submit="handleSearch"\n    >\n        <s-row gutter="{{24}}">\n            <s-col span="{{8}}" key="{{i}}" s-for="field, index in decorator" style="{{index < count ? \'display: block;\' : \'display: none;\'}}">\n                <s-formitem label="{{\'filed \' + index}}">\n                    <s-input decorator="{{field}}" placeholder="placeholder"></s-input>\n                </s-formitem>\n            </s-col>\n        </s-row>\n        <s-row>\n            <s-col span="{{24}}" style="text-align: right;">\n                <s-button type="primary" htmlType="submit">Search</s-button>\n                <s-button style="margin-left: 8px;" on-click="handleReset">Clear</s-button>\n                <a style="margin-left: 8px; font-size: 12px;" on-click="handleToggle">Collapse</a>\n            </s-col>\n        </s-row>\n    </s-form></div>'},i=a.x.create({name:"advanced_search"})(s);t.a={components:{searchform:i},template:'<div><searchform></searchform><div class="search-result-list">Search Result List</div></div>'}},601:function(e,t,o){"use strict";o(602);var a=o(8);const r=a.x.create({name:"form_in_modal"})({components:{"s-modal":a.H,"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-textarea":a.A.TextArea,"s-radiogroup":a.O.Group,"s-radio":a.O},initData:()=>({titleDecorator:{name:"title",rules:[{required:!0,message:"Please input the title of collection!"}]},descriptionDecorator:{name:"description"},modifierDecorator:{name:"modifier",initialValue:"public"}}),handleCancel(){this.fire("cancel")},handleCreate(){const e=this.data.get("form");e.validateFields((t,o)=>{t||(console.log("Received values of form: ",o),e.resetFields(),this.fire("ok"))})},template:'\n        <div>\n            <s-modal\n                title="Create a new collection"\n                okText="Create"\n                visible="{{visible}}"\n                on-cancel="handleCancel"\n                on-ok="handleCreate"\n            >\n                <s-form layout="vertical">\n                    <s-formitem label="Title">\n                        <s-input decorator="{{titleDecorator}}"></s-input>\n                    </s-formitem>\n                    <s-formitem label="Description">\n                        <s-textarea decorator="{{descriptionDecorator}}"></s-textarea>\n                    </s-formitem>\n                    <s-formitem class="collection-create-form_last-form-item">\n                        <s-radiogroup decorator="{{modifierDecorator}}">\n                            <s-radio value="public">Public</s-radio>\n                            <s-radio value="private">Private</s-radio>\n                        </s-radiogroup>\n                    </s-formitem>\n                </s-form>\n            </s-modal>\n        </div>\n    '});t.a={components:{"s-button":a.i,"s-modal":a.H,"s-collectioncreateform":r},initData(){},showModal(){this.data.set("visible",!0)},hideModal(){this.data.set("visible",!1)},template:'<div><s-button type="primary" on-click="showModal">New Collection</s-button><s-collectioncreateform visible="{{visible}}" on-cancel="hideModal" on-ok="hideModal"></s-collectioncreateform></div>'}},604:function(e,t,o){"use strict";o(605);var a=o(8);let r=0;t.a=a.x.create({name:"dynamic_form_item"})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-icon":a.z,"s-button":a.i},initData:()=>({formItemLayout:{wrapperCol:{xs:{span:24},sm:{span:20}},labelCol:{xs:{span:24},sm:{span:4}}},formItemLayoutWithOutLabel:{wrapperCol:{xs:{span:24,offset:0},sm:{span:20,offset:4}}}}),inited(){this.getFieldProps("keys",{initialValue:[]})},computed:{keys(){const e=this.data.get("form");return e?e.getFieldValue("keys"):[]},decorators(){return(this.data.get("keys")||[]).map((e,t)=>({name:"names["+e+"]",rules:[{required:!0,whitespace:!0,message:"Please input passenger's name or delete this field."}]}))}},handleSubmit(e){e.preventDefault(),this.validateFields((e,t)=>{if(!e){const{keys:e,names:o}=t;console.log("Received values of form: ",t),console.log("Merged values:",e.map(e=>o[e]))}})},handleAdd(){const e=this.getFieldValue("keys").concat(r++);this.setFieldsValue({keys:e})},handleRemove(e){const t=this.getFieldValue("keys");1!==t.length&&this.setFieldsValue({keys:t.filter(t=>t!==e)})},template:'<div><s-form on-submit="handleSubmit"><s-formitem s-for="item, index in keys trackBy item" label="{{index === 0 ? \'Passengers\' : \'\'}}" wrapperCol="{{index === 0 ? formItemLayout.wrapperCol : formItemLayoutWithOutLabel.wrapperCol}}" labelCol="{{index === 0 ? formItemLayout.labelCol : {}}}" required="{{false}}" key="{{item}}"><s-input decorator="{{decorators[index]}}" placeholder="passenger name" style="width: 60%; margin-right: 8px; display: inline-block;"></s-input><s-icon s-if="keys.length > 1" class="dynamic-delete-button" type="delete" on-click="handleRemove(item)"></s-icon></s-formitem><s-formitem wrapperCol="{{formItemLayoutWithOutLabel.wrapperCol}}"><s-button type="dashed" on-click="handleAdd" style="width: 60%;"><s-icon type="plus"></s-icon>Add field</s-button></s-formitem><s-formitem wrapperCol="{{formItemLayoutWithOutLabel.wrapperCol}}"><s-button type="primary" htmlType="submit">Submit</s-button></s-formitem></s-form></div>'})},607:function(e,t,o){"use strict";var a=o(0),r=o.n(a),s=o(8);const i=r.a.defineComponent({components:{"s-input":s.A,"s-select":s.S,"s-selectoption":s.S.Option},handleNumberChange(e){const t=parseInt(e||0,10);Number.isNaN(t)||this.data.set("value.number",t)},handleCurrencyChange(e){this.data.set("value.currency",e)},messages:{"UI:form-item-interact"(e){const t=this.data.get("value");this.dispatch("UI:form-item-interact",{fieldValue:t,type:"change"})}},template:'<span>\n        <s-input type="text" size="{{size}}" value="{{value.number}}" style="width: 50%; margin-right: 3%; display: inline-block;" on-change="handleNumberChange"></s-input>\n        <s-select value="{{value.currency}}" size="{{size}}" style="width: 40%; display: inline-block;" on-change="handleCurrencyChange">\n            <s-selectoption value="rmb">RMB</s-selectoption>\n            <s-selectoption value="dollar">Dollar</s-selectoption>\n        </s-select>\n    </span>'});t.a=s.x.create({name:"customized_form_controls"})({components:{"s-form":s.x,"s-formitem":s.x.FormItem,"s-button":s.i,"s-priceinput":i},initData(){return{priceInputDecorator:{name:"price",initialValue:{number:0,currency:"rmb"},rules:[{validator:this.checkPrice.bind(this)}]}}},checkPrice(e,t,o){t.number>0?o():o("Price must greater than zero!")},handleSubmit(e){e.preventDefault(),this.validateFields((e,t)=>{e||console.log("Received values of form: ",t)})},template:'<div><s-form layout="inline" on-submit="handleSubmit"><s-formitem label="Price"><s-priceinput decorator="{{priceInputDecorator}}"></s-priceinput></s-formitem><s-formitem><s-button type="primary" htmlType="submit">Submit</s-button></s-formitem></s-form></div>'})},608:function(e,t,o){"use strict";o(0);var a=o(8);const r=a.x.create({name:"global_state",onFieldsChange(e,t,o){e.fire("change",t)},mapPropsToFields(e){const t=e.data.get("username");return{username:a.x.createFormField({value:t.value})}},onValuesChange(e,t,o){console.log(t)}})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A},initData:()=>({userNameDecorator:{name:"username",rules:[{required:!0,message:"Please input your username!"}]}}),template:'<div>\n        <s-form layout="inline">\n            <s-formitem label="username">\n                <s-input decorator="{{userNameDecorator}}"/>\n            </s-formitem>\n        </s-form>\n    </div>'});t.a={components:{"s-customizedform":r},computed:{userNameError(){const e=this.data.get("form");return e&&e.isFieldTouched("userName")&&e.getFieldError("userName")||""},code(){return JSON.stringify(this.data.get("fields"),null,2)}},initData:()=>({fields:{username:{value:"franklin"}}}),handleChange(e){this.data.set("fields",e)},template:'<div><s-customizedform s-bind="{{fields}}" on-change="handleChange"></s-customizedform><pre class="language-bash">{{code}}</pre></div>'}},609:function(e,t,o){"use strict";var a=o(8);t.a=a.x.create({name:"time_related_controls"})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-button":a.i,"s-datepicker":a.r,"s-monthpicker":a.r.MonthPicker,"s-rangepicker":a.r.RangePicker,"s-timepicker":a.cb},initData:()=>({labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}},buttonWrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}},datePickerRules:{name:"datePicker",rules:[{type:"object",required:!0,message:"Please select time!"}]},dateTimeRules:{name:"dateTimePicker",rules:[{type:"object",required:!0,message:"Please select time!"}]},monthRules:{name:"monthPicker",rules:[{type:"object",required:!0,message:"Please select time!"}]},rangeRules:{name:"rangePicker",rules:[{type:"array",required:!0,message:"Please select time!"}]},rangeTimeRules:{name:"rangeTimePicker",rules:[{type:"array",required:!0,message:"Please select time!"}]},timeRules:{name:"timePicker",rules:[{type:"object",required:!0,message:"Please select time!"}]}}),handleSubmit(e){e.preventDefault(),this.validateFields((e,t)=>{const o=t.rangePicker,a=t.rangeTimePicker,r={...t,datePicker:t.datePicker.format("YYYY-MM-DD"),dateTimePicker:t.dateTimePicker.format("YYYY-MM-DD HH:mm:ss"),monthPicker:t.monthPicker.format("YYYY-MM"),rangePicker:[o[0].format("YYYY-MM-DD"),o[1].format("YYYY-MM-DD")],rangeTimePicker:[a[0].format("YYYY-MM-DD HH:mm:ss"),a[1].format("YYYY-MM-DD HH:mm:ss")],timePicker:t.timePicker.format("HH:mm:ss")};console.log("Received values of form: ",r)})},template:'<div><s-form on-submit="handleSubmit" labelCol="{{labelCol}}" wrapperCol="{{wrapperCol}}"><s-formitem label="DatePicker"><s-datepicker decorator="{{datePickerRules}}"></s-datepicker></s-formitem><s-formitem label="DatePicker[showTime]"><s-datepicker showTime="" format="YYYY-MM-DD HH:mm:ss" decorator="{{dateTimeRules}}"></s-datepicker></s-formitem><s-formitem label="MonthPicker"><s-monthpicker decorator="{{monthRules}}"></s-monthpicker></s-formitem><s-formitem label="RangePicker"><s-rangepicker decorator="{{rangeRules}}"></s-rangepicker></s-formitem><s-formitem label="RangePicker[showTime]"><s-rangepicker showTime="" format="YYYY-MM-DD HH:mm:ss" decorator="{{rangeTimeRules}}"></s-rangepicker></s-formitem><s-formitem label="TimePicker"><s-timepicker decorator="{{timeRules}}"></s-timepicker></s-formitem><s-formitem wrapperCol="{{buttonWrapperCol}}"><s-button type="primary" htmlType="submit">Submit</s-button></s-formitem></s-form></div>'})},610:function(e,t,o){"use strict";var a=o(8);t.a={components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-inputnumber":a.B},initData:()=>({number:{value:11},labelCol:{span:7},wrapperCol:{span:12},tips:"A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself."}),checkPrice(e,t,o){t.number>0?o():o("Price must greater than zero!")},handleNumberChange(e){var t;this.data.set("number",{...(t=e,11===t?{validateStatus:"success",errorMsg:null}:{validateStatus:"error",errorMsg:"The prime between 8 and 12 is 11!"}),value:e})},template:'<div><s-form><s-formitem label="Prime between 8 & 12" labelCol="{{labelCol}}" wrapperCol="{{wrapperCol}}" validateStatus="{{number.validateStatus}}" help="{{number.errorMsg || tips}}"><s-inputnumber min="{{8}}" max="{{12}}" value="{{number.value}}" on-change="handleNumberChange"></s-inputnumber></s-formitem></s-form></div>'}},611:function(e,t,o){"use strict";var a=o(8);t.a={components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-select":a.S,"s-selectoption":a.S.Option,"s-cascader":a.m,"s-datepicker":a.r,"s-inputnumber":a.B},initData:()=>({formItemLayout:{labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:12}}}}),template:'<div><s-form labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}"><s-formitem label="Fail" validateStatus="error" help="Should be combination of numbers & alphabets"><s-input placeholder="unavailable choice" id="error"></s-input></s-formitem><s-formitem label="Warning" validateStatus="warning"><s-input placeholder="warning" id="warning"></s-input></s-formitem><s-formitem label="Validating" validateStatus="validating" help="The information is being validated..." hasFeedback="{{true}}"><s-input placeholder="I\'m the content is being validated" id="validating"></s-input></s-formitem><s-formitem label="Success" validateStatus="success" hasFeedback="{{true}}"><s-input placeholder="I\'m the content" id="success"></s-input></s-formitem><s-formitem label="Warning" validateStatus="warning" hasFeedback="{{true}}"><s-input placeholder="warning" id="warning2"></s-input></s-formitem><s-formitem label="Fail" validateStatus="error" help="Should be combination of numbers & alphabets" hasFeedback="{{true}}"><s-input placeholder="unavailable choice" id="error2"></s-input></s-formitem><s-formitem label="Success" validateStatus="success" hasFeedback="{{true}}"><s-datepicker style="width: 100%;"></s-datepicker></s-formitem><s-formitem label="Success" validateStatus="success" hasFeedback="{{true}}"><s-select defaultValue="1"><s-selectoption value="1">Option 1</s-selectoption><s-selectoption value="2">Option 1</s-selectoption><s-selectoption value="3">Option 1</s-selectoption></s-select></s-formitem><s-formitem label="Validating" validateStatus="validating" help="The information is being validated..." hasFeedback="{{true}}"><s-cascader defaultValue="{{[\'1\']}}" options="{{[]}}"></s-cascader></s-formitem><s-formitem label="inline" style="margin-bottom: 0;"><s-formitem validateStatus="error" help="Please select the correct date" style="display: inline-block; width: calc(50% - 18px)" labelCol="{{{}}}" wrapperCol="{{{}}}"><s-datepicker></s-datepicker></s-formitem><span style="display: inline-block; width: 24px; text-align: center;">-</span><s-formitem style="display: inline-block; width: calc(50% - 18px)" wrapperCol="{{{}}}" labelCol="{{{}}}"><s-datepicker></s-datepicker></s-formitem></s-formitem><s-formitem label="Success" validateStatus="success" hasFeedback="{{true}}"><s-inputnumber style="width: 100%;"></s-inputnumber></s-formitem></s-form></div>'}},612:function(e,t,o){"use strict";var a=o(8);t.a=a.x.create({name:"coordinated"})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-button":a.i,"s-select":a.S,"s-selectoption":a.S.Option},initData:()=>({noteDecorator:{name:"note",rules:[{required:!0,message:"Please input your note!"}]},genderDecorator:{name:"gender",rules:[{required:!0,message:"Please select your gender!"}]}}),handleSubmit(e){e.preventDefault();this.data.get("form").validateFields((e,t)=>{e||console.log("Received values of form: ",t)})},handleSelectChange(e){this.setFieldsValue({note:`Hi, ${"male"===e[0]?"man":"lady"}!`})},template:'<div><s-form labelCol="{{{span: 5}}}" wrapperCol="{{{span: 12}}}" on-submit="handleSubmit"><s-formitem label="Note"><s-input decorator="{{noteDecorator}}"></s-input></s-formitem><s-formitem label="Gender"><s-select on-change="handleSelectChange" decorator="{{genderDecorator}}"><s-selectoption value="male">male</s-selectoption><s-selectoption value="female">female</s-selectoption></s-select></s-formitem><s-formitem wrapperCol="{{{span: 12, offset: 5}}}"><s-button type="primary" htmlType="submit">Submit</s-button></s-formitem></s-form></div>'})},613:function(e,t,o){"use strict";var a=o(8);t.a={components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-button":a.i,"s-radiogroup":a.O.Group,"s-radiobutton":a.O.Button},initData:()=>({formLayout:"horizontal"}),computed:{formItemLayout(){return"horizontal"===this.data.get("formLayout")?{labelCol:{span:4},wrapperCol:{span:14}}:{}},buttonItemLayout(){return"horizontal"===this.data.get("formLayout")?{labelCol:{},wrapperCol:{span:14,offset:4}}:{}}},handleFormLayoutChange(e){this.data.set("formLayout",e.target.value)},template:'<div><s-form layout="{{formLayout}}"><s-formitem label="Form Layout" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}"><s-radiogroup defaultValue="horizontal" value="{{formLayout}}" on-change="handleFormLayoutChange" name="layout"><s-radiobutton value="horizontal">Horizontal</s-radiobutton><s-radiobutton value="vertical">Vertical</s-radiobutton><s-radiobutton value="inline">Inline</s-radiobutton></s-radiogroup></s-formitem><s-formitem label="Field A" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}"><s-input placeholder="input placeholder"></s-input></s-formitem><s-formitem label="Field B" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}"><s-input placeholder="input placeholder"></s-input></s-formitem><s-formitem labelCol="{{buttonItemLayout.labelCol}}" wrapperCol="{{buttonItemLayout.wrapperCol}}"><s-button type="primary">Submit</s-button></s-formitem></s-form></div>'}},614:function(e,t,o){"use strict";o(615);var a=o(8);t.a=a.x.create({name:"dynamic_rule"})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-input":a.A,"s-button":a.i,"s-checkbox":a.n},initData:()=>({checkNick:!1,formItemLayout:{labelCol:{span:4},wrapperCol:{span:8}},formTailLayout:{labelCol:{span:4},wrapperCol:{span:8,offset:4}},usernameDecorator:{name:"username",rules:[{required:!0,message:"Please input your name"}]}}),computed:{nicknameDecorator(){return{name:"nickname",rules:[{required:this.data.get("checkNick"),message:"Please input your nickname"}]}}},handleChange(e){this.data.set("checkNick",e.target.checked),this.nextTick(()=>{this.validateFields(["nickname"],{force:!0})})},handleCheck(){this.data.get("form").validateFields(e=>{e||console.info("success")})},template:'<div><s-form><s-formitem label="Name" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}"><s-input placeholder="please input your name" decorator="{{usernameDecorator}}"></s-input></s-formitem><s-formitem label="Nickname" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}"><s-input placeholder="please input your nickname" decorator="{{nicknameDecorator}}"></s-input></s-formitem><s-formitem labelCol="{{formTailLayout.labelCol}}" wrapperCol="{{formTailLayout.wrapperCol}}"><s-checkbox checked="{{checkNick}}" on-change="handleChange">Nickame is required</s-checkbox></s-formitem><s-formitem labelCol="{{formTailLayout.labelCol}}" wrapperCol="{{formTailLayout.wrapperCol}}"><s-button type="primary" on-click="handleCheck">Check</s-button></s-formitem></s-form></div>'})},617:function(e,t,o){"use strict";var a=o(8);t.a=a.x.create({name:"validate_other"})({components:{"s-form":a.x,"s-formitem":a.x.FormItem,"s-select":a.S,"s-selectoption":a.S.Option,"s-inputnumber":a.B,"s-switch":a.Y,"s-radio":a.O,"s-radiogroup":a.O.Group,"s-radiobutton":a.O.Button,"s-slider":a.U,"s-button":a.i,"s-icon":a.z,"s-rate":a.P,"s-checkbox":a.n,"s-checkboxgroup":a.n.Group,"s-upload":a.jb,"s-dragger":a.jb.Dragger,"s-row":a.R,"s-col":a.o},initData(){return{formItemLayout:{labelCol:{span:6},wrapperCol:{span:14}},selectDecorator:{name:"select",rules:[{required:!0,message:"Please select your country!"}]},selectMultipleDecorator:{name:"select_multiple",rules:[{required:!0,message:"Please select your favourite colors!"}]},inputNumberDecorator:{name:"input_number",initialValue:3},switchDecorator:{name:"switch",valuePropName:"checked"},sliderDecorator:{name:"slider"},radioGroupDecorator:{name:"radio_group"},radioButtonDecorator:{name:"radio_button"},checkboxGroupDecorator:{name:"checkbox_group",initialValue:["A","B"]},rateDecorator:{name:"rate",initialValue:3},uploadDecorator:{name:"upload",valuePropName:"fileList",getValueFromEvent:this.normFile},draggerDecorator:{name:"dragger",valuePropName:"fileList",getValueFromEvent:this.normFile}}},handleSubmit(e){e.preventDefault();this.data.get("form").validateFields((e,t)=>{e||console.log("Received values of form: ",t)})},normFile:e=>(console.log("Upload event:",e),Array.isArray(e)?e:e&&e.fileList),template:'<div><s-form labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}" on-submit="handleSubmit"><s-formitem label="Plain Text"><span class="san-form-text">China</span></s-formitem><s-formitem label="Select" hasFeedback="{{true}}"><s-select placeholder="Please select a country" decorator="{{selectDecorator}}"><s-selectoption value="china">China</s-selectoption><s-selectoption value="usa">U.S.A</s-selectoption></s-select></s-formitem><s-formitem label="Select[multiple]"><s-select mode="multiple" placeholder="Please select favourite colors" decorator="{{selectMultipleDecorator}}"><s-selectoption value="red">Red</s-selectoption><s-selectoption value="green">Green</s-selectoption><s-selectoption value="blue">blue</s-selectoption></s-select></s-formitem><s-formitem label="InputNumber"><s-inputnumber min="{{1}}" max="{{10}}" decorator="{{inputNumberDecorator}}"></s-inputnumber><span class="san-form-text"> machines</span></s-formitem><s-formitem label="Switch" decorator="{{switchDecorator}}"><s-switch></s-switch></s-formitem><s-formitem label="Slider" decorator="{{sliderDecorator}}"><s-slider marks="{{{0: \'A\', 20: \'B\', 40: \'C\', 60: \'D\', 80: \'E\', 100: \'F\'}}}"></s-slider></s-formitem><s-formitem label="Radio.Group"><s-radiogroup decorator="{{radioGroupDecorator}}" name="radiogroup"><s-radio value="a">item 1</s-radio><s-radio value="b">item 2</s-radio><s-radio value="c">item 3</s-radio></s-radiogroup></s-formitem><s-formitem label="Radio.Button"><s-radiogroup decorator="{{radioButtonDecorator}}" name="radiobutton"><s-radiobutton value="a">item 1</s-radiobutton><s-radiobutton value="b">item 2</s-radiobutton><s-radiobutton value="c">item 3</s-radiobutton></s-radiogroup></s-formitem><s-formitem label="Checkbox.Group"><s-checkboxgroup style="width: 100%;" decorator="{{checkboxGroupDecorator}}"><s-row><s-col span="{{8}}"><s-checkbox value="A">A</s-checkbox></s-col><s-col span="{{8}}"><s-checkbox value="B">B</s-checkbox></s-col><s-col span="{{8}}"><s-checkbox value="C">C</s-checkbox></s-col><s-col span="{{8}}"><s-checkbox value="D">D</s-checkbox></s-col><s-col span="{{8}}"><s-checkbox value="E">E</s-checkbox></s-col></s-row></s-checkboxgroup></s-formitem><s-formitem label="Rate"><s-rate decorator="{{rateDecorator}}"></s-rate></s-formitem><s-formitem label="Upload" extra="longgggggggggggggggggggggggggg"><s-upload decorator="{{uploadDecorator}}" name="logo" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture"><s-button><s-icon type="upload">Click to upload</s-icon></s-button></s-upload></s-formitem><s-formitem label="Dragger"><s-dragger decorator="{{draggerDecorator}}" name="files" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"><p class="san-upload-drag-icon"><s-icon type="inbox"></s-icon></p><p class="san-upload-text">Click or drag file to this area to upload</p><p class="san-upload-hint">Support for a single or bulk upload.</p></s-dragger></s-formitem><s-formitem wrapperCol="{{{span: 12, offset: 6}}}"><s-button type="primary" htmlType="submit">Submit</s-button></s-formitem></s-form></div>'})}}]);