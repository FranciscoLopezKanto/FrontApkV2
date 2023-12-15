import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TaskScreen = () => {
  const route = useRoute();
  const { taskId } = route.params;

 

  return (
    <View>
      <Text>Detalles de la tarea con ID: {taskId}</Text>
      
    </View>
  );
};

export default TaskScreen;
    