import { Outlet } from "react-router-dom";

export const DisplayPanelLayout = () => (
  <div
    style={{
      backgroundColor: "black",
      height: "95vh",
      color: "white",
      overflowY: "hidden",
      overflowX: "hidden"
    }}
  >
    <Outlet />
  </div>
);
