const AppConfig = {
  host: "http://tmmk.info:5505",
  baseURL: "http://tmmk.info:5505/api/",
  routes: {
    aboutUs: "aboutuses?populate=*",
    blogs:
      { allBlogs: "blogs?populate=*&populate=blog.image", blogById: 'blogs/' }
  },
};

export default AppConfig;
