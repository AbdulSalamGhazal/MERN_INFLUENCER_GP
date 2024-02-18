import { Box, Typography, Paper } from "@mui/material";
import useAuth from "../../../context/AuthContext";

function ChatView({ chat }) {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        bgcolor: "lightgray",
        height: "100%",
        overflowY: "auto", // To handle scrolling
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Messages start from the top
        p: 3, // Padding around the entire chat area
        width: "100%", // Ensure this Box takes the full width
      }}
    >
      {!chat ? (
        <Typography variant="h5" color="textSecondary">
          Click on a user to start chatting
        </Typography>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Chat with {chat.receiverName}
          </Typography>
          {/* Iterate over messages */}
          {chat.messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === user.type ? "flex-end" : "flex-start",
                mb: 1,
                width: "100%", // Ensure each message Box also takes the full width
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  maxWidth: "80%",
                  padding: 1,
                  bgcolor: message.sender === user.type ? "#f0f0f0" : "#e0e0e0",
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ChatView;
