import extractQuery from './extractQuery'

chrome.tabs.onActivated.addListener(autoUpdateBadges)
chrome.windows.onFocusChanged.addListener(autoUpdateBadges)

function autoUpdateBadges() {

  chrome.tabs.query({currentWindow: true, active: true}, ([tab]) => {

    let query = extractQuery(tab.url)
    query = decodeURIComponent(query)

    chrome.bookmarks.search(`${query}`, (bookmarks) => {
      chrome.browserAction.setBadgeText({text: `${bookmarks.length}`})
    })
  })
}
