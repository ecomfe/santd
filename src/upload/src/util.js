/**
 * @file Santd upload util file
 **/

const now = +(new Date());
let index = 0;

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function loopFiles(item, callback) {
    const dirReader = item.createReader();
    let fileList = [];

    function sequence() {
        dirReader.readEntries(entries => {
            const entryList = Array.prototype.slice.apply(entries);
            fileList = [...fileList, ...entryList];

            // Check if all the file has been viewed
            const isFinished = !entryList.length;

            if (isFinished) {
                callback(fileList);
            }
            else {
                sequence();
            }
        });
    }

    sequence();
}

export function getUid() {
    return `upload-${now}-${++index}`;
}

export function attrAccept(file, acceptedFiles) {
    if (file && acceptedFiles) {
        const acceptedFilesArray = Array.isArray(acceptedFiles)
            ? acceptedFiles
            : acceptedFiles.split(',');
        const fileName = file.name || '';
        const mimeType = file.type || '';
        const baseMimeType = mimeType.replace(/\/.*$/, '');

        return acceptedFilesArray.some(type => {
            const validType = type.trim();
            if (validType.charAt(0) === '.') {
                return endsWith(fileName.toLowerCase(), validType.toLowerCase());
            }
            else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                return baseMimeType === validType.replace(/\/.*$/, '');
            }
            return mimeType === validType;
        });
    }
    return true;
}

export function traverseFileTree(files, callback, isAccepted) {
    const innerTraverseFileTree = (item, path = '') => {
        if (item.isFile) {
            item.file(file => {
                if (isAccepted(file)) {
                    // https://github.com/ant-design/ant-design/issues/16426
                    if (item.fullPath && !file.webkitRelativePath) {
                        Object.defineProperties(file, {
                            webkitRelativePath: {
                                writable: true
                            }
                        });
                        file.webkitRelativePath = item.fullPath.replace(/^\//, '');
                        Object.defineProperties(file, {
                            webkitRelativePath: {
                                writable: false
                            }
                        });
                    }
                    callback([file]);
                }
            });
        }
        else if (item.isDirectory) {
            loopFiles(item, entries => {
                entries.forEach(entryItem => {
                    innerTraverseFileTree(entryItem, `${path}${item.name}/`);
                });
            });
        }
    };
    for (const file of files) {
        innerTraverseFileTree(file.webkitGetAsEntry());
    }
}
