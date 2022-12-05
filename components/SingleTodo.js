import React, { useEffect, useState } from "react";
import {
    AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function SingleTodo({ todo, setTodos, todos }) {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  useEffect(()=> {
      AsyncStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleEdit = () => {
    if (!edit) setEdit(!edit);
    else {
      setEdit(!edit);
      setTodos(
        todos.map((t) =>
          t.id === todo.id
            ? {
                id: t.id,
                text: editText,
              }
            : t
        )
      );
    }
    AsyncStorage.setItem("todos", JSON.stringify(todos))
  };

  const handleDelete = (id) => {
      setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <View style={styles.todo}>
      {!edit ? (
        <Text style={styles.todoText}>{todo.text}</Text>
      ) : (
        <TextInput
          style={styles.todoInput}
          value={editText}
          onChangeText={(text) => setEditText(text)}
        />
      )}
      <TouchableOpacity>
        <MaterialIcons
          style={styles.todoaction}
          name="edit"
          size={23}
          color="black"
          onPress={handleEdit}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons
          style={styles.todoaction}
          name="delete"
          size={23}
          color="black"
          onPress={()=>handleDelete(todo.id)}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: "black",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  todoaction: {
    marginLeft: 15,
  },
  todoInput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
  },
});
