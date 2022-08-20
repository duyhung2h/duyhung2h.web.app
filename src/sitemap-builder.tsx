require("babel-register")({
    presets: ["es2015", "react"]
  });
  
  const router = require('./app/view/pages/App/AppContextProvider.tsx').default;
  const Sitemap = require('react-router-sitemap').default;
  
  (
      new Sitemap(router)
          .build('https://duyhung2h.web.app')
          .save('./public/sitemap.xml')
  );