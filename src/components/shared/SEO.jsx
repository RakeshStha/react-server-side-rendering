import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, name, type }) => {
  let titles = title ? title : "React SSR";
  let descriptions = description
    ? description
    : "This is react server side rendering example";
  let types = type ? type : "blog";
  let Name = name ? name : "SSR";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{titles}</title>
      <meta name="description" content={descriptions} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={types} />
      <meta property="og:title" content={titles} />
      <meta property="og:description" content={descriptions} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={Name} />
      <meta name="twitter:card" content={types} />
      <meta name="twitter:title" content={titles} />
      <meta name="twitter:description" content={descriptions} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default SEO;
