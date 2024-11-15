import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Member = {
  memberId: number;
  memberName: string;
};

export const Dashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch(`/api/project/${projectId}`)
      .then((res) => {
        if (!res.ok) {
          navigate("/404");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setProjectName(data.projectName);
      });

    fetch(`/api/project/${projectId}/members`)
      .then((res) => {
        if (!res.ok) {
          navigate("/404");
          return;
        }
        return res.json();
      })
      .then((data) => setMembers(data.members));
  }, [projectId, navigate]);

  return (
    <Stack>
      <p>{projectName}</p>
      <h3>メンバー</h3>
      <Stack direction="row" gap={2}>
        {members.map((member) => {
          return <Card sx={{ width: 420, padding: 4 }}>{member.memberName}</Card>;
        })}
        <Card sx={{ width: 420, padding: 4 }}>
          <CardContent>
            <AddIcon fontSize="large" />
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};
