module.exports = {
  apps: [{
    name: "discord",
    script: "./dist/index.js",
    instances: 1,
    out_file: "./logs/out.log",
    error_file: "./logs/error.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    log_type: 'json',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  },
  {
    name: "logger",
    script: "./dist/server.js",
    instances: 1,
    logs: false,
    out_file: "/dev/null",
    error_file: "/dev/null"
  }]
}