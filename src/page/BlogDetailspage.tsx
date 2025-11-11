import React from "react";
import Banner from "../component/blogpage/BlogBanner";
import BlogDetails from "../component/blogdetailspage/BlogDetails";

const BlogDetailspage: React.FC = () => {
  
  return (
    <div>
      <Banner className="blogdetails-banner blog-banner-section" showFeatured={false} />
      <BlogDetails />
    </div>
  );
};

export default BlogDetailspage;
