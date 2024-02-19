import { AppBar, Box, Paper, Toolbar, Typography } from "@mui/material";
import useAuth from "../../../context/AuthContext"; // Adjust the import path as necessary

function ChatView({ chat }) {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        bgcolor: "#f0f0f0",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar
          variant="dense"
          sx={{ minHeight: "48px", paddingRight: "16px", paddingLeft: "16px" }}
        >
          {chat ? (
            <Typography variant="h6" color="inherit">
              Chat with {chat.receiverName}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              color="inherit"
              sx={{ visibility: "hidden" }}
            >
              Placeholder
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      {chat ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          {chat.messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === user.type ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  maxWidth: "80%",
                  padding: 1,
                  bgcolor: message.sender === user.type ? "#ADD8E6" : "#90EE90",
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="textSecondary">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ChatView;
