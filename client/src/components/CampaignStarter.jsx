import { useEffect, useState, Fragment } from "react";
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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignAmount, setCampaignAmount] = useState(0);
  const [campaignDate, setCampaignDate] = useState("");
  const [disableButton, setDisableButton] = useState(false);

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
      const response = await axios.post(
        "http://localhost:3001/campaign",
        {
          campaignName: campaignName,
          conditions: conditions,
          receiverId: receiverId,
          amount: campaignAmount,
          date: campaignDate,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      setCampaignName("");
      setCampaignAmount(0);
      navigate(`/campaign/${response.data}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (conditions.length === 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [conditions]);

  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ height: "40px", border: "1px solid white" }}
      >
        تحويل إلى حملة
        <IconButton size="large" sx={{ color: "white" }}>
          <RocketLaunchIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Button>

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
                required
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                id="outlined-number"
                label="المبلغ"
                type="number"
                value={campaignAmount}
                onChange={handleChangeCampaignAmount}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={6}>
              <LocalizationProvider
                required
                sx={{ mx: 2 }}
                dateAdapter={AdapterDayjs}
              >
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
          <Button autoFocus onClick={turnToCampaign} disabled={disableButton}>
            تحويل
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}
