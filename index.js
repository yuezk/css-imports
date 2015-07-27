var fs = require('fs');
var Path = require('path');
var Url = require('url');
var concat = require('concat-stream');
var Promise = require('bluebird');

var parseImport = require('parse-import');
var stripComments = require('strip-comments');
var validUrl = require('valid-url');

var request = require('superagent');

module.exports = function (entry, options) {
    options = Object.create(options || {});

    if (options.deep) {
        return getImportsDeeply({ absolutePath: entry })
            .then(function (imports) {
                return options.flatten ? flattenImports(imports) : imports;
            });
    }
    return getImports(entry);
};


function getImports(path) {
    if (validUrl.isWebUri(path)) {
        return new Promise(handleRemote(path));
    }
    return new Promise(handleFileSystem(path));
}

function handleRemote(uri) {
    return function (resolve, reject) {
        request
            .get(uri)
            .end(function (err, res) {
                if (err) return reject(err);

                resolve(allImports(res.text, uri));
            });
    };
}

function handleFileSystem(path) {
    return function (resolve, reject) {
        fs.createReadStream(path)
            .on('error', reject)
            .pipe(concat(function (contents) {
                resolve(allImports(contents, path));
            }));
    };
}

function allImports(contents, parentPath) {
    contents = stripComments.block(contents.toString());
    var imports = parseImport(contents);
    imports.forEach(function (item) {
        item.absolutePath = getAbsolutePath(parentPath, item.path);
    });

    return imports;
}

function getImportsDeeply(css) {
    return getImports(css.absolutePath)
        .then(function (imports) {
            css.imports = imports;

            if (imports.length) {
                return Promise.each(imports, function (item) {
                    return getImportsDeeply(item);
                });
            }

            return imports;
        });
}

function getAbsolutePath(parentPath, path) {
    if (validUrl.isWebUri(path)) {
        return path;
    }

    if (validUrl.isWebUri(parentPath)) {
        return Url.resolve(parentPath, path);
    }

    return Path.resolve(Path.dirname(parentPath), path);
}


function flattenImports(imports) {
    var hash = {};

    function get(imports) {
        var ret = [];
        for (var i = 0; i < imports.length; i++) {
            var item = imports[i];
            if (!hash[item.absolutePath]) {
                ret.push(item);
                ret = ret.concat(get(item.imports));
                hash[item.absolutePath] = true;
            }
        }

        return ret;
    }

    return get(imports);
}