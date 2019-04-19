/* eslint-disable quotes */
(function () {
'use strict';

const jsonpath = require('../').JSONPath,
    testCase = require('nodeunit').testCase;

const json = {
    "store": {
        "book": [
            {
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
            }
        ]
    }
};

module.exports = testCase({
    'wrap' (test) {
        test.expect(2);

        // let expected = json.store.book;
        let expected = [json.store.book];
        let result = jsonpath({json, path: '$.store.book', resultType: 'value', wrap: false});
        test.deepEqual(expected, result);

        expected = [json.store.book];
        result = jsonpath({json, path: '$.store.book', resultType: 'value', wrap: true});
        test.deepEqual(expected, result);

        test.done();
    }
});
}());
