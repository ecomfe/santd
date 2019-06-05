

var merge = Object.assign || function (to) {
    var arguments$1 = arguments;

    for (var i = 1; i < arguments.length; i++) {
        var from = Object(arguments$1[i]);

        for (var key in from) {
            if (hasOwn.call(from, key)) {
                to[key] = from[key];
            }

        }
    }

    return to;
};

var hasOwn = Object.prototype.hasOwnProperty;
var cache$1 = {};
var re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;

function lower(string) {
    return string.toLowerCase();
}

function slugify(str) {
    if (typeof str !== 'string') {
        return '';
    }

    let slug = str
        .trim()
        .replace(/[A-Z]+/g, lower)
        .replace(/<[^>\d]+>/g, '')
        .replace(re, '')
        .replace(/\s/g, '-')
        .replace(/-+/g, '-')
        .replace(/^(\d)/, '_$1');
    let count = cache$1[slug];

    count = hasOwn.call(cache$1, slug) ? count + 1 : 0;
    cache$1[slug] = count;

    if (count) {
        slug = slug + '-' + count;
    }

    return slug;
}

slugify.clear = function () {
    cache$1 = {};
};

function helper(className, content) {
    return ('<p class="' + className + '">' + (content.slice(5).trim()) + '</p>');
}
module.exports = {
    merge,
    helper,
    slugify
};
