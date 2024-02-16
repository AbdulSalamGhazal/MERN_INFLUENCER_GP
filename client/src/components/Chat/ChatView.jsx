import { Box, Typography } from "@mui/material";

function ChatView({ chat }) {
  return (
    <Box
      sx={{
        bgcolor: "lightgray",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!chat ? (
        <Typography variant="h5" color="textSecondary">
          Click on a user to start chatting
        </Typography>
      ) : (
        // Chat messages and input field will go here when a chat is selected
        <Box sx={{ p: 3 }}>
          {" "}
          {/* Inner content should have padding */}
          {/* Content of the chat */}
          <Typography variant="h4">Chat with {chat.name}</Typography>
          {/* Add message components here */}
        </Box>
      )}
    </Box>
  );
}

export default ChatView;
