import { useEffect, useState } from "react";
import Axios from "../../config/axios";
import { Box, Grid, AppBar, Toolbar, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import WithAppBar from "../../layouts/WithAppbar";
import ControlTab from "../../components/ControlTab";

export default function DashboardPage() {
  const [depositAddress, setDepositAddress] = useState("");
  const { user } = useAuth();

  const getDepositAddress = () => {
    Axios.get('/wallet')
      .then(res => {
        setDepositAddress(res.data);
        console.log("address: ", res.data);
      })
      .catch(error => {
        const msg = error.data.message;
        console.log("error: ", msg);
      })
  }

  useEffect(() => {
    getDepositAddress();
  }, [])

  return (
    <div>
      <WithAppBar />
      <Box sx={{ mt: 2, width: '100%', padding: 0 }}>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid
            item
            xs={8}
            sx={{
              backgroundImage: 'url("/img/9.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 'calc(100vh - 65px)'
            }}
          >
            <Box p={2}>
              <h3>Left Side Content</h3>
              <p>This is some placeholder content for the left side.</p>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <ControlTab depositAddress = {depositAddress} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}