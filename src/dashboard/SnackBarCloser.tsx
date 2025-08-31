import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function SnackbarCloser() {
  const location = useLocation();
  const { closeSnackbar } = useSnackbar();

  useEffect(() => {
    // Close all snackbars whenever location changes
    closeSnackbar();
  }, [location, closeSnackbar]);

  return null;
}
