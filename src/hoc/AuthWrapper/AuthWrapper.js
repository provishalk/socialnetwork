import React from "react";
import "./AuthWrapper.scss";
import ParticlesBg from "particles-bg";
const AuthWrapper = (props) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center authwrapper_container">
        <div className="col-md-4 border p-4 authwrapper_container__content bg-white">
          {props.children}
        </div>
      </div>
      <ParticlesBg color="#D3D3D3" type="cobweb" bg={true} />
    </>
  );
};

export default AuthWrapper;
