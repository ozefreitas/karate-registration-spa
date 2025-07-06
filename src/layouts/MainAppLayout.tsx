import ButtonAppBar from "../components/Header/Header";
import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";
import { AxiosResponse } from "axios";

export default function MainAppLayout(
  props: Readonly<{ me: AxiosResponse<any, any> | undefined }>
) {
  return (
    <>
      <ButtonAppBar me={props.me}></ButtonAppBar>
      <SideMenu me={props.me}></SideMenu>
      <main>
        <Outlet />
      </main>
    </>
  );
}
