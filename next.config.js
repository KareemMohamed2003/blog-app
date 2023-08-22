const newLocal = "cdn.sanity.io"
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  //  async redirects() {
  //   return [
  //     {
  //       source: '/LoginPage',
  //       destination: '/LoginPage',
  //       permanent: true,
  //     },
  //   ]
  // },
  images:{
    // domains:['cdn.sanity.io'],
    remotePatterns:[
      {
      protocol:"https",
      hostname:"cdn.sanity.io",
      port:"",
      // pathname:"/images/xplrd9jy/production/"
    }
  ]
    // hostname:"cdn.sanity.io"
  },
  
  // domains:[newLocal]
}

module.exports = nextConfig
