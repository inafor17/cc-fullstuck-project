import { Button, Card, Flex, Group, Input, InputAddon, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { Tag } from "@/components/ui/tag";
import { useNavigate } from "react-router-dom";

export default function SetupProjectPage() {
  const [groupName, setGroupName] = useState<string>("");
  const [groupNameIsError, setGroupNameIsError] = useState(false);

  const [memberName, setMemberName] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
    setGroupNameIsError(e.target.value === "");
  };

  const addMember = () => {
    if (memberName === "") return;
    else {
      setMembers((prevMember) => [...prevMember, memberName]);
      setMemberName("");
    }
  };

  const deleteMember = (i: number) => {
    setMembers((prevMember) => prevMember.filter((_, index) => index !== i));
  };

  const detectEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addMember();
    }
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
    <Card.Root maxW="sm">
      <Card.Header>
        <Card.Title>WariWari</Card.Title>
        <Card.Description>割り勘ボードをセットアップするために、以下の情報を入力してください。</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field label="プロジェクト名" required invalid={groupNameIsError} errorText="プロジェクト名は必須項目です">
            <Input value={groupName} onChange={(e) => handleGroupNameChange(e)} />
          </Field>
          <Field label="メンバー">
            <Group attached display="flex" width="100%">
              <Input value={memberName} onChange={(e) => setMemberName(e.target.value)} onKeyDown={detectEnterKey} />
              <InputAddon onClick={addMember} style={{ cursor: "pointer" }}>
                追加
              </InputAddon>
            </Group>
          </Field>
          <Flex wrap="wrap" gap="2">
            {members.map((member, i) => (
              <Tag key={i} size="lg" closable onClose={() => deleteMember(i)}>
                {member}
              </Tag>
            ))}
          </Flex>
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="center">
        <Button variant="outline" width="62%" onClick={createProject}>
          作成
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
