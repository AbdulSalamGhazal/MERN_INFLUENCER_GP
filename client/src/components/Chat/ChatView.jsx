/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import useAuth from "../../../context/AuthContext";
import axios from "axios";

function ChatView({ chat }) {
  const { user } = useAuth();
  const [messageText, setMessageText] = useState("");
  const [isCondition, setIsCondition] = useState(false);
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
          isCondition: isCondition,
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
        border: "0.5px solid gray",
      }}
    >
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar
          variant="dense"
          sx={{ minHeight: "48px", paddingRight: "16px", paddingLeft: "16px" }}
        >
          {chat ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" color="inherit">
                {chat.receiverName}
              </Typography>
              {}
              <Link
                to={`/influencers/${chat.receiverId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton
                  aria-label="تفاصيل أكثر"
                  size="large"
                  sx={{ color: "white" }}
                >
                  <InfoIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Link>
            </Box>
          ) : (
            <Typography
              variant="h6"
              color="inherit"
              sx={{ visibility: "hidden" }}
            >
              لايوجد
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      {chat ? (
        <>
          <Box
            sx={{
              flexGrow: 1,
              height: "200px",
              overflow: "auto",
              p: 3,
              bgcolor: "white",
            }}
          >
            {messages.map((message, index) => (
              <Fragment key={index}>
                {index === 0 ||
                messages[index].date !== messages[index - 1].date ? (
                  <Typography
                    sx={{
                      textAlign: "center",
                      marginBottom: "8px",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(message.updatedAt).toLocaleDateString("ar-EG", {
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
                      message.sender === user.type ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      maxWidth: "80%",
                      padding: 1,
                      pb: 0,
                      bgcolor:
                        message.sender === user.type ? "#ADD8E6" : "#90EE90",
                      border: message.isCondition ? "3px solid black" : "none",
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography
                      sx={{ p: 0 }}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      {new Date(message.updatedAt).toLocaleTimeString("ar-EG", {
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
              placeholder="اكتب رسالة..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleMessageSend();
                }
              }}
              sx={{ marginRight: "8px", bgcolor: "white" }}
            />
            <FormControlLabel
              sx={{ m: 0 }}
              control={
                <Switch
                  checked={isCondition}
                  onChange={(e) => setIsCondition(e.target.checked)}
                />
              }
              label="شرط؟"
              labelPlacement="top"
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
