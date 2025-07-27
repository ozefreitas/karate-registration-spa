import CommonActions from "../../components/DisplayScreenComponents/CommonActions";
import KataElimControl from "../ControlPages/KataElimControl";
import KataFinalControl from "../ControlPages/KataFinalControl";
import KataTeamControl from "../ControlPages/KataTeamControl";
import KumiteIndivControl from "../ControlPages/KumiteIndivControl";
import KumiteTeamControl from "../ControlPages/KumiteTeamControl";

export default function ControlPage(
  props: Readonly<{ currentScreen: string }>
) {
  return (
    <>
      {props.currentScreen === "Kata Individual" ? (
        <KataElimControl></KataElimControl>
      ) : null}
      {props.currentScreen === "Final Kata Individual" ? (
        <KataFinalControl></KataFinalControl>
      ) : null}
      {props.currentScreen === "Kumite Individual" ? (
        <KumiteIndivControl></KumiteIndivControl>
      ) : null}
      {props.currentScreen === "Kata Equipa" ? (
        <KataTeamControl></KataTeamControl>
      ) : null}
      {props.currentScreen === "Kumite Equipa" ? (
        <KumiteTeamControl></KumiteTeamControl>
      ) : null}
      <CommonActions></CommonActions>
    </>
  );
}
