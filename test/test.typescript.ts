// eslint-disable-next-line no-shadow
import {assert} from 'chai';
import {JSONPath} from '../dist/index-umd.js';
import 'mocha';

describe('JSONPath - API - Typescript', function () {
    // tests based on examples at http://goessner.net/articles/JSONPath/
    const json = {
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

    it('should test non-object argument of constructor', () => {
        const books = json.store.book;
        const expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        let result = JSONPath('$.store.book[*].author', json);
        assert.deepEqual(result, expected);
        result = JSONPath({json, path: 'store.book[*].author'});
        assert.deepEqual(result, expected);
    });

    it('should test array path of constructor', () => {
        const books = json.store.book;
        const expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        let result = JSONPath({path: ['$', 'store', 'book', '*', 'author'], json});
        assert.deepEqual(result, expected);
        result = JSONPath({json, path: 'store.book[*].author'});
        assert.deepEqual(result, expected);
    });

    it('should test defaults on manual `evaluate` with `autostart: false`', () => {
        const books = json.store.book;
        const expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        let jp = JSONPath({
            path: '$.store.book[*].author',
            json,
            autostart: false
        });
        let result = jp.evaluate();
        assert.deepEqual(result, expected);
        jp = JSONPath({
            json,
            path: 'store.book[*].author',
            autostart: false
        });
        result = jp.evaluate();
        assert.deepEqual(result, expected);
    });

    it('should test defaults with `evaluate` object and `autostart: false`', () => {
        const books = json.store.book;
        const expected = [books[0].author, books[1].author, books[2].author, books[3].author];
        const jp = JSONPath({
            autostart: false
        });
        const result = jp.evaluate({
            json,
            path: '$.store.book[*].author',
            sandbox: {category: 'reference'},
            preventEval: true,
            flatten: true,
            wrap: false,
            resultType: 'value',
            callback () { /* */ },
            parent: null,
            parentProperty: null,
            otherTypeCallback () { /* */ }
        });
        assert.deepEqual(result, expected);
    });
});
