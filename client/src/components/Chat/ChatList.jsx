import {
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

function ChatList({ setSelectedChat }) {
  const chats = [
    { name: "John Doe", message: "Let's meet someday" },
    { name: "Testing", message: "Yo guys, all good?" },
  ];

  return (
    <List sx={{ bgcolor: "lightgray", height: "100%", overflowY: "auto" }}>
      <AppBar position="static" sx={{ bgcolor: "white", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
            My Chats
          </Typography>
        </Toolbar>
      </AppBar>
      {chats.map((chat, index) => (
        <ListItem
          button
          key={index}
          onClick={() => setSelectedChat(chat)}
          sx={{ bgcolor: "white", mb: 1, boxShadow: 1 }}
        >
          <ListItemText primary={chat.name} secondary={chat.message} />
        </ListItem>
      ))}
    </List>
  );
}

export default ChatList;
