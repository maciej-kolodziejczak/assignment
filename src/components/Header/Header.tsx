import { GitHub } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export function Header() {
  return (
    <header>
      <Grid container spacing={1} alignItems="center">
        <Grid size="auto">
          <GitHub fontSize="large" />
        </Grid>
        <Grid size="grow">
          <Typography variant="h1" fontSize="2rem">
            GitHub User Search
          </Typography>
        </Grid>
      </Grid>
    </header>
  );
}
