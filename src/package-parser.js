const pack = require(`../packs/${process.env.PACKAGE}`);

class PackageParser {
  compile() {
    pack.robots.map(robot => this.setEnv(robot));
  }
  setEnv(robot) {
    ['name', 'img', 'msg'].map(key => process.env[`robot_${robot.type}_${key}`] = this.format(robot[key]));
  }
  format(string) {
    return string.replace('%DAYS%', process.env.GITHUB_STALE_DAYS);
  }
}

module.exports = new PackageParser();
