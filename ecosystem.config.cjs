/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: "codexify",
      cwd: "/var/www/codexify",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
      max_restarts: 20,
      min_uptime: "5s",
    },
  ],
};
