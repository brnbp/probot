const moment = require('moment');
const {OPENED, STALE} = require('./api/github/pull-requests')

class MessageBuilder {
    openedPRs(prs) {
        if (!prs.length) return this.clear();

        return {
            title: "Good Morning! Here is all the PRs that need to be reviewed today!",
            username: process.env.ROSIE_INFORMATIVE_NAME,
            thumbnail: process.env.ROSIE_INFORMATIVE_IMG,
            contents: this.formatPRs(prs, OPENED)
        }
    }
    
    stalePRs(prs) {
        return {
            title: "Urghhh! These PRs are waiting more than " + process.env.GITHUB_STALE_DAYS + " days to be reviewed!",
            username: process.env.ROSIE_ANGRY_NAME,
            thumbnail: process.env.ROSIE_ANGRY_IMG,
            contents: this.formatPRs(prs, STALE)
        }
    }

    clear() {
        return {
            title: "Woa, there is no PRs needed to be reviewed today!",
            username: process.env.ROSIE_HAPPY_NAME,
            thumbnail: process.env.ROSIE_HAPPY_IMG,
            contents: []
        }
    }

    formatPRs(prs, type) {
        return prs.map(pr => ({
            pull_request_title: `<${pr.url}|${pr.title}> - by <${pr.user.url}|@${pr.user.username}>`,
            meta: this.metaMessage(pr, type)
        }))
    }

    metaMessage(pr, type) {
        switch (type) {
            case OPENED:
                return `Created ${moment(pr.created_at).fromNow()} - ${pr.comments} comments`;
                break;
            case STALE:
                return `Last update ${moment(pr.updated_at).fromNow()} - ${pr.comments} comments`;
                break;
        }
    }
}

module.exports = new MessageBuilder;