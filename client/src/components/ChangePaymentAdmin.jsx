import { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl } from "@mui/material";

const ChangePaymentAdmin = ({ campaign }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const fetchData = async () => {
    try {
      await axios.patch(`http://localhost:3001/admin/payment/${campaign._id}`, {
        newPayment: selectedOption,
      });
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    setSelectedOption(campaign.payment);
  }, [campaign.status]);

  useEffect(() => {
    if (selectedOption && selectedOption !== campaign.payment) {
      fetchData();
    }
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId="select-label"
        id="select"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <MenuItem value={"لم يتم الدفع"}>لم يتم الدفع</MenuItem>
        <MenuItem value={"تم التحويل، جاري التحقق"}>
          تم التحويل، جاري التحقق
        </MenuItem>
        <MenuItem value={"تم استلام المبلغ"}>تم استلام المبلغ</MenuItem>
        <MenuItem value={"تم تحويل المبلغ"}>تم تحويل المبلغ</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ChangePaymentAdmin;
