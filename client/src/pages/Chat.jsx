import { useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import ChatList from "../components/Chat/ChatList"; // Adjust the import path as necessary
import ChatView from "../components/Chat/ChatView"; // Adjust the import path as necessary
import useAuth from "../../context/AuthContext"; // Adjust the import path as necessary

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
      <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
        <Grid item xs={4} sx={{ bgcolor: "#f7f7f7", pr: 0 }}>
          <Paper
            elevation={3}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <ChatList
              setSelectedChat={setSelectedChat}
              chats={chats}
              selectedChat={selectedChat}
            />
          </Paper>
        </Grid>
        <Grid item xs={8} sx={{ bgcolor: "#f0f0f0", pl: 1 }}>
          <Paper
            elevation={3}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <ChatView chat={selectedChat} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
