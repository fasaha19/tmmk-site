const AppConfig: any = {
  host: "http://tmmk.info:5505",
  baseURL: "http://tmmk.info:5505/api/",
  routes: {
    aboutUs: "aboutuses?populate=*",
    blog:
    {
      allBlogs: "blogs?populate=*&filters[$and][0][blogType][$eq]=blog",
      blogById: 'blogs/',
      top4blog: "blogs?populate=*&filters[$and][0][blogType][$eq]=blog&pagination[page]=1&pagination[pageSize]=4"
    },
    featuredVideo: "home-featured-videos?populate=*&pagination[page]=1&pagination[pageSize]=4",
    pressRelease: {
      allBlogs: "blogs?populate=*&filters[$and][0][blogType][$eq]=pressRelease",
      blogById: "blogs/",
      top4blog: "blogs?populate=*&filters[$and][0][blogType][$eq]=pressRelease&pagination[page]=1&pagination[pageSize]=4"
    },
    socialMediaLink: "social-medial-link?populate=*",
    announcements: "home-announcements",
    event: "blogs?populate=*&filters[$and][0][blogType][$eq]=pressRelease&sort=id:ASC&filters[$and][0][id][$gte]=2",
    eventMedia: "event-media?populate=*",
    pressMedia: "event?populate=*", // /event = pressMeida route!
  },
  ssgFetchBlogUrl: "blogs?populate=*",
  siteUrl: "http://tmmk.info:3000"
};

export { AppConfig, };



// -----------Filter----------
// &sort=id:ASC&filters[$and][0][id][$gte]=2