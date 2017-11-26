const request = require("axios");
const moment = require('moment');

class PullRequests {
    get OPENED() {
        return 1;
    }
    get STALE() {
        return 2;
    }
    opened(callback) {
        this.retrieve(callback)
    }
    stale(callback) {
        const lastUpdatedDate = moment().subtract(process.env.GITHUB_STALE_DAYS, 'days').format("YYYY-MM-DD")
        this.retrieve(callback, {
            qs: `+updated:<=${lastUpdatedDate}`
        })
    }
    getUrl(qs) {
        const baseUrl = 'https://api.github.com/search/issues'
        return `${baseUrl}?q=org:${process.env.GITHUB_ORGANIZATION}+type:pr+is:open${qs}`
    }
    async retrieve(callback, opts = {qs:''}) {
        try {
            const response = await request.get(this.getUrl(opts.qs), this.getDefaultOpts());
            callback(response.data, null);
        } catch (error) {
            callback(null, error.response.data)
        }
    }
    getDefaultOpts() { 
        return {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': 'podty'
            },        
            params: {
                sort: 'created',
                order: 'asc',
                access_token: process.env.GITHUB_ACCESS_TOKEN,
            },
            transformResponse: [this.transformer],
        }
    }
    transformer(data) {
        return JSON.parse(data).items.map(function(item){
            return { 
                number: item.number,
                url: item.html_url,
                title: item.title,
                user: { 
                    username: item.user.login,
                    avatar: item.user.avatar_url,
                    url: item.user.html_url,
                },
                state: item.state,
                comments: item.comments,
                created_at: item.created_at,
                updated_at: item.updated_at,
             }
        })
    } 
}

module.exports = new PullRequests