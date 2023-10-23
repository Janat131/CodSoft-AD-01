
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Button, FAB, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tinycolor from 'tinycolor2';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
          color: generateRandomColor(),
          editable: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const startEditing = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editable: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const saveEdit = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText, editable: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const cancelEdit = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editable: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const markAsComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const undoComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: false };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const generateRandomColor = () => {
    const randomColor = tinycolor.random();
    return randomColor.toRgbString();
  };

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <Button style={styles.Button}mode="contained" onPress={addTodo}>
          Add
        </Button>

        {todos.map((todo) => (
          <TouchableOpacity key={todo.id}>
            <Card
              style={{
                backgroundColor: todo.color,
                marginBottom: 16,
                padding: 16,
                flexDirection: 'column',
              }}
            >
              {todo.editable ? (
                <View>
                  <TextInput
                    style={styles.editableText}
                    value={todo.text}
                    onChangeText={(text) => {
                      const updatedTodos = todos.map((item) =>
                        item.id === todo.id ? { ...item, text } : item
                      );
                      setTodos(updatedTodos);
                    }}
                  />
                  <View style={styles.iconContainer}>
                    <Icon
                      name="done"
                      size={24}
                      color="rgba(0, 128, 0, 0.7)"
                      onPress={() => saveEdit(todo.id, todo.text)}
                    />
                    <Icon
                      name="cancel"
                      size={24}
                      color="rgba(255, 0, 0, 0.7)"
                      onPress={() => cancelEdit(todo.id)}
                    />
                  </View>
                </View>
              ) : (
                <Text style={styles.todoText}>
                  {todo.completed ? `${todo.text} (Completed)` : todo.text}
                </Text>
              )}
              <View style={styles.iconContainer}>
                <Icon
                  name="edit"
                  size={24}
                  color="rgba(0, 0, 0, 0.3)"
                  onPress={() => startEditing(todo.id)}
                />
                <Icon
                  name="delete"
                  size={24}
                  color="rgba(255, 0, 0, 0.7)"
                  onPress={() => deleteTodo(todo.id)}
                />
                {!todo.completed ? (
                  <Icon
                    name="done"
                    size={24}
                    color="rgba(0, 128, 0, 0.7)"
                    onPress={() => markAsComplete(todo.id)}
                  />
                ) : (
                  <Icon
                    name="undo"
                    size={24}
                    color="rgba(255, 0, 0, 0.7)"
                    onPress={() => undoComplete(todo.id)}
                  />
                )}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    fontSize: 18,
    marginBottom: 10,
  },
  editableText: {
    fontSize: 20,
    marginBottom: 10,
  },
  todoText: {
    fontSize: 24,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Button:
  {
    backgroundColor: "blue"
  }
});

export default App;
