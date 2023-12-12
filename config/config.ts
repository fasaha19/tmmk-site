const AppConfig: any = {
  host: "https://cms.tmmk.info",
  baseURL: "https://cms.tmmk.info/api/",
  routes: {
    aboutUs: "aboutuses?populate=*",
    blog: {
      allBlogs: "blogs?populate=*&filters[$and][0][blogType][$eq]=blog",
      featuredBlog:
        "blogs?populate=*&filters[$and][0][blogType][$eq]=blog&filters[$and][1][isFeatured][$eq]=true",
      blogById: "blogs/",
      top4blog:
        "blogs?populate=*&filters[$and][0][blogType][$eq]=blog&pagination[page]=1&pagination[pageSize]=4&sort=updatedAt:DESC",
    },
    featuredVideo:
      "home-featured-videos?populate=*&pagination[page]=1&pagination[pageSize]=4",
    pressRelease: {
      allBlogs: "blogs?populate=*&filters[$and][0][blogType][$eq]=pressRelease",
      blogById: "blogs/",
      top4blog:
        "blogs?populate=*&filters[$and][0][blogType][$eq]=pressRelease&pagination[page]=1&pagination[pageSize]=4&sort=updatedAt:ASC",
    },
    acheivements: {
      allBlogs: "blogs?populate=*&filters[$and][0][blogType][$eq]=acheivements",
      blogById: "blogs/",
      top4blog:
        "blogs?populate=*&filters[$and][0][blogType][$eq]=acheivements&pagination[page]=1&pagination[pageSize]=4&sort=updatedAt:ASC",
    },
    services: {
      allBlogs: "blogs?populate=*&filters[$and][0][blogType][$eq]=services",
      blogById: "blogs/",
      top4blog:
        "blogs?populate=*&filters[$and][0][blogType][$eq]=services&pagination[page]=1&pagination[pageSize]=4&sort=updatedAt:ASC",
    },
    socialMediaLink: "social-medial-link?populate=*",
    headersImage: "header-banner-image?populate=*",
    announcements: "home-announcements",
    event:
      "blogs?populate=*&filters[$and][0][blogType][$eq]=pressRelease&sort=id:ASC&filters[$and][0][id][$gte]=2",
    eventMedia: "event-media?populate=*",
    pressMedia: "event?populate=*", // /event = pressMeida route!
    administration: "administrations?populate=*",
    wing: "wings?populate=*",
    marquees: "marquees?populate=*",
    verticalMarquees: "vertical-marquees?populate=*",
    navButtons: "nav-buttons?populate=*",
    profVideo: "prof-video?populate=*",
    sliders: "sliders?populate=*",
  },
  ssgFetchBlogUrl: "blogs?populate=*",
  siteUrl: "http://tmmk.info:3000",
  fieldName: "field-names?populate=*",
};

export { AppConfig };

// -----------Filter----------
// &sort=id:ASC&filters[$and][0][id][$gte]=2
