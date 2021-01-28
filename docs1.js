(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{485:function(t,n,d){"use strict";d.r(n),n.default='<h1 id="国际化"><span>国际化</span><a href="#国际化" class="anchor">#</a></h1><p><code>Santd</code> 目前的默认文案是中文，如果需要使用其他语言，可以参考下面的方案。</p><h2 id="localeprovider"><span>LocaleProvider</span><a href="#localeprovider" class="anchor">#</a></h2><p>Santd 提供了一个San组件 <a href="https://ecomfe.github.io/santd/#/components/localeprovider">LocaleProvider</a> 用于全局配置国际化文案。</p><pre><code class="language-javascript">import zhCN from &#39;santd/lib/localeprovider/zh_CN&#39;;\nimport LocaleProvider from &#39;santd/localeprovider&#39;;\n\nexport default {\n    initData() {\n        return {\n            locale: zhCN\n        };\n    },\n    components: {\n        &#39;s-localeprovider&#39;: LocaleProvider\n    },\n    template: `&lt;div&gt;\n        &lt;s-localeprovider locale=&quot;&#123;&#123;locale}}&quot;&gt;\n            &lt;App /&gt;\n        &lt;/s-localeprovider&gt;\n    &lt;/div&gt;`\n}</code></pre>\n<p>注意：<code>zh_CN</code> 是文件名，以下表格也遵循同样的规则。</p><p>目前支持以下语言：</p><table>\n<thead>\n<tr>\n<th>语言</th>\n<th>文件名</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>阿拉伯语</td>\n<td>ar_EG</td>\n</tr>\n<tr>\n<td>亚美尼亚</td>\n<td>hy_AM</td>\n</tr>\n<tr>\n<td>保加利亚语</td>\n<td>bg_BG</td>\n</tr>\n<tr>\n<td>加泰罗尼亚语</td>\n<td>ca_ES</td>\n</tr>\n<tr>\n<td>捷克语</td>\n<td>cs_CZ</td>\n</tr>\n<tr>\n<td>德语</td>\n<td>de_DE</td>\n</tr>\n<tr>\n<td>希腊语</td>\n<td>el_GR</td>\n</tr>\n<tr>\n<td>英语</td>\n<td>en_GB</td>\n</tr>\n<tr>\n<td>英语（美式）</td>\n<td>en_US</td>\n</tr>\n<tr>\n<td>西班牙语</td>\n<td>es_ES</td>\n</tr>\n<tr>\n<td>爱沙尼亚语</td>\n<td>et_EE</td>\n</tr>\n<tr>\n<td>波斯语</td>\n<td>fa_IR</td>\n</tr>\n<tr>\n<td>芬兰语</td>\n<td>fi_FI</td>\n</tr>\n<tr>\n<td>法语（比利时）</td>\n<td>fr_BE</td>\n</tr>\n<tr>\n<td>法语</td>\n<td>fr_FR</td>\n</tr>\n<tr>\n<td>希伯来语</td>\n<td>he_IL</td>\n</tr>\n<tr>\n<td>印地语</td>\n<td>hi_IN</td>\n</tr>\n<tr>\n<td>克罗地亚语</td>\n<td>hr_HR</td>\n</tr>\n<tr>\n<td>匈牙利语</td>\n<td>hu_HU</td>\n</tr>\n<tr>\n<td>冰岛语</td>\n<td>is_IS</td>\n</tr>\n<tr>\n<td>印度尼西亚语</td>\n<td>id_ID</td>\n</tr>\n<tr>\n<td>意大利语</td>\n<td>it_IT</td>\n</tr>\n<tr>\n<td>日语</td>\n<td>ja_JP</td>\n</tr>\n<tr>\n<td>卡纳达语</td>\n<td>kn_IN</td>\n</tr>\n<tr>\n<td>韩语/朝鲜语</td>\n<td>ko_KR</td>\n</tr>\n<tr>\n<td>挪威语</td>\n<td>nb_NO</td>\n</tr>\n<tr>\n<td>尼泊尔语</td>\n<td>ne_NP</td>\n</tr>\n<tr>\n<td>荷兰语（比利时）</td>\n<td>nl_BE</td>\n</tr>\n<tr>\n<td>荷兰语</td>\n<td>nl_NL</td>\n</tr>\n<tr>\n<td>波兰语</td>\n<td>pl_PL</td>\n</tr>\n<tr>\n<td>葡萄牙语(巴西)</td>\n<td>pt_BR</td>\n</tr>\n<tr>\n<td>葡萄牙语</td>\n<td>pt_PT</td>\n</tr>\n<tr>\n<td>斯洛伐克语</td>\n<td>sk_SK</td>\n</tr>\n<tr>\n<td>塞尔维亚语</td>\n<td>sr_RS</td>\n</tr>\n<tr>\n<td>斯洛文尼亚语</td>\n<td>sl_SI</td>\n</tr>\n<tr>\n<td>瑞典语</td>\n<td>sv_SE</td>\n</tr>\n<tr>\n<td>泰米尔语</td>\n<td>ta_IN</td>\n</tr>\n<tr>\n<td>泰语</td>\n<td>th_TH</td>\n</tr>\n<tr>\n<td>土耳其语</td>\n<td>tr_TR</td>\n</tr>\n<tr>\n<td>罗马尼亚语</td>\n<td>ro_RO</td>\n</tr>\n<tr>\n<td>俄罗斯语</td>\n<td>ru_RU</td>\n</tr>\n<tr>\n<td>乌克兰语</td>\n<td>uk_UA</td>\n</tr>\n<tr>\n<td>越南语</td>\n<td>vi_VN</td>\n</tr>\n<tr>\n<td>简体中文</td>\n<td>zh_CN</td>\n</tr>\n<tr>\n<td>繁体中文</td>\n<td>zh_TW</td>\n</tr>\n</tbody></table>\n<p>具体的使用方法和新语言包贡献方式请参考 <a href="https://ecomfe.github.io/santd/#/components/localeprovider">LocaleProvider</a> 文档。</p>'}}]);