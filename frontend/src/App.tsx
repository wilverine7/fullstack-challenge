import {
  Box,
  Typography,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          🌟 Welcome to SponsorCX! 🌟
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Your premier platform for sponsorship management and deal tracking
        </Typography>
      </Box>

      <Box
        textAlign="center"
        p={4}
        mb={4}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Explore your deals!
        </Typography>
        <Button
          component={Link}
          to="/deals"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          View All Deals
        </Button>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom textAlign="center">
          Key Features
        </Typography>
        <List>
          {[
            "Track sponsorship opportunities",
            "Manage your organization's portfolio",
            "Discover new partnership deals",
            "Analyze sponsorship performance",
          ].map((feature) => (
            <ListItem key={feature}>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <Typography variant="body1">{feature}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
