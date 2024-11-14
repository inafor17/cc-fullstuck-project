import { Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetch(`/project/${projectId}`)
      .then((res) => {
        if (!res.ok) {
          navigate("/404");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setProjectName(data.name);
      });
  }, []);
  return (
    <Stack>
      <p>{projectName}</p>
    </Stack>
  );
};
