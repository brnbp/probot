const exec = require('child_process').exec;

function mock() {
    return [
        {
          "id": 1,
          "number": 1347,
          "html_url": "https://github.com/octocat/Hello-World/pull/1347",
          "state": "open",
          "title": "New Feature Added",
          "body": "Please pull these awesome changes",
          "locked": false,
          "created_at": "2017-11-25T09:28:54Z",
          "updated_at": "2017-11-26T19:01:12Z",
          "user": {
            "login": "featureman",
            "id": 1,
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "html_url": "https://github.com/octocat",
            "type": "User",
            "site_admin": false
          }
        },
        {
          "id": 2,
          "number": 419,
          "html_url": "https://github.com/octocat/Hello-World/pull/419",
          "state": "open",
          "title": "Fix Bug with Nav",
          "body": "Please pull these awesome changes",
          "locked": false,
          "created_at": "2017-11-22T16:43:05Z",
          "updated_at": "2017-11-22T16:43:05Z",
          "user": {
            "login": "buggerman",
            "id": 1,
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "html_url": "https://github.com/octocat",
            "type": "User",
            "site_admin": false
          }
        }
      ];
}

class PullRequests {
    opened(callback) {
        return mock()

        this.retrieve(callback)
    }
    stale(callback) {
        return mock()

        this.retrieve(callback)
    }
    getUri() {
        return '';
    }
    retrieve(callback) {
        const curl = 'curl -s -X GET "' + this.getUri() + '" -H "Accept: application/json" -H "Authorization: Bearer ' + api_token + '"'
        exec(curl, callback)
    }
}

module.exports = new PullRequests