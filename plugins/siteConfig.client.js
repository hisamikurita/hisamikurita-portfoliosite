export default (context, inject) => {
  const siteConfig = {
    breakPoint: 767,
  }

  if(window.innerWidth > siteConfig.breakPoint){
    siteConfig.isMobile = false;
  }
  else{
    siteConfig.isMobile = true;
  }

  inject('siteConfig', siteConfig);
}