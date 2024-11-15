import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
// import { Card, CardContent, Modal, Stack, Typography } from "@mui/material";
import DashboardMemberItem from "@/components/members/DashboardMemberItem";
import DashboardPaymentItem from "@/components/payments/DashboardPaymentItem";
// import MemberInput from "@/components/MemberInput";

export type Member = {
  memberId?: number;
  memberName: string;
};

export type Payment = {
  paymentId: number;
  payerId: number;
  amount: number;
  description: string;
  payeeIds: number[];
  timestamp: string;
};

export const Dashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // const [open, setOpen] = useState(false);
  // const handleModalOpen = () => setOpen(true);
  // const handleModalClose = () => setOpen(false);

  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await fetch(`/api/project/${projectId}`);
        if (!projectResponse.ok) throw new Error();

        const projectData = await projectResponse.json();
        setProjectName(projectData.projectName);

        const membersResponse = await fetch(`/api/project/${projectId}/members`);
        if (!membersResponse.ok) throw new Error();

        const membersData = await membersResponse.json();
        setMembers(membersData.members);
      } catch (error) {
        navigate("/404");
      } finally {
        setIsLoading(false); // ローディング終了
      }
    };

    fetchProjectData();
  }, [projectId, navigate]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const paymentResponse = await fetch(`/api/project/${projectId}/payments`);
        if (!paymentResponse.ok) throw new Error();

        const paymentData = await paymentResponse.json();
        setPayments(paymentData.payments);
      } catch (error) {
        navigate("/404");
      }
    };
    fetchPaymentData();
  }, [projectId, navigate]);

  return (
    <Container
      maxWidth={false} // ContainerのデフォルトのmaxWidthを無効化
      sx={{
        width: {
          xs: "90%", // 小さな画面サイズでは幅90%
          sm: "80%", // 中程度の画面サイズでは幅80%
          lg: "70%", // lgのときに幅70%
          xl: "60%", // xlのときに幅60%
        },
        margin: "auto", // コンテンツを中央に配置
      }}
    >
      <Typography variant="h2">{projectName}</Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress /> {/* ローディング中にぐるぐるアイコンを表示 */}
        </Box>
      ) : (
        <>
          <DashboardMemberItem members={members} />
          <DashboardPaymentItem members={members} payments={payments} setPayments={setPayments} />
        </>
      )}

      {/* <Modal open={open} onClose={handleModalClose}>
        <MemberInput members={members} setMembers={setMembers}/>
      </Modal> */}
    </Container>
  );
};
