import { useState, useEffect, Fragment } from "react";
import useAuth from "../../context/AuthContext";
import axios from "axios";
import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
function CampaignLogs({ campaign }) {
  const { user } = useAuth();
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/campaign/notes/${campaign._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const handleNoteSend = async () => {
    console.log("running");
    console.log(campaign);
    try {
      await axios.post(
        `http://localhost:3001/campaign/notes/${campaign._id}`,
        {
          content: noteText,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      setNoteText("");
      fetchNotes();
    } catch (error) {
      console.error("Error sending Log:", error);
    }
  };
  useEffect(() => {
    if (campaign) {
      fetchNotes();
      const interval = setInterval(fetchNotes, 3000);
      return () => clearInterval(interval);
    }
  }, [campaign]);
  return (
    <Box
      sx={{
        bgcolor: "#f0f0f0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid gray",
      }}
    >
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar
          variant="dense"
          sx={{
            minHeight: "48px",
            paddingRight: "16px",
            paddingLeft: "16px",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="inherit">
            سجل الملاحظات
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flexGrow: 1,
          height: "200px",
          overflow: "auto",
          p: 3,
          bgcolor: "white",
        }}
      >
        {notes.map((note, index) => (
          <Fragment key={index}>
            {index === 0 ||
            new Date(note.updatedAt).toLocaleDateString() !==
              new Date(notes[index - 1].updatedAt).toLocaleDateString() ? (
              <Typography
                sx={{
                  textAlign: "center",
                  marginBottom: "8px",
                }}
                variant="body2"
                color="text.secondary"
              >
                {new Date(note.updatedAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            ) : null}
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  note.sender === user.type ? "flex-start" : "flex-end",
                mb: 1,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  maxWidth: "80%",
                  padding: 1,
                  pb: 0,
                  bgcolor: note.sender === user.type ? "#90EE90" : "#ADD8E6",
                }}
              >
                <Typography variant="body1">{note.content}</Typography>
                <Typography
                  sx={{ p: 0 }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {new Date(note.updatedAt).toLocaleTimeString("ar-EG", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Typography>
              </Paper>
            </Box>
          </Fragment>
        ))}
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          borderTop: "1px solid #ccc",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          autoFocus={true}
          fullWidth
          variant="outlined"
          placeholder="اكتب ملاحظة..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleNoteSend();
            }
          }}
          sx={{ marginRight: "8px", bgcolor: "white" }}
        />
        <Button variant="contained" color="primary" onClick={handleNoteSend}>
          إرسال
        </Button>
      </Box>
    </Box>
  );
}

export default CampaignLogs;
