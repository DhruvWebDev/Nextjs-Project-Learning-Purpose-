"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@clerk/nextjs";
import useFetch from "@/hooks/use-fetch";
import { getTaskData, addTask, deleteTask, updateTask } from "@/api/apiTasks";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function Page() {
  const { user, isLoaded } = useUser();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const { data: fetchedTasks, fn: fetchTasks } = useFetch(getTaskData);
  const { data: addTasks, fn: addNewTask } = useFetch(addTask);
  const { data: deleteTasks, fn: deleteExistingTask } = useFetch(deleteTask);
  const { data: updateTasks, fn: updateExistingTask } = useFetch(updateTask);

  // Initial fetch
  useEffect(() => {
    if (isLoaded && user) {
      fetchTasks({ user_id: user.id, label: "today" });
    }
  }, [isLoaded, user]);

  // Update todos when tasks are fetched
  useEffect(() => {
    if (Array.isArray(fetchedTasks)) {
      setTodos(fetchedTasks);
    }
  }, [fetchedTasks]);

  // Handle adding new tasks
  const addTodo = async () => {
    if (input.trim() !== "" && user) {
      const newTask = {
        user_id: user.id,
        labels: "today",
        tasks: input,
        completed: false,
      };
      await addNewTask(newTask);
      setInput("");
    }
  };

  // Update todos when new task is added
  useEffect(() => {
    if (addTasks && Array.isArray(addTasks)) {
      setTodos(prevTodos => [...prevTodos, ...addTasks]);
    }
  }, [addTasks]);

  // Handle toggling tasks
  const toggleTodo = async (taskId, taskCompleted) => {
    try {
      await updateExistingTask({ id: taskId, completed: !taskCompleted });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === taskId ? { ...todo, completed: !taskCompleted } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Handle deleting tasks
  const deleteTodo = async (todoId) => {
    await deleteExistingTask({ todoId });
    setTodos(prevTodos => prevTodos.filter(todo => todo?.id !== todoId));
  };



  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Calculate completed and pending tasks
  const completedTasks = todos.filter((task) => task.completed).length;
  const pendingTasks = todos.length - completedTasks;

  // Data for the Pie Chart
  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  const COLORS = ['#8B5CF6', '#A78BFA']; // Purple shades for a cohesive look

  return (
    <div className="min-h-screen bg-black bg-grid-white/[0.2] p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardContent className="p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">
              Task Manager
            </h1>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <div className="flex gap-4 mb-8">
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new task..."
                    className="flex-grow bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
                  />
                  <Button
                    onClick={addTodo}
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
                  <AnimatePresence>
                    {todos.map((todo) => (
                      <motion.div
                        key={todo?.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center bg-zinc-800 rounded-lg shadow-md p-4">
                          <Checkbox
                            checked={todo?.completed}
                            onCheckedChange={() =>
                              toggleTodo(todo.id, todo.completed)
                            }
                            className="mr-4 border-zinc-600 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                          />
                          <span
                            className={`flex-grow ${
                              todo?.completed
                                ? "line-through decoration-2 text-zinc-500"
                                : "text-white"
                            }`}
                          >
                            {todo?.tasks}
                          </span>
                          <Button
                            onClick={() => deleteTodo(todo?.id)}
                            variant="ghost"
                            size="icon"
                            className="ml-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Progress</h2>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {data.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]}
                                strokeWidth={0}
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: 'none',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2 text-center">
                      <p className="text-white text-sm">
                        {completedTasks} of {todos.length} tasks completed
                      </p>
                      <p className="text-violet-400 text-lg font-semibold">
                        {todos.length > 0 
                          ? `${Math.round((completedTasks / todos.length) * 100)}%`
                          : '0%'
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}