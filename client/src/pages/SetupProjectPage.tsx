import { Box, Button, Card, Flex, Group, HStack, Input, InputAddon, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { Tag } from "@/components/ui/tag";

export default function SetupProjectPage() {
  const [groupName, setGroupName] = useState<string>("");
  const [groupNameIsError, setGroupNameIsError] = useState(false);

  const [memberName, setMemberName] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);

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

  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <Card.Title>WariWari</Card.Title>
        <Card.Description>割り勘ボードをセットアップするために、以下の情報を入力してください。</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap="4" w="full">
          <Field label="グループ名" required invalid={groupNameIsError} errorText="グループ名は必須項目です">
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
        <Button variant="outline" width="62%">
          作成
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
