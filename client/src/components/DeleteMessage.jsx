import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteMessage({ messageId }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteMessage = () => {
    console.log(`deleting message ${messageId}`);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClickOpen}
        size="small"
        sx={{
          mt: 4,
          "&": {
            "& svg": {
              opacity: 0.2,
            },
          },
          "&:hover": {
            backgroundColor: "transparent",
            "& svg": {
              opacity: 0.9,
            },
          },
        }}
      >
        <DeleteIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد أنك تريد حذف الرسالة
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button onClick={handleDeleteMessage} autoFocus>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
