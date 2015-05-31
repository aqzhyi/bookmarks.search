'use strict';

var expect = require('chai').expect;
var extractQuery = require('../dist/bg/lib/extractQuery.js');

describe('query', function() {

  it('query keywords (q|search_query|query|etc) should be work', function() {
    expect(extractQuery('https://tw.search.yahoo.com/search?ei=UTF-8&fr=crmas&p=pleasurazy')).to.equal('pleasurazy');
    expect(extractQuery('https://maps.googleapis.com/maps/api/?q=pleasurazy&page=2')).to.equal('pleasurazy');
    expect(extractQuery('https://maps.googleapis.com/maps/api/?search=pleasurazy&page=2')).to.equal('pleasurazy');
    expect(extractQuery('https://maps.googleapis.com/maps/api/?query=pleasurazy&page=2')).to.equal('pleasurazy');
    expect(extractQuery('https://maps.googleapis.com/maps/api/?search_query=pleasurazy&page=2')).to.equal('pleasurazy');
  });

  it('query in the last param using hash sign', function() {
    var taburl = 'https://www.google.com.tw/webhp?sourceid=chrome-instant&ion=1&espv=2&es_th=1&ie=UTF-8#q=pleasurazy';

    var query = extractQuery(taburl);
    expect(query).to.equal('pleasurazy');
  });

  it('query between url params using hash sign', function() {
    var taburl = 'http://example.io/#!/?q=pleasurazy&page=2';

    var query = extractQuery(taburl);
    expect(query).to.equal('pleasurazy');
  });

  it('query between url params using http queryparams', function() {
    var taburl = 'https://github.com/search?q=pleasurazy&ref=opensearch';

    var query = extractQuery(taburl);
    expect(query).to.equal('pleasurazy');
  });

  it('query between url params using restful params', function() {
    var taburl = 'http://restful.io/search/pleasurazy/page/2';

    var query = extractQuery(taburl);
    expect(query).to.equal('pleasurazy');
  });
});
