import { Member, Payment } from "@/pages/DashboardPage";
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
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type Props = {
  members: Member[];
  // payments: Payment[];
  setPayments: Dispatch<SetStateAction<Payment[]>>;
  open: boolean;
  handleClose: () => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

export default function AddPaymentModal(props: Props) {
  const { members, setPayments, open, handleClose } = props;
  const [description, setDescription] = useState<string>("");
  const [descriptionIsError, setDescriptionIsError] = useState<boolean>(false);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescriptionIsError(e.target.value === "");
  };

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

  const createPayment = async () => {
    const body = {
      payerId: parseInt(payer!),
      payeeIds: members.filter((_, i) => checkedItems[i]).map((member) => member.memberId),
      amount: parseInt(amount),
      description,
    };

    let paymentId;

    await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        paymentId = data.paymentId;
      });

    console.log(paymentId);

    await fetch(`/api/payment/${paymentId}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments((prevPayments) => [...prevPayments, data]);
      });

    handleClose();
  };

  return (
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

              <InputLabel htmlFor="project-name-input" sx={{ marginTop: 2, marginBottom: 1 }}>
                立替の内容
              </InputLabel>
              <TextField
                id="project-name-input"
                variant="outlined"
                sx={{ width: "100%" }}
                error={descriptionIsError}
                helperText={descriptionIsError && "プロジェクト名は必須項目です"}
                value={description}
                onChange={(e) => handleDescriptionChange(e)}
              />
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
                    control={<Checkbox checked={checkedItems[i]} onChange={handlePayeeChange(i)} onBlur={handleBlur} />}
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
  );
}
