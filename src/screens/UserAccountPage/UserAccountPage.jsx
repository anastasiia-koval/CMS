import { Skeleton } from "@material-ui/lab";
import React from "react";

const UserAccountPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "red",
          height: "100%",
          padding: "20px",
          width: "50%",
        }}
      >
        <div>Nastya Koval</div>
      </div>
      <div style={{ width: "100%", backgroundColor: "green" }}>
        Moje rezerwacje
      </div>
      <div></div>
    </div>
  );
};

export default UserAccountPage;
