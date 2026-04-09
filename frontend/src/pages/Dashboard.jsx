import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />  

      <div style={{ padding: "20px" }}>
        <h1>Welcome to Dashboard 🚀</h1>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </>
  );
};

export default Dashboard;