import { Member } from "@/pages/DashboardPage";
import { Badge, Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { blue, green, orange, red } from "@mui/material/colors";

type Props = {
  members: Member[];
};

const getBadgeColor = (tiltLevel: number) => {
  if (tiltLevel <= 3) {
    //青色

    return blue[500];
  } else if (tiltLevel <= 5) {
    //緑
    return green[600];
  } else if (tiltLevel <= 8) {
    //黄色
    return orange[800];
  } else {
    //赤
    return red[400];
  }
};

export default function DashboardTiltMemberItem(props: Props) {
  const { members } = props;
  return (
    <Stack marginTop={4}>
      <h3>傾斜</h3>
      <Grid container spacing={2}>
        {/* {liquidation.map((liq, i) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
            <Card sx={{ padding: 4 }}>
              <Typography variant="subtitle1">
                {members.filter((member) => member.memberId === liq.debtor)[0].memberName}
              </Typography>
              <Stack direction="row">
                <PlayArrowIcon style={{ transform: "rotate(90deg)", marginTop: "-2px" }} />
                {Math.round(liq.amount)}円
              </Stack>

              <Typography variant="subtitle1">
                {members.filter((member) => member.memberId === liq.creditor)[0].memberName}
              </Typography>
            </Card>
          </Grid>
        ))} */}
        {members.map((member) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, xl: 2 }} key={member.memberId}>
            <Card sx={{ padding: 4, width: "100%" }}>
              <Stack direction="row">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="30px"
                  height="30px"
                  bgcolor={getBadgeColor(10)}
                  borderRadius="15px"
                  marginRight={1}
                >
                  10
                </Box>
                <Typography variant="subtitle1">{member.memberName}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
