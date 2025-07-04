module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "yarn",
      args: "start",
      cwd: "/home/ubuntu/zeintah-web-app",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};