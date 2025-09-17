import ButtonAppBar from "../components/Header/Header";
import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Container } from "@mui/material";

export default function MainAppLayout(
  props: Readonly<{ me: AxiosResponse<any, any> | undefined }>
) {
  return (
    <>
      <ButtonAppBar me={props.me}></ButtonAppBar>
      <SideMenu me={props.me}></SideMenu>
      <main>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 4 }}>
          <Outlet />
        </Container>
      </main>
    </>
  );
}
