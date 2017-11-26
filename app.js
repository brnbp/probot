const Builder = require('./src/message-builder')
const GithubPRs = require('./src/api/github/pull-requests');
const SlackNotification = require('./src/api/slack/notification')

const openedPRs = GithubPRs.opened();
console.log(
    openedPRs,
    Builder.openedPRs(openedPRs)
)
//SlackNotification.fire(Builder.openedPRs(openedPRs));

const stalePRs = []//GithubPRs.stale();
if (stalePRs.length) {
    SlackNotification.fire(Builder.stalePRs(stalePRs));
}

