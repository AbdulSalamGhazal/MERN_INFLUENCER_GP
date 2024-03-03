import { useState } from "react";
import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import useAuth from "../../../context/AuthContext";
import axios from "axios";

function ChatView({ chat }) {
  const { user } = useAuth();
  const [messageText, setMessageText] = useState("");

  const handleMessageSend = async (chatData) => {
    try {
      const receiver_id =
        user.type === "Influencer"
          ? chatData.businessId._id
          : chatData.influencerId._id;
      await axios.post(
        `http://localhost:3001/chat/message/${receiver_id}`,
        {
          content: messageText,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f0f0f0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar
          variant="dense"
          sx={{ minHeight: "48px", paddingRight: "16px", paddingLeft: "16px" }}
        >
          {chat ? (
            <Typography variant="h6" color="inherit">
              {chat.receiverName}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              color="inherit"
              sx={{ visibility: "hidden" }}
            >
              Placeholder
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      {chat ? (
        <>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 3,
            }}
          >
            {chat.messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === user.type ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    maxWidth: "80%",
                    padding: 1,
                    bgcolor:
                      message.sender === user.type ? "#ADD8E6" : "#90EE90", // Different background colors for sender and receiver
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                </Paper>
              </Box>
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
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)} // Update the message text as the user types
              sx={{ marginRight: "8px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMessageSend(chat)}
            >
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="textSecondary">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ChatView;
