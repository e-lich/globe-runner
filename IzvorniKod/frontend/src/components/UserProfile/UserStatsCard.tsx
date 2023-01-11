import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Title, Legend } from "chart.js";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
Chart.register(ArcElement);
Chart.register(Title);
Chart.register(Legend);

export default function UserStatsCard() {
  const [chartData, setChartData] = useState({
    labels: ["Won", "Lost"],
    datasets: [
      {
        label: "Fights",
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: [0, 0],
      },
    ],
  });

  const [numOfFights, setNumOfFights] = useState(0);

  useEffect(() => {
    const getInventoryCards = async () => {
      const response = await axios.get("users/stats");
      setNumOfFights(response.data.fightsNum);
      setChartData({
        labels: ["Won", "Lost"],
        datasets: [
          {
            label: "Fights",
            backgroundColor: ["#B21F00", "#C9DE00"],
            hoverBackgroundColor: ["#501800", "#4B5000"],
            data: [response.data.fightsWon, response.data.fightsLost],
          },
        ],
      });
    };

    getInventoryCards();
  }, []);

  return (
    <Card sx={{ height: "24em" }}>
      {chartData && numOfFights > 0 && (
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
              title: {
                display: true,
                text: "Fights",
              },
            },
          }}
        />
      )}
      {numOfFights === 0 && (
        <Box justifyContent="center" display="flex">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 0.4, minHeight: "50vh" }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              You haven't played any fights yet.
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
}
