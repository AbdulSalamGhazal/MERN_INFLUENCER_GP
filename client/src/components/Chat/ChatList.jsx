import {
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

function ChatList({ setSelectedChat, chats, selectedChat }) {
  return (
    <List sx={{ bgcolor: "#f7f7f7", height: "100%", overflowY: "auto", pt: 0 }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            محادثاتي
          </Typography>
        </Toolbar>
      </AppBar>
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <ListItem
            button
            key={index}
            onClick={() => setSelectedChat(chat)}
            sx={{
              bgcolor:
                selectedChat && selectedChat._id === chat._id
                  ? "lightblue"
                  : "white",
              my: 1,
              boxShadow: 1,
            }}
          >
            <ListItemText
              primary={chat.receiverName}
              secondary={chat.lastMessage || "لايوجد رسائل"}
            />
          </ListItem>
        ))
      ) : (
        <Typography sx={{ p: 2, textAlign: "center" }}>
          لايوجد محادثات!
        </Typography>
      )}
    </List>
  );
}

export default ChatList;
