import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 420, margin: "0 auto" }}>
      <CardContent>
        <Stack alignItems="flex-start" width="100%" padding={4}>
          <Typography gutterBottom variant="h5" component="div">
            404 NOT FOUND
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "left" }}>
            該当のページが見つかりません
          </Typography>
          <Box marginTop={4} alignItems="center" width="100%">
            <Button size="large" onClick={() => navigate("/project/new")} variant="outlined" sx={{ width: "100%" }}>
              プロジェクトを作成する
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NotFound;
