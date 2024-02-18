import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import ChatList from "../components/Chat/ChatList";
import ChatView from "../components/Chat/ChatView";
import useAuth from "../../context/AuthContext";

function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:3001/chat", {
          params: {
            userId: user._id,
            userType: user.type,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    if (user._id) {
      fetchChats();
    }
  }, [user._id, user.type]);
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={4} sx={{ bgcolor: "gray" }}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ChatList setSelectedChat={setSelectedChat} chats={chats} />
          </Paper>
        </Grid>
        <Grid item xs={8} sx={{ bgcolor: "lightgray" }}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChatView chat={selectedChat} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
