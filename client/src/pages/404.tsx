import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="lg" mb={4}>
        ページが見つかりません。
      </Text>
      <Button colorScheme="teal" onClick={() => navigate("/project/new")}>
        プロジェクトを作成する
      </Button>
    </Box>
  );
}

export default NotFound;
