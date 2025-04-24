import { Card, CardContent, Typography } from '@mui/material';

const DashboardCard = ({ title, value }) => (
  <Card sx={{ minWidth: 200, m: 1 }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default DashboardCard;
