import { Flex } from "@chakra-ui/react";
import Members from "./members/members";

export const Dashboard = () => {
  return (
    <Flex gap="4" direction="column">
      <Members />
    </Flex>
  );
};
