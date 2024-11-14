import { Flex } from "@chakra-ui/react";
import Members from "../components/members/members";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = () => {
  const { projectId } = useParams();

  useEffect(() => {}, []);
  return (
    <Flex gap="4" direction="column">
      <Members />
    </Flex>
  );
};
