# Value Source

Getter for values from various sources, with JSON-friendly config.

[![npm](https://img.shields.io/npm/v/@fczbkk/value-source.svg?maxAge=2592000)](https://www.npmjs.com/package/@fczbkk/value-source)
[![npm](https://img.shields.io/github/license/fczbkk/value-source.svg?maxAge=2592000)](https://github.com/fczbkk/value-source/blob/master/LICENSE)
[![David](https://img.shields.io/david/fczbkk/value-source.svg?maxAge=2592000)](https://david-dm.org/fczbkk/value-source)
[![Travis](https://img.shields.io/travis/fczbkk/value-source.svg?maxAge=2592000)](https://travis-ci.org/fczbkk/value-source)

## How to use

Install the library via NPM:

```shell
npm install @fczbkk/value-source --save
```

Then use in your project like this:

```javascript
import {constructSourceGetter} from '@fczbkk/value-source';

// create getter with default sources 
const my_sources = constructSourceGetter();

// get simple value
my_sources.getValue({source: 'direct', parameters: ['aaa']}); // "aaa"

// get value of global property
window.aaa = {bbb: 'ccc'};
my_sources.getValue({source: 'global', parameters: ['aaa.bbb']}); // "ccc"

// get element
my_sources.getValue({source: 'element', parameters: ['body']}); // document.body
```

You can set your own sources:

```javascript
my_sources.addSources({
  square: function (input) {return input * input;}
});

my_sources.getValue({source: 'square', parameters: [2]}); // 4
```

You can remove sources:

```javascript
my_sources.removeSources(['square']);
```

## Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### SourcePathList

Single path or list of paths to sources properties.

Type: ([SourcePath](#sourcepath) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[SourcePath](#sourcepath)>)

**Parameters**

-   `sources`   (optional, default `{}`)
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `$1.source`   (optional, default `[]`)
    -   `$1.parameters`   (optional, default `[]`)
    -   `$1.default_value`   (optional, default `null`)

### SourcesList

Object containing getter functions. The keys are names, the values are either functions or other SourcesList objects.

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Parameters**

-   `sources`   (optional, default `{}`)
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `$1.source`   (optional, default `[]`)
    -   `$1.parameters`   (optional, default `[]`)
    -   `$1.default_value`   (optional, default `null`)

### getValueFromSource

Returns value from selected source(s).

**Parameters**

-   `sources` **[SourcesList](#sourceslist)**  (optional, default `{}`)
-   `config` **[GetValueConfig](#getvalueconfig)**  (optional, default `{}`)
    -   `config.source`   (optional, default `[]`)
    -   `config.parameters`   (optional, default `[]`)
    -   `config.default_value`   (optional, default `null`)

Returns **any** 

### GetValueConfig

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Parameters**

-   `sources`   (optional, default `{}`)
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `$1.source`   (optional, default `[]`)
    -   `$1.parameters`   (optional, default `[]`)
    -   `$1.default_value`   (optional, default `null`)

**Properties**

-   `source` **[SourcePathList](#sourcepathlist)** First non-null value returned by getters will be returned.
-   `parameters` **(any | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** List of parameters to be used when calling source getters. Single item of any other type than Array will be converted to Array.
-   `default_value` **any?** Value to be returned when sources do not produce any non-null value.

### SourcePath

Dot separated path to a property inside SourcesList.

Type: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

**Parameters**

-   `sources`   (optional, default `{}`)
-   `$1` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `$1.source`   (optional, default `[]`)
    -   `$1.parameters`   (optional, default `[]`)
    -   `$1.default_value`   (optional, default `null`)

### constructSourceGetter

Constructs object with methods for working with sources and `getValue` method to execute `getValueFromSource` on them.

**Parameters**

-   `sources` **[SourcesList](#sourceslist)**  (optional, default `default_sources`)

Returns **{getSources: [getSources](#getsources), setSources: [setSources](#setsources), addSources: [addSources](#addsources), removeSources: [removeSources](#removesources), getValue: [getValue](#getvalue)}** 

### getSources

Returns currently set sources list.

Returns **[SourcesList](#sourceslist)** 

### setSources

Replaces existing sources with new ones.

**Parameters**

-   `sources` **[SourcesList](#sourceslist)** 

Returns **[SourcesList](#sourceslist)** 

### addSources

Adds sources to existing ones.

**Parameters**

-   `sources` **[SourcesList](#sourceslist)** 

Returns **[SourcesList](#sourceslist)** 

### removeSources

Removes specific sources by paths.

**Parameters**

-   `sources` **[SourcePathList](#sourcepathlist)**  (optional, default `[]`)

Returns **[SourcesList](#sourceslist)** 

### getValue

Applies `getValueFromSource` on currently set sources.

**Parameters**

-   `config` **[GetValueConfig](#getvalueconfig)** 

Returns **any** 

### default_sources

Source of predefined source getters.

### direct

Directly returns unchanged value.

**Parameters**

-   `value` **any** 

Returns **any** 

### global

Finds value in global namespace.

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Dot separated path to value in global namespace. (optional, default `''`)
-   `parameters` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)**  (optional, default `[]`)

Returns **any** 

### current_url

Returns full URL of current document.

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### frame_name

Returns frame name.

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### frame_id

Returns ID of parent frame element, or `null` if ID is not set or there's no parent frame.

Returns **(null | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 

### frame_depth

Returns number of parent frames above current document.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### frame_element

Returns reference to a FRAME or IFRAME element.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### element

Returns single matching element or `null` if no matching element is found.

**Parameters**

-   `selector` **any** 

Returns **([Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) | null)** 

### element_content

Returns text content of an element and all its children. Returns `null` if no matching element is found.

**Parameters**

-   `selector` **any** 

Returns **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** 

### element_value

Returns value of an element (should be form field). Form fields that can hold multiple values (e.g. multi select, checkboxes) return array of values. Returns `null` if no matching element is found.

**Parameters**

-   `selector` **any** 

Returns **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) \| [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** 

### element_checked

Returns `true` if element is checked, otherwise `false`. Works only on CHECKBOX and RADIO inputs. All other matching elements will return `null`.

**Parameters**

-   `selector` **any** 

Returns **([boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | null)** 

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/value-source/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Value Source is published under the [MIT license](https://github.com/fczbkk/value-source/blob/master/LICENSE).
