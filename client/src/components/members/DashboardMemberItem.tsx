import { Stack } from "@mui/material";
import { Member } from "@/pages/DashboardPage";
import { useEffect, useRef, useState } from "react";

type Props = {
  members: Member[];
};

export default function DashboardMemberItem(props: Props) {
  const members = props.members;
  const [cardHeight, setCardHeight] = useState(0);
  const firstCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (firstCardRef.current) {
      setCardHeight(firstCardRef.current.clientHeight); // 最初のカードの高さを取得
    }
  }, [members]);

  return (
    <Stack>
      <h4 style={{ marginBottom: 0 }}>{members.map((member) => member.memberName).join("・")}</h4>
      {/* <h3>メンバー</h3>
      <Grid container spacing={2}>
        {members.map((member, i) => {
          return (
            <Grid size={4} key={member.memberId}>
              <Card sx={{ padding: 4 }} ref={i === 0 ? firstCardRef : null}>
                <Typography variant="subtitle1">{member.memberName}</Typography>
              </Card>
            </Grid>
          );
        })}
        <Grid size={4}>
          <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: cardHeight }}>
            <CardContent>
              <AddIcon fontSize="large" />
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </Stack>
  );
}
