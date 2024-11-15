import { Button, Stack, Typography } from "@mui/material";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import { Dispatch, SetStateAction, useState } from "react";
import { Member, Payment } from "@/pages/DashboardPage";
import AddPaymentModal from "./AddPaymentModal";

type Props = {
  members: Member[];
  payments: Payment[];
  setPayments: Dispatch<SetStateAction<Payment[]>>;
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月を2桁
  const day = date.getDate().toString().padStart(2, "0"); // 日を2桁
  const hours = date.getHours().toString().padStart(2, "0"); // 時を2桁
  const minutes = date.getMinutes().toString().padStart(2, "0"); // 分を2桁

  return `${month}/${day} ${hours}:${minutes}`;
};

export default function DashboardPaymentItem(props: Props) {
  const { members, payments, setPayments } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack marginTop={4}>
      <h3>立替記録</h3>
      <Timeline sx={{ padding: 0 }}>
        {payments.map((payment) => (
          <TimelineItem key={payment.paymentId}>
            <TimelineOppositeContent color="textSecondary" sx={{ flex: "0 0 auto", paddingLeft: 0 }}>
              {formatDate(payment.timestamp)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent>
              {payment.description}
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "left" }}>
                {members.filter((member) => member.memberId === payment.payerId)[0].memberName} が {payment.amount}{" "}
                円支払い
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
        <TimelineItem>
          <TimelineOppositeContent
            color="textSecondary"
            sx={{ flex: "0 0 auto", width: "36px" }}
          ></TimelineOppositeContent>
          <TimelineSeparator>
            <Button onClick={handleOpen} variant="outlined" sx={{ width: "144px" }}>
              立替を追加する
            </Button>
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
      </Timeline>
      {open && <AddPaymentModal members={members} setPayments={setPayments} open={open} handleClose={handleClose} />}
    </Stack>
  );
}
