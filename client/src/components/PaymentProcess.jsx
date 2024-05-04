import { useState, Fragment } from "react";
import PaidIcon from "@mui/icons-material/Paid";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "400px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CampaignStarter({ campaignId }) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [paymentNote, setPaymentNote] = useState("");

  const handleChangePaymentNote = (event) => {
    setPaymentNote(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const processPayment = async () => {
    try {
      await axios.patch(
        `http://localhost:3001/campaign/payment/${campaignId}`,
        {
          paymentNote: paymentNote,
          paymentFile: selectedFile,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPaymentNote("");
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Process the selected file here, such as uploading it to a server
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // Here you can send the file to the server using axios or fetch
    } else {
      console.log("No file selected.");
    }
  };
  return (
    <Fragment>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ height: "40px", color: "green", borderColor: "green" }}
      >
        تقديم طلب دفع
        <PaidIcon sx={{ ml: 2, fontSize: 28, color: "primary" }} />
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          تقديم طلب دفع مبلغ الحملة
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUpload}
                >
                  رفع مستند الحوالة
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={paymentNote}
                  id="outlined-basic"
                  label="ملاحظة"
                  onChange={handleChangePaymentNote}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={processPayment}>
            إرسال
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}
