import { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl } from "@mui/material";
import useAuth from "../../context/AuthContext";
import TextField from "@mui/material/TextField";

const ChangeStatus = ({ campaign, isReadOnly }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      await axios.patch(
        `http://localhost:3001/campaign/status/${campaign._id}`,
        { newStatus: selectedOption },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    setSelectedOption(campaign.status);
  }, [campaign.status]);

  useEffect(() => {
    if (selectedOption && selectedOption !== campaign.status) {
      fetchData();
    }
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    if (!isReadOnly) {
      setSelectedOption(event.target.value);
    }
  };

  return (
    <FormControl fullWidth>
      {isReadOnly ? (
        <TextField
          fullWidth
          defaultValue={campaign.status}
          InputProps={{
            readOnly: true,
          }}
        />
      ) : (
        <Select
          labelId="select-label"
          id="select"
          value={selectedOption}
          onChange={handleSelectChange}
          disabled={isReadOnly}
        >
          <MenuItem value={"لم يحن الموعد"}>لم يحن الموعد</MenuItem>
          <MenuItem value={"جاري التنفيذ"}>جاري التنفيذ</MenuItem>
          <MenuItem value={"تم الانتهاء"}>تم الانتهاء</MenuItem>
        </Select>
      )}
    </FormControl>
  );
};

export default ChangeStatus;
