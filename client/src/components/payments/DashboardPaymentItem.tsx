import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import { ChangeEvent, useState } from "react";
import { Member } from "@/pages/DashboardPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

type Props = {
  members: Member[];
};

export default function DashboardPaymentItem(props: Props) {
  const { members } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [payer, setPayer] = useState<string | undefined>(members[0].memberId?.toString());

  const handleChange = (e: SelectChangeEvent) => {
    setPayer(e.target.value);
  };

  const [checkedItems, setCheckedItems] = useState(Array(members.length).fill(false));
  const [checkedError, setCheckedError] = useState(false);

  const handleBlur = () => {
    const isChecked = checkedItems.some((isChecked) => isChecked === true);
    setCheckedError(!isChecked);
  };

  const handlePayeeChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = event.target.checked;
    setCheckedItems(updatedCheckedItems);
  };

  const [amount, setAmount] = useState<string>("");
  const [amountIsError, setAmountIsError] = useState<boolean>(false);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAmount(value);
    if (value === "" || !/^\d*\.?\d*$/.test(value)) {
      setAmountIsError(true);
    } else setAmountIsError(false);
  };

  const createPayment = () => {};

  return (
    <Stack>
      <h3>立替の記録</h3>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="textSecondary">12/01 09:30</TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <Button onClick={handleOpen}>立替を追加する</Button>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ padding: 4 }}>
            <CardContent>
              <Stack alignItems="flex-start" width="100%">
                <Typography gutterBottom variant="h6" component="div">
                  立替の追加
                </Typography>
                {/* <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "left" }}>
                  割り勘ボードをセットアップするために、以下の情報を入力してください。
                </Typography> */}
                <InputLabel htmlFor="demo-sample-select-label" sx={{ marginTop: 2, marginBottom: 1 }}>
                  支払った人
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payer}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                >
                  {members.map((member) => (
                    <MenuItem value={member.memberId} key={member.memberId}>
                      {member.memberName}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel htmlFor="demo-sample-select-label" sx={{ marginTop: 3, marginBottom: 1 }}>
                  支払われた人
                </InputLabel>
                <FormControl error={checkedError}>
                  {members.map((member, i) => (
                    <FormControlLabel
                      key={member.memberId}
                      label={member.memberName}
                      control={
                        <Checkbox checked={checkedItems[i]} onChange={handlePayeeChange(i)} onBlur={handleBlur} />
                      }
                    />
                  ))}
                  {checkedError && <FormHelperText>少なくとも1つ選択してください</FormHelperText>}
                </FormControl>
                <InputLabel htmlFor="demo-sample-select-label" sx={{ marginTop: 3, marginBottom: 1 }}>
                  金額
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={amount}
                  onChange={handleAmountChange}
                  startAdornment={<InputAdornment position="start">￥</InputAdornment>}
                  error={amountIsError}
                  sx={{ width: "100%" }}
                />
                {amountIsError && <FormHelperText>必ず数値を入力してください</FormHelperText>}
                <Box marginTop={4} alignItems="center" width="100%">
                  <Button size="large" onClick={createPayment} variant="outlined" sx={{ width: "100%" }}>
                    作成
                  </Button>
                </Box>

                {/* <TextField
            id="project-name-input"
            variant="outlined"
            sx={{ width: "100%" }}
            error={groupNameIsError}
            helperText={groupNameIsError && "プロジェクト名は必須項目です"}
            value={groupName}
            onChange={(e) => handleGroupNameChange(e)}
          />

          <Box marginTop={4} alignItems="center" width="100%">
            <Button size="large" onClick={createProject} variant="outlined" sx={{ width: "100%" }}>
              作成
            </Button>
          </Box> */}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Stack>
  );
}
