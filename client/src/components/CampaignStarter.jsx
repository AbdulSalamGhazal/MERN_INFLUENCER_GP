import { useState, Fragment } from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import useAuth from "../../context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Grid from "@mui/material/Unstable_Grid2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "400px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CampaignStarter({ conditions, receiverId }) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignAmount, setCampaignAmount] = useState(0);
  const [campaignDate, setCampaignDate] = useState("");

  const handleChangeCampaignName = (event) => {
    setCampaignName(event.target.value);
  };
  const handleChangeCampaignAmount = (event) => {
    setCampaignAmount(event.target.value);
  };
  const handleChangeCampaignDate = (value) => {
    setCampaignDate(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const turnToCampaign = async () => {
    try {
      await axios.post(
        "http://localhost:3001/campaign",
        {
          campaignName: campaignName,
          conditions: conditions,
          receiverId: receiverId,
          amount: campaignAmount,
          date: campaignDate
        },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      setCampaignName("");
      setCampaignAmount(0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <IconButton aria-label="تحويل لحملة" size="large" sx={{ color: "white" }}>
        <RocketLaunchIcon onClick={handleClickOpen} sx={{ fontSize: 28 }} />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          تحويل المحادثة إلى حملة إعلانية
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
            <Grid xs={12}>
              <TextField
                value={campaignName}
                id="outlined-basic"
                label="اسم الحملة"
                onChange={handleChangeCampaignName}
                fullWidth
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                id="outlined-number"
                label="المبلغ"
                type="number"
                value={campaignAmount}
                onChange={handleChangeCampaignAmount}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={6}>
              <LocalizationProvider sx={{ mx: 2 }} dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="تاريخ التنفيذ"
                  value={campaignDate}
                  onChange={handleChangeCampaignDate}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12}>
              <Typography gutterBottom>الشروط:</Typography>
              <List>
                {conditions.map((condition, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={condition.content} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={turnToCampaign}>
            تحويل
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}