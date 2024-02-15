import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const chats = ["Chat 1", "Chat 2", "Chat 3"]; // Example chat list

function ChatList({ setSelectedChat }) {
  return (
    <List>
      {chats.map((chat, index) => (
        <ListItem button key={index} onClick={() => setSelectedChat(chat)}>
          <ListItemText primary={chat} />
        </ListItem>
      ))}
    </List>
  );
}

export default ChatList;
