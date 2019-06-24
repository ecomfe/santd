/**
 * @file Santd upload utils file
 **/

// Fix IE file.status problem
// via coping a new Object
export function fileToObject(file) {
    return {
        ...file,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        uid: file.uid,
        percent: 0,
        originFileObj: file
    };
}

export function genPercentAdd() {
    let k = 0.1;
    const i = 0.01;
    const end = 0.98;
    return function (s) {
        let start = s;
        if (start >= end) {
            return start;
        }

        start += k;
        k = k - i;
        if (k < 0.001) {
            k = 0.001;
        }
        return start;
    };
}

export function getFileItem(file, fileList) {
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}

export function removeFileItem(file, fileList) {
    const matchKey = file.uid !== undefined ? 'uid' : 'name';
    const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
    if (removed.length === fileList.length) {
        return null;
    }
    return removed;
}

// ==================== Default Image Preview ====================
const extname = url => {
    if (!url) {
        return '';
    }
    const temp = url.split('/');
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};
const isImageFileType = type => !!type && type.indexOf('image/') === 0;

export const isImageUrl = file => {
    if (isImageFileType(file.type)) {
        return true;
    }
    const url = (file.thumbUrl || file.url);
    const extension = extname(url);
    if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp|dpg)$/i.test(extension)) {
        return true;
    }
    else if (/^data:/.test(url)) {
        // other file types of base64
        return false;
    }
    else if (extension) {
        // other file types which have extension
        return false;
    }
    return true;
};

const MEASURE_SIZE = 200;
export function previewImage(file) {
    return new Promise(resolve => {
        if (!isImageFileType(file.type)) {
            resolve('');
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = MEASURE_SIZE;
        canvas.height = MEASURE_SIZE;
        canvas.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: ${MEASURE_SIZE}px;
            height: ${MEASURE_SIZE}px;
            z-index: 9999;
            display: none;
        `;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            const {width, height} = img;

            let drawWidth = MEASURE_SIZE;
            let drawHeight = MEASURE_SIZE;
            let offsetX = 0;
            let offsetY = 0;

            if (width < height) {
                drawHeight = height * (MEASURE_SIZE / width);
                offsetY = -(drawHeight - drawWidth) / 2;
            }
            else {
                drawWidth = width * (MEASURE_SIZE / height);
                offsetX = -(drawWidth - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            const dataURL = canvas.toDataURL();
            document.body.removeChild(canvas);

            resolve(dataURL);
        };
        img.src = window.URL.createObjectURL(file);
    });
}
