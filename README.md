## PROBOT - Pull Requests Robot Assistent


> probot is an assistant for your organization's open pull requests, build on top of NodeJS.

![screenshot](https://github.com/brnbp/probot/blob/master/imgs/example.png)

- [Configuration](#configuration)
- [Usage](#usage)
- [Deploy](#deploy-with-heroku)
- [Personalize](#personalize)



### Configuration:
 #### 1. Installing
  ```
    $ git clone git@github.com:brnbp/probot.git
  ```

 #### 2. Rename .env.example file to .env and fulfill the following things:
    - GITHUB_ACCESS_TOKEN    = your github access token (see https://github.com/settings/tokens)
    - GITHUB_ORGANIZATION    = your github organization name
    - GITHUB_STALE_REFERENCE = referente to consider an pull request staled, can be by the created date or last updated date
    - GITHUB_STALE_DAYS      = the number of days that a pull request without any movement is considered stale

    - SLACK_HOOK             = slack webhook (see https://slack.com/services/new/incoming-webhook)
    - SLACK_CHANNEL          = slack channel to place the bot

    - PACKAGE                = package's name 
   

 #### 3. Install dependencies:
  ````
    $ yarn 
    or
    $ npm install
  ````

 #### 4. Make sure that the file called `robot` is executable:
  ````
   $ chmod +x ./bin/robot
  ````


### Usage

   ````
     robot morning       Verifies and tells the team about all open pull requests.
     robot afternoon     Verifies and tells the team about all open pull requests for more than a few days.

     robot --help        Shows a summary of available commands
   
    or
   
     npm run morning       Verifies and tells the team about all open pull requests.
     npm run afternoon     Verifies and tells the team about all open pull requests for more than a few days.
   ````

### Deploy with Heroku
You can deploy the app using Heroku and then add the scheduler plugin (https://devcenter.heroku.com/articles/scheduler).

The scheduler is at https://scheduler.heroku.com/dashboard

The command to run is ````$ npm run morning```` and ````$ npm run afternoon````

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


### Personalize
Robots personality are possible to change by packages.

Packages are simple js file with a few properties, as you can see in the default template:

````javascript
  module.exports = {
    "package": "star-wars",
    "robots": [
        {
            "type": "info",
            "name": "Informative C3PO",
            "img": "https://cdn0.iconfinder.com/data/icons/famous-character-vol-1-colored/48/JD-34-128.png",
            "msg": "Good Morning folks! Here's all the PRs that need to be reviewed today!"
        },
        {
            "type": "happy",
            "name": "Happy BB-8",
            "img": "https://cdn0.iconfinder.com/data/icons/famous-character-vol-1-colored/48/JD-41-128.png",
            "msg": "Woa, there's no PRs needed to be reviewed today!"
        },
        {
            "type": "angry",
            "name": "Angry Vader",
            "img": "https://cdn0.iconfinder.com/data/icons/famous-character-vol-1-colored/48/JD-33-128.png",
            "msg": "Urghhh! These PRs are waiting more than %DAYS% days to be reviewed!"
        }
    ]
}
````

You can create an package using the default as template
  - ````$ cp packs/default.js packs/custom.js````
  - fulfill with the new personality for the robots
  - change the PACKAGE key at .env file for the new pack name (without the .js extension)


---


ROADMAP
  - create reports by teams
  - robots can post quotes
