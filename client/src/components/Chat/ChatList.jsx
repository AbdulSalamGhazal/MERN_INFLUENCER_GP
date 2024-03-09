import {
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";

function ChatList({ setSelectedChat, chats, selectedChat }) {
  return (
    <List
      sx={{
        bgcolor: "#f7f7f7",
        height: "100%",
        overflowY: "auto",
        pt: 0,
        border: "0.5px solid gray",
      }}
    >
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
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="profile image"
              src={chat.receiverImage}
            />

            <ListItemText
              sx={{ pl: 1 }}
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
