const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) throw Error(`Missing environment variable for '${key}'!`);
    return value;
}

module.exports.DATABASE_URI = getEnv("DATABASE_URI");
module.exports.GITHUB_CLIENT_ID = getEnv("GITHUB_CLIENT_ID");
module.exports.GITHUB_CLIENT_SECRET = getEnv("GITHUB_CLIENT_SECRET");
module.exports.APP_ORIGIN = getEnv("APP_ORIGIN");