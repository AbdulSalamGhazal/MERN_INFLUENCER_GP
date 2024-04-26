import useAuth from "../../context/AuthContext";
import MyAccountInfluencer from "./MyAccountInfluencer";
import MyAccountBusiness from "./MyAccountBusiness"

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <>
    {user.type == 'Influencer'? <MyAccountInfluencer user={user} /> : <MyAccountBusiness user={user} />}
    </>
  )
}

export default MyAccount