import { Card, CardContent, Typography, Box } from "@mui/material";

const DashboardCard = ({ title, value, icon, color }) => (
  <Card sx={{ minWidth: 200, m: 1, backgroundColor: color, color: "#fff", borderRadius: 3 }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ fontSize: 40, opacity: 0.7 }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default DashboardCard;
