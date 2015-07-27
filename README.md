# cssimports[!travis badge](https://travis-ci.org/yuezk/cssimports.svg?branch=master)
find all `@import` urls in the css file DEEPLY

## Install

```sh
npm install --save cssimoprts
```

## Usage

```javascript
var cssimoprts = require('cssimoprts');

cssimoprts('path/to/css/file'/*, { deep: true, flatten: true } */).then(function (imports) {
    console.log(imports);
});
```

You can specify the `option.deep` to `true` to get the imports deeply, specify the `option.flatten` to `true` to put all imports into a single array.


## Example

entry.css

```css
@import url('a.css');
@import url('b.css') only screen and (max-width: 320px);
@import url('http://localhost/c.css');
```

a.css

```css
@import url(a1.css);
```

b.css

```css
@import url(b1.css);
```

The imports would be as follow:

```
[
    {
        path: 'a.css',
        condition: '',
        rule: '@import url(a.css)',
        absolutePath: 'path/to/a.css'
    }, {
        path: 'b.css',
        condition: 'only and (max-width: 320px)',
        rule: '@import url(b.css) only and (max-width: 320px)',
        absolutePath: 'path/to/b.css'
    }, {
        path: 'http://localhost/c.css',
        condition: '',
        rule: '@import url(http://localhost/c.css),
        absolutePath: 'http://localhost/c.css'
    }
]
```

## LICENSE

MIT