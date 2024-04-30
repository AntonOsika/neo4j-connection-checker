import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, Textarea, useToast } from "@chakra-ui/react";
import { FaDatabase } from "react-icons/fa";

const Index = () => {
  const [connectionDetails, setConnectionDetails] = useState({
    uri: "",
    user: "",
    password: "",
    query: "MATCH (n) RETURN n LIMIT 10;",
  });
  const [queryResult, setQueryResult] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConnectionDetails((prev) => ({ ...prev, [name]: value }));
  };

  const executeQuery = async () => {
    // Simulating a database query execution
    // Normally you would use a library like neo4j-driver to connect and execute the query
    console.log("Connecting to Neo4j with:", connectionDetails);
    // Simulated response
    const simulatedResponse = `Connected to ${connectionDetails.uri} as ${connectionDetails.user}. Executed query: ${connectionDetails.query}`;
    setQueryResult(simulatedResponse);
    toast({
      title: "Query executed",
      description: "Check the results below.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} as="form" onSubmit={(e) => e.preventDefault()}>
        <FormControl isRequired>
          <FormLabel htmlFor="uri">Database URI</FormLabel>
          <Input id="uri" name="uri" placeholder="neo4j://localhost:7687" onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="user">User</FormLabel>
          <Input id="user" name="user" placeholder="neo4j" onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" name="password" type="password" placeholder="password" onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="query">Query</FormLabel>
          <Textarea id="query" name="query" value={connectionDetails.query} onChange={handleInputChange} />
        </FormControl>
        <Button leftIcon={<FaDatabase />} colorScheme="blue" onClick={executeQuery}>
          Execute Query
        </Button>
      </VStack>
      {queryResult && (
        <Box mt={4}>
          <Text fontWeight="bold">Query Result:</Text>
          <Text>{queryResult}</Text>
        </Box>
      )}
    </Container>
  );
};

export default Index;
