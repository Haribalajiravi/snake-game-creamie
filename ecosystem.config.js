module.exports = {
  apps: [
    {
      name: 'WebApp',
      script: 'server.js',
      instances: 1, // If we don't know the cluster limit of machine use 'max'
      autorestart: true,
      watch: true,
      max_memory_restart: '20M', // Change your memory limit according to you needs
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
