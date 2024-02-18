import {
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

function ChatList({ setSelectedChat, chats }) {
  return (
    <List sx={{ bgcolor: "lightgray", height: "100%", overflowY: "auto" }}>
      <AppBar position="static" sx={{ bgcolor: "white", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
            My Chats
          </Typography>
        </Toolbar>
      </AppBar>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <ListItem
            button
            key={index}
            onClick={() => setSelectedChat(chat)}
            sx={{ bgcolor: "white", mb: 1, boxShadow: 1 }}
          >
            <ListItemText
              primary={chat.receiverName}
              secondary={chat.lastMessage || "No messages yet"}
            />
          </ListItem>
        ))
      ) : (
        <Typography sx={{ p: 2, textAlign: "center" }}>
          No chats found
        </Typography>
      )}
    </List>
  );
}

export default ChatList;
