 
import withPWA from 'next-pwa';
const isProduction = process.env.NODE_ENV === 'production';
 
const config = {
  cacheOnFrontEndNav: true,
  reloadOnOnline:true,
  swcMinify: true,
  disable:false,
  workboxOptions:{
    disableDevLogs:true
  }
};
 
const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
})(
  config
);
 
export default nextConfig;