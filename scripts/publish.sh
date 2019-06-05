cd scripts
gulp --gulpfile gulpfile.js --esBuild
gulp --gulpfile gulpfile.js 
cd ../build
npm publish --registry=http://registry.npm.baidu-int.com
echo 'finish publish'