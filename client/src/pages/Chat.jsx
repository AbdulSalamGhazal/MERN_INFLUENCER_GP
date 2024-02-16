import { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import ChatList from "../components/Chat/ChatList";
import ChatView from "../components/Chat/ChatView";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

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
            <ChatList setSelectedChat={setSelectedChat} />
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

export default App;
