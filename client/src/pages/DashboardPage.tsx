import { Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
      {members.map((member) => (
        <div key={member.memberId}>{member.memberName}</div>
      ))}
    </Stack>
  );
};
