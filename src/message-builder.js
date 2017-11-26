const {github} = require('../config/config')

class MessageBuilder {
    openedPRs(prs) {
        if (!prs.length) {
            return this.clear();
        }

        return {
            title: "Good Morning! Here is all the PRs that need to be reviewed today!",
            contents: this.formatPRs(prs)
        }
    }

    stalePRs(prs) {
        return {
            title: "Urghhh! These PRs are waiting more than " + (github.stale_days || 2) + " days to be reviewed!",
            contents: this.formatPRs(prs)
        }
    }

    clear() {
        return {
            title: "Woa, there is no PRs needed to be reviewed today!",
            contents: []
        }
    }

    formatPRs(prs) {
        return prs.map(pr => ({
            pull_request_title: `<${pr.html_url}|${pr.title}> - by <${pr.user.html_url}|@${pr.user.login}>`,
            meta: `Created at ${pr.created_at} - Updated at ${pr.updated_at}`
        }))
    }
}

module.exports = new MessageBuilder;