/**
 * @file issue helper request file
 **/

const compareVersions = require('compare-versions');

const endpoint = 'https://api.github.com';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}

export function fetchVersions(repo) {
  return fetch(`${endpoint}/repos/ecomfe/${repo}/releases?per_page=100`)
    .then(checkStatus)
    .then((response) => response.json())
    .then(releases => releases.filter((r) => !r.prerelease))
    .then(releases => releases.map((r) => r.tag_name))
    .then(versions =>
      versions.sort((a, b) => -compareVersions(a, b)),
    );
}

export function fetchIssues(repo, keyword) {
  const q = encodeURIComponent(`is:issue repo:ecomfe/${repo} ${keyword}`);
  return fetch(`${endpoint}/search/issues?q=${q}&per_page=5`)
    .then(checkStatus)
    .then((response) => response.json())
    .then(json => json.items);
}
