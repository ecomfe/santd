/**
 * @file site 部署脚本
 * @author zttonly <zttonly@gmail.com>
 */

/* eslint-disable fecs-no-require, no-console */
const fs = require('fs-extra');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const execa = require('execa');
const path = require('path');

const output = path.join(__dirname, '../output');

async function deploy() {
    try {
        // 1. 清理目标文件夹
        fs.emptyDirSync(output);

        // 2. 执行编译
        console.log(chalk.gray('1. exec npm run build:site\n'));
        let spinner = ora('building...');
        spinner.start();
        let result = await execa('npm', ['run', 'build:site']);
        if (!(result.exitCode === 0 && fs.pathExistsSync(`${output}/site`))) {
            spinner.fail();
            console.log(chalk.red('build site fail! please check command: npm run build:site'));
            process.exit(1);
        }
        result = await execa('npm', ['run', 'build:issue']);
        if (!(result.exitCode === 0 && fs.pathExistsSync(`${output}/issue`))) {
            spinner.fail();
            console.log(chalk.red('build issue fail! please check command: npm run build:issue'));
            process.exit(1);
        }
        spinner.succeed();

        console.log(chalk.gray('\n2. perpare for gh-pages\n'));

        spinner = ora('git clone santd');
        spinner.start();
        await execa('cp', ['../site/theme/static/img/logo.svg', './site/favicon.svg'], {cwd: `${output}`});

        // 3. 拷贝分支gh-pages代码到本地
        // await execa('git', ['clone', '-b', 'gh-pages', 'git@github.com:ecomfe/santd.git'], {cwd: `${output}`});

        // 这里重新clone一次太慢了，影响发布速度，复用本地现成的.git
        const {stdout} = await execa('git', ['remote', '-v'], {cwd: `${output}`});
        const [remote] = stdout.match(/https:\/\/github.com\/\w+\/\w+\.git|git@github\.com:\w+\/\w+\.git/);
        console.log(chalk.gray('\nRemote Repository:') + chalk.green(remote));
        await execa('mkdir', ['santd'], {cwd: `${output}`});
        await execa('cp', ['-r', '../.git', 'santd'], {cwd: `${output}`});
        await execa('git', ['stash'], {cwd: `${output}/santd`});
        await execa('git', ['checkout', 'gh-pages'], {cwd: `${output}/santd`});
        await execa('git', ['pull'], {cwd: `${output}/santd`});
        spinner.succeed();

        // 4. 确认名称和邮箱：git config user.name git config user.email
        let name = await execa('git', ['config', 'user.name'], {cwd: `${output}/santd`});
        let email = await execa('git', ['config', 'user.email'], {cwd: `${output}/santd`});

        let answer1 = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'needtochange',
                message: chalk.gray('confirm git config:')
                    + '\n\tuser.name: ' + chalk.green(name.stdout)
                    + '\n\tuser.email: ' + chalk.green(email.stdout)
                    + chalk.red('\nDo you need to make any changes?'),
                default: false
            },
            {
                type: 'input',
                name: 'username',
                message: 'input user.name: ',
                when(answers) {
                    return answers.needtochange;
                }
            },
            {
                type: 'input',
                name: 'useremail',
                message: 'input user.email: ',
                when(answers) {
                    return answers.needtochange;
                }
            }
        ]);
        if (answer1.needtochange) {
            await execa('git', ['config', 'user.name', answer1.username], {cwd: `${output}/santd`});
            await execa('git', ['config', 'user.email', answer1.useremail], {cwd: `${output}/santd`});
            console.log(chalk.green('\ngit config success!\n'));
        }

        // 5. 移动文档文件
        fs.copySync(`${output}/site/`, `${output}/santd/`);
        fs.moveSync(`${output}/issue/`, `${output}/santd/issue`, {overwrite: true});
        // 6. git提交，提前输入提交commit信息，默认：update site + 日期
        let answer2 = await inquirer.prompt([
            {
                type: 'input',
                name: 'commitmsg',
                message: 'please input commit message:',
                default: 'update site, date:' + new Date().toLocaleDateString().replace(/\//g, '-')
            }
        ]);
        console.log(chalk.green('\nstart push...'));
        // git add. git commit -m '增加提示' git push origin gh-pages
        await execa('git', ['add', '.'], {cwd: `${output}/santd`});
        await execa('git', ['commit', '-m', answer2.commitmsg], {cwd: `${output}/santd`});
        await execa('git', ['push', 'origin', 'gh-pages'], {cwd: `${output}/santd`});
        console.log(chalk.green('\ngit push success!'));

        console.log(chalk.gray('\n3. Please clean output manually'));
        // 暂时先手动清理
        // fs.emptyDirSync(output);
        console.log(chalk.gray('done!'));
    }
    catch (err) {
        console.log('error:', err);
        throw err;
    }
}

deploy().catch(err => {
    console.error(err);
    process.exit(1);
});
