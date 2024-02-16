import useAuth from "../../context/AuthContext";

function Home() {
  const { user } = useAuth();
  console.log(user);

  return <h1>Hi: {user?.name}</h1>;
}

export default Home;
