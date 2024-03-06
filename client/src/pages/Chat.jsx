import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import ChatList from "../components/Chat/ChatList";
import ChatView from "../components/Chat/ChatView";
import useAuth from "../../context/AuthContext";

function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  let { recieverId } = useParams();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:3001/chat", {
          headers: {
            Authorization: `Bearer ${user.token} ${user.type}`,
          },
        });
        setChats(response.data);
        setIsChatLoaded(true);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    if (user._id) {
      fetchChats();
    }
  }, [user]);
  useEffect(() => {
    const selectChat = async () => {
      if (recieverId && isChatLoaded) {
        const chatWithReceiver = chats.find(
          (chat) => chat.receiverId === recieverId
        );
        if (chatWithReceiver) {
          setSelectedChat(chatWithReceiver);
        } else {
          try {
            const response = await axios.post(
              "http://localhost:3001/chat",
              {
                receiver_id: recieverId,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.token} ${user.type}`,
                },
              }
            );
            const newChat = response.data;
            console.log("the new Chat is ", newChat);
            console.log("all of the chat...", chats);
            setChats([...chats, newChat]);
            setSelectedChat(newChat);
          } catch (error) {
            console.error("Error fetching chats:", error);
          }
        }
      }
    };
    selectChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recieverId, isChatLoaded]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid container sx={{ height: "90vh", overflow: "hidden" }}>
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
