
/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "avatars.githubusercontent.com"
    }, {
      protocol: "https",
      hostname: "res.cloudinary.com"
    }]
  }
};

export default config;
