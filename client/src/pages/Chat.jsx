import { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import ChatList from "../components/ChatList";
import ChatView from "../components/ChatView";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <ChatList setSelectedChat={setSelectedChat} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={3}>
            <ChatView chat={selectedChat} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
