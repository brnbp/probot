const exec = require('child_process').exec;
const {slack} = require('../../../config/config')

class Notification {
    fire(message, callback) {
        const curl = "curl -X POST '" + this.getUri() +  "' -H 'Accept: application/json' --data '" 
                    + JSON.stringify(this.preparePayload(message)) + "'"
        exec(curl, callback)
    }
    getUri() {
        return 'https://hooks.slack.com/services/' + slack.hook;
    }
    preparePayload(data) {
        return {
            channel: slack.channel || "#random",
            username: slack.username || 'Rosie',
            icon_url: slack.icon || '',
            text: data.title,
            attachments: data.contents.map(content => ({
                title: content.pull_request_title,
                text: content.meta
            }))
        }
    }
}

module.exports = new Notification