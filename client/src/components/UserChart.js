import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserChart({ title, data, dataKey, grid }) {
  return (
    <Box
      sx={{
        margin: "20px",
        padding: "20px",
        webkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
        boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
