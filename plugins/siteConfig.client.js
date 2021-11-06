export default (context, inject) => {
  const siteConfig = {
    breakPoint: 767,
    isPc: false,
    isMobile: false,
  }


  if(window.innerWidth > siteConfig.breakPoint){
    siteConfig.isPc = true;
  }
  else{
    siteConfig.isMobile = true;
  }

  inject('siteConfig', siteConfig);
}