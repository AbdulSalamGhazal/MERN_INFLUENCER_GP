import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import BackspaceIcon from "@mui/icons-material/Backspace";

function Filters({ setFilters }) {
  const updateFilters = (newFilter) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };
  const [search, setSearch] = useState("");
  const handleChangeSearch = (event) => {
    let searchTerm = event.target.value;
    setSearch(searchTerm);
    updateFilters({ campaignName: searchTerm });
  };
  const [status, setStatus] = useState([]);
  const handleChangeStatus = (event) => {
    const {
      target: { value },
    } = event;
    let newStatus = typeof value === "string" ? value.split(",") : value;
    setStatus(newStatus);
    updateFilters({ status: newStatus });
  };
  const [payment, setPayment] = useState([]);
  const handleChangePayment = (event) => {
    const {
      target: { value },
    } = event;
    let newPayment = typeof value === "string" ? value.split(",") : value;
    setPayment(newPayment);
    updateFilters({ payment: newPayment });
  };

  const [checked, setChecked] = useState(true);
  const handleChangeApproved = (event) => {
    let isApproved = event.target.checked;
    setChecked(isApproved);
    updateFilters({ isApproved: isApproved });
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus([]);
    setPayment([]);
    setChecked(true);

    updateFilters({
      campaignName: "",
      status: [],
      payment: [],
      verified: true,
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, pl: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <TextField
              value={search}
              id="outlined-basic"
              label="بحث"
              onChange={handleChangeSearch}
              fullWidth
            />
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="status-label">الحالة</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                label="status"
                multiple
                value={status}
                onChange={handleChangeStatus}
                input={<OutlinedInput label="status" />}
              >
                <MenuItem value={"لم يحن الموعد"}>لم يحن الموعد</MenuItem>
                <MenuItem value={"جاري التنفيذ"}>جاري التنفيذ</MenuItem>
                <MenuItem value={"تم الانتهاء"}>تم الانتهاء</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} dir="rtl">
            <FormControl fullWidth dir="rtl">
              <InputLabel dir="rtl" id="payment-label">
                الدفع
              </InputLabel>
              <Select
                dir="rtl"
                labelId="payment-label"
                id="payment"
                label="payment"
                multiple
                value={payment}
                onChange={handleChangePayment}
                input={<OutlinedInput label="payment" />}
              >
                <MenuItem value={"لم يتم الدفع"}>لم يتم الدفع</MenuItem>
                <MenuItem value={"تم استلام المبلغ"}>تم استلام المبلغ</MenuItem>
                <MenuItem value={"تم تحويل المبلغ"}>تم تحويل المبلغ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2}>
            <InputLabel id="check">معتمد؟</InputLabel>

            <Switch
              sx={{ ml: 4 }}
              checked={checked}
              onChange={handleChangeApproved}
            />
          </Grid>
          <Grid xs={1}>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              startIcon={<BackspaceIcon />}
              onClick={handleClearFilters}
            >
              حذف
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Filters;
