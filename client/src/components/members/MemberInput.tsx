import { Box, Chip, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  members: string[];
  setMembers: Dispatch<SetStateAction<string[]>>;
};

export default function MemberInput(props: Props) {
  const { members, setMembers } = props;

  const [memberName, setMemberName] = useState<string>("");

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
    <>
      <InputLabel htmlFor="member-name-input" sx={{ marginTop: 2, marginBottom: 1 }}>
        メンバー
      </InputLabel>
      <OutlinedInput
        id="member-name-input"
        sx={{ width: "100%" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={addMember}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
        onKeyDown={detectEnterKey}
      />
      <Stack direction="row" flexWrap="wrap">
        {members.map((member, i) => (
          <Box paddingTop={1} paddingRight={1} key={i}>
            <Chip label={member} onDelete={() => deleteMember(i)} />
          </Box>
        ))}
      </Stack>
    </>
  );
}
