const exec = require('child_process').exec;

class Notification {
    fire(message, callback) {
        const curl = "curl -X POST '" + this.getUri() +  "' -H 'Accept: application/json' --data '" 
                    + JSON.stringify(this.preparePayload(message)) + "'"
        exec(curl, callback)
    }
    getUri() {
        return 'https://hooks.slack.com/services/' + process.env.SLACK_HOOK;
    }
    preparePayload(data) {
        return {
            channel: process.env.SLACK_CHANNEL || "#random",
            username: process.env.SLACK_USERNAME || 'Rosie',
            icon_url: process.env.SLACK_ICON || '',
            text: data.title,
            attachments: data.contents.map(content => ({
                title: content.pull_request_title,
                text: content.meta
            }))
        }
    }
}

module.exports = new Notification