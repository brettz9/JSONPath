"use strict";
exports.__esModule = true;
// eslint-disable-next-line no-shadow
var chai_1 = require("chai");
var index_umd_js_1 = require("../dist/index-umd.js");
require("mocha");
describe('JSONPath - API - Typescript', function () {
    // tests based on examples at http://goessner.net/articles/JSONPath/
    var json = {
        "store": {
            "book": [{
                    "category": "reference",
                    "author": "Nigel Rees",
                    "title": "Sayings of the Century",
                    "price": 8.95
                },
                {
                    "category": "fiction",
                    "author": "Evelyn Waugh",
                    "title": "Sword of Honour",
                    "price": 12.99
                },
                {
                    "category": "fiction",
                    "author": "Herman Melville",
                    "title": "Moby Dick",
                    "isbn": "0-553-21311-3",
                    "price": 8.99
                },
                {
                    "category": "fiction",
                    "author": "J. R. R. Tolkien",
                    "title": "The Lord of the Rings",
                    "isbn": "0-395-19395-8",
                    "price": 22.99
                }],
            "bicycle": {
                "color": "red",
                "price": 19.95
            }
        }
    };
    it('should test non-object argument of constructor', function () {
        var books = json.store.book;
        var expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        var result = index_umd_js_1.JSONPath('$.store.book[*].author', json);
        chai_1.assert.deepEqual(result, expected);
        result = index_umd_js_1.JSONPath({ json: json, path: 'store.book[*].author' });
        chai_1.assert.deepEqual(result, expected);
    });
    it('should test array path of constructor', function () {
        var books = json.store.book;
        var expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        var result = index_umd_js_1.JSONPath({ path: ['$', 'store', 'book', '*', 'author'], json: json });
        chai_1.assert.deepEqual(result, expected);
        result = index_umd_js_1.JSONPath({ json: json, path: 'store.book[*].author' });
        chai_1.assert.deepEqual(result, expected);
    });
    it('should test defaults on manual `evaluate` with `autostart: false`', function () {
        var books = json.store.book;
        var expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        var jp = index_umd_js_1.JSONPath({
            path: '$.store.book[*].author',
            json: json,
            autostart: false
        });
        var result = jp.evaluate();
        chai_1.assert.deepEqual(result, expected);
        jp = index_umd_js_1.JSONPath({
            json: json,
            path: 'store.book[*].author',
            autostart: false
        });
        result = jp.evaluate();
        chai_1.assert.deepEqual(result, expected);
    });
    it('should test defaults with `evaluate` object and `autostart: false`', function () {
        var books = json.store.book;
        var expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        var jp = index_umd_js_1.JSONPath({
            autostart: false
        });
        var result = jp.evaluate({
            json: json,
            path: '$.store.book[*].author',
            sandbox: { category: 'reference' },
            preventEval: true,
            flatten: true,
            wrap: false,
            resultType: 'value',
            callback: function () { },
            parent: null,
            parentProperty: null,
            otherTypeCallback: function () { }
        });
        chai_1.assert.deepEqual(result, expected);
    });
});
