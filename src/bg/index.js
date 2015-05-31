'use strict';

import jQuery from 'jquery';

chrome.extension.onRequest.addListener(Listening);

function Listening(request, sender, callback)
{
  let bookmarks = request.data || [];

  if (request.event == 'pleasurazy-bookmark-native-searcher:queryBookmarksEnded') {
    let resultElement = jQuery('.pleasurazy-bookmark-native-searcher');

    if (!resultElement.length) {
      resultElement = jQuery('<ul>').addClass('pleasurazy-bookmark-native-searcher');
      resultElement.attr('draggable', true);
      jQuery('body').prepend(resultElement);
    }

    resultElement.empty();

    bookmarks.forEach(function(bookmark) {
      let aElement = jQuery('<a>')
        .attr('title', bookmark.title)
        .attr('href', bookmark.url)
        .html(bookmark.title)

      let liElement = jQuery('<li>').append(aElement);

      resultElement.append(liElement);
    });
  }
}
