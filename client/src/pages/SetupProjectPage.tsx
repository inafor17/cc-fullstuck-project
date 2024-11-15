import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, InputLabel, Stack, TextField, Typography } from "@mui/material";
import MemberInput from "@/components/MemberInput";

export default function SetupProjectPage() {
  const [groupName, setGroupName] = useState<string>("");
  const [groupNameIsError, setGroupNameIsError] = useState(false);

  const [members, setMembers] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroupName(e.target.value);
    setGroupNameIsError(e.target.value === "");
  };

  const createProject = () => {
    const body = {
      projectName: groupName,
      members: members,
    };

    let projectId = "";

    //TODO: APIを呼び出して、プロジェクトとそのメンバーを追加する。
    fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        projectId = data.projectId;

        //projectが作成できたらprojectIdが返ってくるので、それをもとにDashboardにリダイレクト
        navigate(`/dashboard/${projectId}`);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <Card sx={{ width: 420 }}>
      <CardContent>
        <Stack alignItems="flex-start" width="100%" padding={4}>
          <Typography gutterBottom variant="h5" component="div">
            WariWari
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "left" }}>
            割り勘ボードをセットアップするために、以下の情報を入力してください。
          </Typography>
          <InputLabel htmlFor="project-name-input" sx={{ marginTop: 2, marginBottom: 1 }}>
            プロジェクト名
          </InputLabel>
          <TextField
            id="project-name-input"
            variant="outlined"
            sx={{ width: "100%" }}
            error={groupNameIsError}
            helperText={groupNameIsError && "プロジェクト名は必須項目です"}
            value={groupName}
            onChange={(e) => handleGroupNameChange(e)}
          />
          <MemberInput members={members} setMembers={setMembers} />

          <Box marginTop={4} alignItems="center" width="100%">
            <Button size="large" onClick={createProject} variant="outlined" sx={{ width: "100%" }}>
              作成
            </Button>
          </Box>
        </Stack>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
