import React from "react";
import "./AuthWrapper.scss";
import ParticlesBg from "particles-bg";
const AuthWrapper = ({ children }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center authwrapper_container">
        <div className="col-md-4 p-4 authwrapper_container__content bg-white">
          {children}
        </div>
      </div>
      <ParticlesBg color="#1da1f2" type="cobweb" bg={true} />
    </>
  );
};

export default AuthWrapper;
