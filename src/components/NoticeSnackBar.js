import { Alert, Snackbar } from "@mui/material";
import { useSnackBarState } from "../states";

export default function NoticeSnackBar() {
  const snackBarState = useSnackBarState();
  return (
    <>
      <Snackbar open={snackBarState.snackbarData.open} autoHideDuration={snackBarState.snackbarData.duration} onClose={snackBarState.handleClose}>
        <Alert
          onClose={snackBarState.handleClose}
          severity={snackBarState.snackbarData.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarState.snackbarData.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
