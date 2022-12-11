import { Typography, InputLabel, InputAdornment, OutlinedInput, Grid, Button, FormControl } from "@mui/material";
import { Search } from '@mui/icons-material';

interface IClientHeaderProps {
  searchClient: (keyword: string) => void;
  createClient: () => void;
}

function ClientHeader({ searchClient, createClient }: IClientHeaderProps) {
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "start" }} style={{ 'marginBottom': '20px', 'fontWeight': 500 }}>
        Clients
      </Typography>
      <Grid container direction="row" spacing={{ 'xs': 2 }} columns={{ 'xs': 4 }} justifyContent="space-between" alignItems="center">
        <Grid item>
          <FormControl variant="outlined" size="small" style={{ 'backgroundColor': 'white' }}>
            <InputLabel htmlFor="searchKey">
              Search clients...
            </InputLabel>
            <OutlinedInput
              id="searchKey"
              label="Search clients"
              onChange={(event) => searchClient(event.target.value)}
              endAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" style={{ 'textTransform': 'capitalize' }} onClick={createClient}>Create new Client</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ClientHeader;
