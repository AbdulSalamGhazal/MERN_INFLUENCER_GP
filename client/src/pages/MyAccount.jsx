import useAuth from "../../context/AuthContext";
import MyAccountInfluencer from "./MyAccountInfluencer";
import MyAccountBusiness from "./MyAccountBusiness";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
const MyAccount = () => {
  const { user, loading } = useAuth();
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!user.isActive && (
            <Alert severity="error">
              يجب عليك تحديث المعلومات لتفعيل حسابك
            </Alert>
          )}
          {user.type === "Influencer" ? (
            <MyAccountInfluencer user={user} />
          ) : (
            <MyAccountBusiness user={user} />
          )}
        </>
      )}
    </>
  );
};

export default MyAccount;
