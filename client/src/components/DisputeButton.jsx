import { useState, Fragment } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import useAuth from "../../context/AuthContext";
import Grid from "@mui/material/Unstable_Grid2";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "400px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CampaignStarter({ campaign }) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [disputeDesc, setDisputeDesc] = useState("");

  const handleChangeDisputeDesc = (event) => {
    setDisputeDesc(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const processDispute = async () => {
    try {
      await axios.patch(
        `http://localhost:3001/campaign/dispute/${campaign._id}`,
        {
          disputeDesc: disputeDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      setDisputeDesc("");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ height: "40px", color: "red", borderColor: "red", width: "50%" }}
      >
        تقديم طلب خلاف
        <ReportProblemIcon sx={{ ml: 2, fontSize: 28, color: "primary" }} />
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          تقديم طلب خلاف
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={disputeDesc}
                  id="outlined-basic"
                  label="وصف الخلاف"
                  onChange={handleChangeDisputeDesc}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={processDispute}>
            إرسال
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}
