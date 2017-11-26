require('dotenv').config()

const GithubPRs = require('./src/api/github/pull-requests');
const MessageBuilder = require('./src/message-builder')
const SlackNotification = require('./src/api/slack/notification')

const dispatchOpenedPRs = () => {
    GithubPRs.opened((response, err) => {
        if (err) return;
        SlackNotification.fire(MessageBuilder.openedPRs(response));
    });
}

const dispatchStalePRs = () => {
    GithubPRs.stale((response, err) => {
        if (!response.length) return;
        SlackNotification.fire(MessageBuilder.stalePRs(response));
    });
}

dispatchOpenedPRs()
dispatchStalePRs()
SlackNotification.fire(MessageBuilder.clear());