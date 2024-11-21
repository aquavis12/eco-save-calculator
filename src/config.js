// src/config.js
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export const AWS_CONFIG = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    region: process.env.REACT_APP_AWS_REGION,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

module.exports = config;