const moment = require('moment');
const {OPENED, STALE} = require('./api/github/pull-requests')

class MessageBuilder {
    openedPRs(prs) {
        if (!prs.length) return this.clear();

        return {
            title: process.env.robot_info_msg,
            username: process.env.robot_info_name,
            thumbnail: process.env.robot_info_img,
            contents: this.formatPRs(prs, OPENED)
        }
    }
    
    stalePRs(prs) {
        return {
            title: process.env.robot_angry_msg,
            username: process.env.robot_angry_name,
            thumbnail: process.env.robot_angry_img,
            contents: this.formatPRs(prs, STALE)
        }
    }

    clear() {
        return {
            title: process.env.robot_happy_msg,
            username: process.env.robot_happy_name,
            thumbnail: process.env.robot_happy_img,
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
                return `Created ${moment(pr.created_at).fromNow()} - ${this.countComments(pr.comments)}`;
                break;
            case STALE:
                return `Updated ${moment(pr.updated_at).fromNow()} - ${this.countComments(pr.comments)}`;
                break;
        }
    }
    countComments(comments) {
        return `${comments} ${comments > 1 ? 'comments' : 'comment'}`
    }
}

module.exports = new MessageBuilder;