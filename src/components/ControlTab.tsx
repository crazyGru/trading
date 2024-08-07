import * as React from 'react';
import { Typography, Tabs, Tab, Box, TextField, Button, Grid} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ControlTabProps {
  depositAddress: String;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ControlTab(props: ControlTabProps) {
  const { depositAddress } = props;
  const [value, setValue] = React.useState(0);
  const [currentBalance, setCurrentBalance] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Me" {...a11yProps(0)} />
          <Tab label="Diposit" {...a11yProps(1)} />
          <Tab label="Withdraw" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid sx={{marginTop: '40px'}} container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{fontSize: '28px', marginBottom: '20px', textAlign: 'center'}}>
              My Balance
            </Typography>
            <TextField
              disabled
              required
              fullWidth
              id="my_balance"
              name="my_balance"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{fontSize: '28px', marginBottom: '20px', textAlign: 'center'}}>
              Withdraw amount
            </Typography>
            <TextField
              disabled
              required
              fullWidth
              id="pending_balance"
              name="pending_balance"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{fontSize: '28px', marginBottom: '20px', textAlign: 'center'}}>
              Password
            </Typography>
            <TextField
              disabled
              required
              fullWidth
              name="total_balance"
              id="total_balance"
            />
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div style={{ textAlign: 'center', paddingTop: '140px' }}>
          <Typography sx={{fontSize: '32px', marginBottom: '20px'}}>
            Deposit Address
          </Typography>
          <TextField
            disabled
            fullWidth
            id="deposit_adress"
            value={depositAddress}
          />
          <Typography sx={{fontSize: '15px', paddingTop: '20px', textAlign: 'left'}}>
            Please do not recharge with other non-TRC20 (USDT) assets. The deposit will be credited to your account in approximately 1 to 3 minutes after recharging.
            If the account is not credited for a long time, please refresh the page.
          </Typography>
          <Button sx={{marginTop: '80px'}} variant="contained">Deposit Complete</Button>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Grid sx={{marginTop: '40px'}} container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{fontSize: '28px', marginBottom: '20px', textAlign: 'center'}}>
              Withdraw Address
            </Typography>
            <TextField
              required
              fullWidth
              id="withdraw_address"
              name="withdraw_address"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{fontSize: '28px', marginBottom: '20px', textAlign: 'center'}}>
              Withdraw amount
            </Typography>
            <TextField
              required
              fullWidth
              type='number'
              id="withdraw_mount"
              name="withdraw_mount"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{fontSize: '28px', marginBottom: '20px', textAlign: 'center'}}>
              Password
            </Typography>
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              id="password"
            />
          </Grid>
          <Grid sx={{textAlign: 'center'}} item xs={12}>
            <Button sx={{marginTop: '80px'}} variant="contained">Confirm</Button>
          </Grid>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}