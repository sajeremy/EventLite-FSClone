import "./HomePageBanner.css";

const HomePageBanner = () => {
  return (
    <div className="banner-container">
      <img
        className="banner-img"
        src="https://eventlite-22-seeds.s3.amazonaws.com/eb_banner.jpg"
        alt="eventlie banner"
      ></img>
    </div>
  );
};

export default HomePageBanner;

/* <picture>
  <source
    media="(max-width: 660px)"
    srcset="https://cdn.evbstatic.com/s3-build/fe/build/images/078e440796fb074a16a2703b97ec460d-8_mobile_659x494.jpg"
  />
  <source
    media="(max-width: 1608px)"
    srcset="https://cdn.evbstatic.com/s3-build/fe/build/images/126d82b6f3fe6bb844e5afb23d51c720-8_tablet_1067x470.jpg"
  />
  <img
    fetchpriority="high"
    className="fullbleed-header__main-bg"
    src="https://cdn.evbstatic.com/s3-build/fe/build/images/078e440796fb074a16a2703b97ec460d-8_mobile_659x494.jpg"
    alt="Homepage header"
    srcset="https://cdn.evbstatic.com/s3-build/fe/build/images/b6b192da5f3d36657c7f41706d97a9d0-8_web_1919x543.jpg 1920w,https://cdn.evbstatic.com/s3-build/fe/build/images/202c94fb57b451c02667b12e3f272e37-8_4K_1920x544.jpg 1924w,"
    sizes="(max-width: 1920px) 1920px, 1924px"
    style="background-color:#89A2BE"
    loading="eager"
  />
</picture> */
