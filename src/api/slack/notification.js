const request = require('axios');

class Notification {
  fire(message) {
    request.post(this.getUri(), this.preparePayload(message));
  }
  getUri() {
    return `https://hooks.slack.com/services/${process.env.SLACK_HOOK}`;
  }
  preparePayload(data) {
    return {
      channel: process.env.SLACK_CHANNEL,
      username: data.username,
      icon_url: data.thumbnail,
      text: data.title,
      attachments: data.contents.map(content => ({
        title: content.pull_request_title,
        text: content.meta,
      })),
    };
  }
}

module.exports = new Notification();
