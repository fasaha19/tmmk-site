const AppConfig: any = {
  host: "http://tmmk.info:5505",
  baseURL: "http://tmmk.info:5505/api/",
  routes: {
    aboutUs: "aboutuses?populate=*",
    blog:
      { allBlogs: "blogs?populate=*&populate=blog.image", blogById: 'blogs/' },
    featuredVideo: "home-featured-videos?populate=*",
    pressRelease: {
      allBlogs: "home-press-releases?populate=*&populate=pressRelease.image", blogById: "home-press-releases/"
    },
    announcements: "home-announcements"

  },
};

export default AppConfig;
