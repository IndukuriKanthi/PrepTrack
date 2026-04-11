import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  

  return (
    <AppBar position="static">
      <Toolbar>

        {/* Logo / Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          PrepTrack
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Button color="inherit" onClick={() => navigate("/questions")}>
            Questions
          </Button>
          
          <Button color="inherit" onClick={() => navigate("/sessions")}>
            Sessions
          </Button>

          <Button color="inherit" onClick={() => navigate("/tasks")}>
            Tasks
          </Button>

          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>

          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;