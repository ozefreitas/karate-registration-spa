import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

const SnackbarCloser: React.FC = () => {
  const location = useLocation();
  const { closeSnackbar } = useSnackbar();
  const prevPath = useRef(location.pathname);
  const clicked = useRef(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Only flag clicks on links or buttons
      const clickable = target.closest("a, button, [role='button']");
      if (clickable) {
        clicked.current = true;
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      // Path actually changed
      if (clicked.current) {
        closeSnackbar(); // Close only if user clicked something
      }
      prevPath.current = location.pathname;
      clicked.current = false; // reset
    }
  }, [location, closeSnackbar]);

  // Always handle back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      closeSnackbar();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeSnackbar]);

  return null;
};

export default SnackbarCloser;
