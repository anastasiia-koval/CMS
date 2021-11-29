import React from "react";

const PaddedSite = (Component) => {
  const HocComponent = ({ ...props }) => (
    <div style={{ padding: "100px 30px 30px" }}>
      <div style={{ margin: "auto", maxWidth: "1280px" }}>
        <Component />
      </div>
    </div>
  );
  return HocComponent;
};

export default PaddedSite;
