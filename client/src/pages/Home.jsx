import useAuth from "../../context/authContext";

function Home() {
  const { user } = useAuth();

  return <h1>Hi: {user._id}</h1>;
}

export default Home;
