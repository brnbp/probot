
module.exports = class InvalidParameterError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, InvalidParameterError)
        this.name = 'InvalidParameterError'
        this.message = `\nInvalid GITHUB_STALE_REFERENCE parameter. \nExpected 'created' or 'updated', '${process.env.GITHUB_STALE_REFERENC}' given.\nVerify the environment configuration.`
    }
}
