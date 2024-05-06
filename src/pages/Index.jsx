import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={8}>
        <Heading>Todo App</Heading>
        <Flex as="nav">
          <Button mr={2}>Home</Button>
          {/* Future navigation buttons can be added here */}
        </Flex>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        <List w="full">
          {tasks.map(task => (
            <ListItem key={task.id} p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Flex justify="space-between" align="center">
                <Text as={task.isCompleted ? 's' : ''}>{task.text}</Text>
                <Box>
                  <IconButton
                    icon={<FaCheckCircle />}
                    onClick={() => toggleTaskCompletion(task.id)}
                    aria-label="Complete task"
                    colorScheme={task.isCompleted ? 'green' : 'gray'}
                    mr={2}
                  />
                  <IconButton
                    icon={<FaTrash />}
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                    colorScheme="red"
                  />
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;