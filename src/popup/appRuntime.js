import extractQuery from './extractQuery.js'
import app from './app'

app.run(runFn)

runFn.$inject = [
  '$rootScope',
]

function runFn($root) {

  chrome.tabs.query({active: true, currentWindow: true}, function([tab]) {

    let query = extractQuery(tab.url)
    query = decodeURIComponent(query)

    queryBookmark(query)
    .then((result) => {

      $root.$apply(() => {
        $root.bookmarks = result
      })

      return result
    })
  })
}

function queryBookmark(query) {

  return new Promise(function(ok) {

    chrome.bookmarks.search(`${query}`, function(bookmarks) {
      ok(bookmarks || [])
    })
  })
}
