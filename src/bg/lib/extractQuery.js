'use strict';

export default extractQuery;

function extractQuery(url) {

  if (typeof url !== 'string') return false;

  let regexp = /(?:q|p|query|search|search_query)[=\/](.*?)(?:[&\/].*?)?$/i;

  let result = url.match(regexp);

  return result && result[1];
}
