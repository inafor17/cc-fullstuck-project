import { Avatar, Card } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Member = {
  id: number;
  name: string;
};

const MOCK_MEMBERS: Member[] = Array.from({ length: 6 }, (_, index) => ({ id: index + 1, name: `Test${index + 1}` }));

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    //TODO: 後でAPI呼び出しに置き換え
    setMembers(MOCK_MEMBERS);
  }, []);

  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Card.Title mt="2">Nue Camp</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio vel dui
          euismod fermentum. Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end"></Card.Footer>
    </Card.Root>
  );
}
