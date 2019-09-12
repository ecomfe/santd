/**
* @file 检查组件目录规范
* @author fuqiangqiang
*/
const fs = require('fs');
const path = require('path');
const $ = require('dekko');
const componentName = process.argv[2] || '';
const filePath = path.resolve(__dirname, `../src/${componentName}`);

const dekko = (fdir) => {
    $(fdir)
        .isDirectory()
        .hasDirectory('__tests__')
        .hasDirectory('docs')
        .hasFile('index.js')
        .hasFile('package.json')
        .hasFile('README.md');
};
const dirMatch = (filePath, filename = '') => {
    const fdir = path.join(filePath, filename);
    if (fs.statSync(fdir).isDirectory() && !/\/core/.test(fdir)) {
        dekko(fdir);
        console.log(`------${filename||componentName}目录规范测试通过-----`);
    }
}
fs.readdir(filePath, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        if (componentName !== '') {
            dirMatch(filePath);
            return;
        }
        files.forEach(filename => {
            dirMatch(filePath, filename);
        });
    }
});


