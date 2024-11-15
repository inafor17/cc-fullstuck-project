import { Member, Payment } from "@/pages/DashboardPage";
import { Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type Props = {
  payments: Payment[];
  members: Member[];
};

const calcPriceToGet = (members: Member[], payments: Payment[]) => {
  //memberIdをキー, 支払わなければ行けない額をバリューにしたMap
  const memberMap = members.reduce<Map<number, number>>((map, member) => {
    if (member.memberId !== undefined) {
      map.set(member.memberId, 0);
    }
    return map;
  }, new Map());
  for (const payment of payments) {
    const prevAmount = memberMap.get(payment.payerId) || 0;
    memberMap.set(payment.payerId, prevAmount + payment.amount);

    const payeeNum = payment.payeeIds.length;
    for (const payeeId of payment.payeeIds) {
      const payeePrevAmount = memberMap.get(payeeId) || 0;
      memberMap.set(payeeId, payeePrevAmount - payment.amount / payeeNum);
    }
  }
  return memberMap;
};

type Liquidation = {
  debtor: number;
  creditor: number;
  amount: number;
};

const calcFromMemberPriceMap = (memberPriceMap: Map<number, number>, liquidation: Liquidation[] = []) => {
  // Mapを配列としてソート（値を基準に降順）
  const sortedMembers = Array.from(memberPriceMap.entries()).sort((a, b) => b[1] - a[1]);

  // 現在の最大債権者と最大債務者を取得
  const [creditorId, creditorAmount] = sortedMembers[0];
  const [debtorId, debtorAmount] = sortedMembers[sortedMembers.length - 1];

  // 清算金額を算出
  const amount = Math.min(creditorAmount, Math.abs(debtorAmount));

  // 清算金額が0の場合は終了
  if (amount === 0) {
    return liquidation;
  }

  // Mapを直接更新
  memberPriceMap.set(creditorId, creditorAmount - amount);
  memberPriceMap.set(debtorId, debtorAmount + amount);

  // 清算結果を記録
  liquidation.push({
    debtor: debtorId,
    creditor: creditorId,
    amount: amount,
  });

  // 再帰呼び出し
  return calcFromMemberPriceMap(memberPriceMap, liquidation);
};

export default function DashboardSettlementItem(props: Props) {
  const { payments, members } = props;
  const [liquidation, setLiquidation] = useState<Liquidation[]>([]);

  useEffect(() => {
    // その人が実際に払った金額と本来払うべき金額の差額まで計算
    const memberPriceMap = calcPriceToGet(members, payments);
    const liquidation = calcFromMemberPriceMap(memberPriceMap);
    setLiquidation(liquidation);
  }, [payments, members]);
  return (
    <Stack marginTop={4}>
      <h3>精算方法</h3>
      <Grid container spacing={2}>
        {liquidation.map((liq, i) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, xl: 2 }} key={i}>
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
        ))}
      </Grid>
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
