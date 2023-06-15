import React from "react";

const Loader = () => {
  return (
    <div className="container mt-5 mt-5 d-flex align-items-center justify-content-center">
      <div className="spinner-border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    </div>
  );
};

export default Loader;
