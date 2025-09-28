import { AppBar } from "@mui/material";
import { eventsHooks } from "../../hooks";
import styles from "./announcement.module.css";
import { useEffect, useState } from "react";

export default function Announcement() {
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState<boolean>(false);
  const { data } = eventsHooks.useFetchAnnouncementData();

  const handleClose = () => {
    if (data) {
      localStorage.setItem("dismissedAnnouncementId", data.data.id);
      setIsAnnouncementOpen(false);
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      const dismissedId = localStorage.getItem("dismissedAnnouncementId");
      if (data?.data.id.toString() === dismissedId) {
        setIsAnnouncementOpen(false);
      } else setIsAnnouncementOpen(true);
    }
  }, [data]);

  if (!isAnnouncementOpen) return null;

  return (
    <AppBar
      className={styles.announcement_banner}
      sx={{
        borderRadius: 2,
        width: "99%",
        p: 1,
        flexDirection: "row",
        margin: "auto",
        top: 10,
        mb: 2,
        backgroundColor: "#e81c24",
      }}
      position={"sticky"}
    >
      <div className={styles.scroll_container}>
        <div className={styles.scroll_text}>{data?.data.message}</div>
      </div>
      <button className={styles.close_btn} onClick={handleClose}>
        ✕
      </button>
    </AppBar>
  );
}
