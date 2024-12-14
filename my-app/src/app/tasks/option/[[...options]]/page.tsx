'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@clerk/nextjs";
import useFetch from "@/hooks/use-fetch";
import { getTaskData, addTask, deleteTask, updateTask } from "@/api/apiTasks";

export default function SophisticatedLineTodoApp() {
  const { user, isLoaded } = useUser();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const { data: fetchedTasks, fn: fetchTasks } = useFetch(getTaskData);
  const { fn: addNewTask } = useFetch(addTask);
  const { fn: deleteExistingTask } = useFetch(deleteTask);
  const { fn: updateExistingTask } = useFetch(updateTask);

  // Fetch tasks when user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      const taskRequirement = {
        user_id: user.id,
        label: "today",
      };

      fetchTasks(taskRequirement).then((tasks) => {
        console.log(tasks); // Log the fetched tasks
        if (tasks) setTodos(tasks);
      });
    }
  }, [isLoaded, user]);

  // Add a new task
  const addTodo = () => {
    if (input.trim() !== "" && user) {
      const newTask = {
        user_id: user.id,
        labels: "today",
        tasks: input,
        completed: false,
      };

      addNewTask(newTask).then((addedTask) => {
        console.log(addedTask); // Log the added task
        if (addedTask && addedTask.length > 0) {
          setTodos((prevTodos) => [...prevTodos, ...addedTask]);
          setInput("");
        }
      });
    }
  };

  // Toggle task completion
  const toggleTodo = (id, completed) => {
    const updatedTask = { id, completed: !completed };

    updateExistingTask(updatedTask).then(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    });
  };

  // Delete a task
  const deleteTodo = (id) => {
    deleteExistingTask({ id }).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-zinc-800 border-zinc-700 shadow-2xl">
          <CardContent className="p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">
              Sophisticated Todo App
            </h1>
            <div className="flex gap-4 mb-8">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a new task..."
                className="flex-grow bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400"
              />
              <Button
                onClick={addTodo}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {todos.map((todo) => (
                  <motion.div
                    key={todo?.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center bg-white rounded-lg shadow-md">
                      <Checkbox
                        checked={todo?.completed}
                        onCheckedChange={() => toggleTodo(todo.id, todo.completed)}
                        className="ml-4 border-zinc-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <span
                        className={`flex-grow p-4 ${todo.completed ? "line-through text-zinc-400" : "text-zinc-800"}`}
                      >
                        {todo?.tasks}  {/* Updated to match correct property */}
                      </span>
                      <Button
                        onClick={() => deleteTodo(todo.id)}
                        variant="ghost"
                        size="icon"
                        className="mr-2 text-zinc-400 hover:text-red-600 hover:bg-zinc-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
