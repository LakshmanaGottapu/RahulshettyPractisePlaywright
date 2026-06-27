function requireEnv(key: string): string {
    const value = process.env[key]
    if (!value) throw new Error(`❌ Missing required env variable: "${key}"`)
    return value
}
function optionalENV(key:string){
    return process.env[key] ?? ''
}

export const getUIConfig = () => ({
    LOGIN_URL : requireEnv("LOGIN_URL"),
    LOGIN_USERNAME: requireEnv("LOGIN_USERNAME"),
    LOGIN_PASSWORD: requireEnv("LOGIN_PASSWORD"),
    SHOP_URL: requireEnv("SHOP_URL")
})

export const getDBConfig = () => ({
    DB_HOST_URL : requireEnv("DB_HOST_URL"),
    DB_PORT : optionalENV("DB_PORT"),
    DB_USERNAME : requireEnv("DB_USERNAME"),
    DB_PASSWORD : requireEnv("DB_PASSWORD"),
})

export const APIConfig = () => ({
    API_BASE_URL: requireEnv('API_BASE_URL'),
    API_TOKEN: requireEnv('API_TOKEN'),
})

export const MQConfig = () => ({
    MQ_HOST: optionalENV('MQ_HOST'),
    MQ_QUEUE: optionalENV('MQ_QUEUE'),
})