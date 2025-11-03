import { AppBar } from "@mui/material";
import { useEffect, useState } from "react";
import { eventsHooks } from "../../hooks";
import styles from "./announcement.module.css";

export default function Announcement() {
  const { data } = eventsHooks.useFetchAnnouncementData();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dismissedAnnouncementIds");
    if (stored) {
      try {
        setDismissedIds(JSON.parse(stored));
      } catch {
        localStorage.removeItem("dismissedAnnouncementIds");
      }
    }
  }, []);

  const handleClose = (announcementId: string) => {
    const updated = [...dismissedIds, announcementId];
    setDismissedIds(updated);
    localStorage.setItem("dismissedAnnouncementIds", JSON.stringify(updated));
  };

  const activeAnnouncements =
    data?.data?.filter(
      (announcement: any) => !dismissedIds.includes(announcement.id?.toString())
    ) || [];

  return (
    <>
      {activeAnnouncements.map((announcement: any) => (
        <AppBar
          key={announcement.id}
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
          position="sticky"
        >
          <div className={styles.scroll_container}>
            <div className={styles.scroll_text}>{announcement.message}</div>
          </div>
          <button
            className={styles.close_btn}
            onClick={() => handleClose(announcement.id.toString())}
          >
            ✕
          </button>
        </AppBar>
      ))}
    </>
  );
}
