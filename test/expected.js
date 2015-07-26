var Path = require('path');

module.exports = {
    noDeep: {
        fs: [
            {
                path: 'a.css',
                condition: '',
                rule: '@import url(a.css)',
                absolutePath: Path.join(__dirname, 'fixtures/a.css')
            }, {
                path: 'b.css',
                condition: 'only and (max-width: 320px)',
                rule: '@import url(b.css) only and (max-width: 320px)',
                absolutePath: Path.join(__dirname, 'fixtures/b.css')
            }
        ],
        remote: [
            {
                path: 'a.css',
                condition: '',
                rule: '@import url(a.css)',
                absolutePath: 'http://127.0.0.1:10010/a.css'
            }, {
                path: 'http://127.0.0.1:10010/b.css',
                condition: 'only and (max-width: 320px)',
                rule: '@import url(http://127.0.0.1:10010/b.css) only and (max-width: 320px)',
                absolutePath: 'http://127.0.0.1:10010/b.css'
            }
        ]
    },
    deep: {
        fs: [
            {
                path: 'a.css',
                condition: '',
                rule: '@import url(a.css)',
                absolutePath: Path.join(__dirname, 'fixtures/a.css'),
                imports: [
                    {
                        path: 'a1.css',
                        condition: '',
                        rule: '@import url(a1.css)',
                        absolutePath: Path.join(__dirname, 'fixtures/a1.css'),
                        imports: []
                    }
                ]
            }, {
                path: 'b.css',
                condition: 'only and (max-width: 320px)',
                rule: '@import url(b.css) only and (max-width: 320px)',
                absolutePath: Path.join(__dirname, 'fixtures/b.css'),
                imports: [
                    {
                        path: 'b1.css',
                        condition: '',
                        rule: '@import url(b1.css)',
                        absolutePath: Path.join(__dirname, 'fixtures/b1.css'),
                        imports: [
                            {
                                path: 'b2.css',
                                condition: '',
                                rule: '@import url(b2.css)',
                                absolutePath: Path.join(__dirname, 'fixtures/b2.css'),
                                imports: []
                            }
                        ]
                    }
                ]
            }
        ],
        remote: [
            {
                path: 'a.css',
                condition: '',
                rule: '@import url(a.css)',
                absolutePath: 'http://127.0.0.1:10010/a.css',
                imports: [
                    {
                        path: 'a1.css',
                        condition: '',
                        rule: '@import url(a1.css)',
                        absolutePath: 'http://127.0.0.1:10010/a1.css',
                        imports: []
                    }
                ]
            }, {
                path: 'http://127.0.0.1:10010/b.css',
                condition: 'only and (max-width: 320px)',
                rule: '@import url(http://127.0.0.1:10010/b.css) only and (max-width: 320px)',
                absolutePath: 'http://127.0.0.1:10010/b.css',
                imports: [
                    {
                        path: 'b1.css',
                        condition: '',
                        rule: '@import url(b1.css)',
                        absolutePath: 'http://127.0.0.1:10010/b1.css',
                        imports: [
                            {
                                path: 'b2.css',
                                condition: '',
                                rule: '@import url(b2.css)',
                                absolutePath: 'http://127.0.0.1:10010/b2.css',
                                imports: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
};