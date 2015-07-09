# Bookmarks Search [![Travis](https://img.shields.io/travis/Pleasurazy/bookmarks.search.svg)](https://travis-ci.org/Pleasurazy/bookmarks.search)

> Bookmarks search, the google way.

Youtube.com, tw.yahoo.com, www.google.com, www.bing.com, github.com, etc, works!

## Install

Google Chrome: https://chrome.google.com/webstore/detail/bookmarks-search/oakdljgpfopdkhicnfbgbleaklilciai

## Preview

![](preview.jpg)

## Development

```sh
npm install
bower install
npm run dev
```

## Build

```sh
npm run build
```

## ENV

- bower 1.4.1
- gulp 3.9
- iojs 2.3.3
- npm 2.12.1

## Test

```sh
npm test
```

```
query
  ✓ query keywords (q|search_query|query|etc) should be work
  ✓ query in the last param using hash sign
  ✓ query between url params using hash sign
  ✓ query between url params using http queryparams
  ✓ query between url params using restful params
```
