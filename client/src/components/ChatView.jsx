import Typography from "@mui/material/Typography";

function ChatView({ chat }) {
  if (!chat) return <Typography>Select a chat</Typography>;

  return (
    <Typography variant="h5" component="h2">
      content
    </Typography>
  );
}

export default ChatView;
