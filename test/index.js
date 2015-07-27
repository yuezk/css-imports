var fs = require('fs');
var Path = require('path');
var cssimoprts = require('../');

var should = require('should');
var express = require('express');

var expected = require('./expected');

describe('css-imports', function () {
    describe('cssimoprts(src, {deep: false})', function () {
        it('should return all `@import` urls in the local file', function (done) {
            var path = Path.join(__dirname, 'fixtures/fs.css');
            cssimoprts(path, {deep: false})
                .then(function (results) {
                    results.should.eql(expected.noDeep.fs);
                    done();
                });
        });

        it('should return all `@imports` urls in the remote file', function (done) {
            createServer(function (server) {
                cssimoprts('http://127.0.0.1:10010/remote.css', {deep: false})
                    .then(function (results) {
                        results.should.eql(expected.noDeep.remote);

                        server.close();
                        done();
                    });
            });
        });
    });

    describe('cssimoprts(src, {deep: true})', function () {
        it('should return all `@import` urls deeply in the local file', function (done) {
            var path = Path.join(__dirname, 'fixtures/fs.css');
            cssimoprts(path, {deep: true})
                .then(function (results) {
                    results.should.eql(expected.deep.fs);
                    done();
                });
        });

        it('should return all `@import` urls deeply in the remote file', function (done) {
            createServer(function (server) {
                cssimoprts('http://127.0.0.1:10010/remote.css', {deep: true})
                    .then(function (results) {
                        results.should.eql(expected.deep.remote);
                        server.close();
                        done();
                    });
            });
        });
    });

    describe('cssimoprts(src, {deep: true, flatten: true})', function() {
        it('should find all imports deeply and put them into a single array', function (done) {
            var path = Path.join(__dirname, 'fixtures/fs.css');
            cssimoprts(path, {deep: true, flatten: true})
                .then(function (results) {
                    results.should.eql(expected.flatten.fs);
                    done();
                });
        });
    });
});

function createServer(cb) {
    var app = express();
    app.use(express.static(Path.join(__dirname, 'fixtures')));
    var server = app.listen(10010, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Test server listening at http://%s:%s', host, port);

        cb(server);
    });
}