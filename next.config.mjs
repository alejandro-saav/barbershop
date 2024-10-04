/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add a rule to handle .node files with node-loader
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader",
    });

    // Add '.node' to the list of extensions Webpack will resolve
    config.resolve.extensions.push(".node");

    // Ignore the @node-rs/argon2 package during bundling
    config.externals = config.externals || [];
    config.externals.push({
      "@node-rs/argon2": "commonjs @node-rs/argon2",
    });

    return config;
  },
};

export default nextConfig;
