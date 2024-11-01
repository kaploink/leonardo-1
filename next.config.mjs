// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.graphql$/,
//       exclude: /node_modules/,
//       use: ["graphql-tag/loader"],
//     });

//     return config;
//   },
// };

// export default nextConfig;

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: ["graphql-tag/loader"],
    });

    return config;
  },
};

export default nextConfig;
