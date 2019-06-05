rm -rf ./dist
./node_modules/.bin/webpack --config scripts/webpack.doc.conf.js
gulp --gulpfile scripts/gulpfile_doc.js 
