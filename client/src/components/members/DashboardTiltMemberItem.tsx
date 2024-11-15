import { Member } from "@/pages/DashboardPage";
import { Box, Card, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { green, orange, red } from "@mui/material/colors";
import { useState } from "react";

type Props = {
  members: Member[];
};

const getBadgeColor = (tiltLevel: number) => {
  if (tiltLevel <= 3) {
    //青色
    return green[600];
  } else if (tiltLevel <= 6) {
    //黄色
    return orange[800];
  } else {
    //赤
    return red[400];
  }
};

export default function DashboardTiltMemberItem(props: Props) {
  const { members } = props;

  // メニューの状態を管理する
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>, member: Member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  const handleMenuItemClick = async (num: number) => {
    console.log(selectedMember);
    console.log(num);

    const body = {
      memberId: selectedMember?.memberId,
      memberName: selectedMember?.memberName,
      tiltWeight: num,
    };

    await fetch("/api/member/${memberId}", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    handleClose();
  };

  return (
    <Stack marginTop={4}>
      <Stack direction="row">
        <h3>傾斜</h3>
      </Stack>

      <Grid container spacing={2}>
        {members.map((member) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, xl: 2 }} key={member.memberId}>
            <Card sx={{ padding: 4, width: "100%", cursor: "pointer" }} onClick={(e) => handleCardClick(e, member)}>
              <Stack direction="row">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="30px"
                  height="30px"
                  bgcolor={getBadgeColor(member.tiltWeight)}
                  borderRadius="15px"
                  marginRight={1}
                >
                  {member.tiltWeight}
                </Box>
                <Typography variant="subtitle1">{member.memberName}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack direction="row" gap={1} paddingRight={2} paddingLeft={2}>
          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
            <MenuItem
              key={num}
              onClick={() => handleMenuItemClick(num)}
              sx={{
                justifyContent: "center",
                padding: 0,
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="30px"
                height="30px"
                bgcolor={getBadgeColor(num)}
                borderRadius="15px"
              >
                {num}
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </Stack>
  );
}
