import { useState, useEffect } from "react";
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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chat) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [chat]);

  const fetchMessages = async () => {
    try {
      const receiver_id =
        user.type === "Influencer"
          ? chat.businessId._id
          : chat.influencerId._id;
      const response = await axios.get(
        `http://localhost:3001/chat/message/${receiver_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleMessageSend = async () => {
    try {
      const receiver_id =
        user.type === "Influencer"
          ? chat.businessId._id
          : chat.influencerId._id;
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
      fetchMessages();
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
            {messages.map((message, index) => (
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
                      message.sender === user.type ? "#ADD8E6" : "#90EE90",
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
              autoFocus={true}
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)} // Update the message text as the user types
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission
                  handleMessageSend();
                }
              }}
              sx={{ marginRight: "8px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleMessageSend}
            >
              إرسال
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
            اضغط على مستخدم لبدء المحادثة
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ChatView;
