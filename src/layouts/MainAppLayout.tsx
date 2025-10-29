import Header from "../components/Header/Header";
import Announcement from "../components/Announcement/Announcement";
import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Container } from "@mui/material";

export default function MainAppLayout(
  props: Readonly<{ me: AxiosResponse<any, any> | undefined }>
) {
  return (
    <>
      {props.me?.data.role !== "main_admin" && (
        <Announcement></Announcement>
      )}
      <Header me={props.me}></Header>
      <SideMenu me={props.me}></SideMenu>
      <main>
        <Container maxWidth="xl" sx={{ mt: 0, mb: 4 }}>
          <Outlet />
        </Container>
      </main>
    </>
  );
}
