'use strict'

var expect = require('chai').expect
var extractQuery = require('../dist/bg/lib/extractQuery.js')

describe('query', function() {

  it('query keywords (q|search_query|query|etc) should be work', function() {
    // match
    expect(extractQuery('https://tw.search.yahoo.com/search?ei=UTF-8&fr=crmas&p=pleasurazy')).to.equal('pleasurazy')
    expect(extractQuery('https://maps.googleapis.com/maps/api/?q=pleasurazy&page=2')).to.equal('pleasurazy')
    expect(extractQuery('https://maps.googleapis.com/maps/api/?search=pleasurazy&page=2')).to.equal('pleasurazy')
    expect(extractQuery('https://maps.googleapis.com/maps/api/?query=pleasurazy&page=2')).to.equal('pleasurazy')
    expect(extractQuery('https://maps.googleapis.com/maps/api/?search_query=pleasurazy&page=2')).to.equal('pleasurazy')

    // do not match
    expect(extractQuery('http://en.wikipedia.org/wiki/HTTP/2')).to.be.null
    expect(extractQuery('https://nt46.hackpad.com/ep/pad/static/cpaB7UzPlT8')).to.be.null
    expect(extractQuery('http://www.eztable.com/?utm_source=google_adwords&utm_campaign=brand_name_eztable&utm_medium=cpc&utm_p=a&utm_r=tw&gclid=Cj0KEQjwy7qrBRC4lp7_hM3dgIoBEiQA72pCnjuZqLTjcAad5HyNJL9ohcS0ctz5N7qvLtbxhnoHaqoaAlXv8P8HAQ')).to.be.null
  })

  it('query in the last param using hash sign', function() {
    var taburl = 'https://www.google.com.tw/webhp?sourceid=chrome-instant&ion=1&espv=2&es_th=1&ie=UTF-8#q=pleasurazy'

    var query = extractQuery(taburl)
    expect(query).to.equal('pleasurazy')
  })

  it('query between url params using hash sign', function() {
    var taburl = 'http://example.io/#!/?q=pleasurazy&page=2'

    var query = extractQuery(taburl)
    expect(query).to.equal('pleasurazy')
  })

  it('query between url params using http queryparams', function() {
    var taburl = 'https://github.com/search?q=pleasurazy&ref=opensearch'

    var query = extractQuery(taburl)
    expect(query).to.equal('pleasurazy')
  })

  it('query between url params using restful params', function() {
    var taburl = 'http://restful.io/search/pleasurazy/page/2'

    var query = extractQuery(taburl)
    expect(query).to.equal('pleasurazy')
  })
})
