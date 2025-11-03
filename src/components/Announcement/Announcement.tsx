import { AppBar } from "@mui/material";
import { useEffect, useState } from "react";
import { eventsHooks } from "../../hooks";
import styles from "./announcement.module.css";

export default function Announcement() {
  const { data } = eventsHooks.useFetchAnnouncementData();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

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

  // 🌟 Delayed visibility per banner
  useEffect(() => {
    activeAnnouncements.forEach((_: any, index: number) => {
      const delay = index * 5000; // 5s per banner
      setTimeout(() => {
        setVisibleIndexes((prev) => [...prev, index]);
      }, delay);
    });
  }, [activeAnnouncements]);

  return (
    <>
      {activeAnnouncements.map((announcement: any, index: number) => {
        const isVisible = visibleIndexes.includes(index);
        return (
          <AppBar
            key={announcement.id}
            className={styles.announcement_banner}
            sx={{
              borderRadius: 2,
              width: "99%",
              p: 1,
              flexDirection: "row",
              margin: "auto",
              top: index * 50,
              mb: 1,
              backgroundColor: "#e81c24",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(-10px)",
            }}
            position="sticky"
          >
            <div className={styles.scroll_container}>
              <div
                className={styles.scroll_text}
                style={{
                  animationDelay: `${index * 5}s`, // 👈 delay start by 2s per banner
                }}
              >
                {announcement.message}
              </div>
            </div>
            <button
              className={styles.close_btn}
              onClick={() => handleClose(announcement.id.toString())}
            >
              ✕
            </button>
          </AppBar>
        );
      })}
    </>
  );
}
