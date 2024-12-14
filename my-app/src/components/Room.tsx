"use client";
import { useState, useEffect } from "react";
import {
  RoomProvider,
  useStorage,
  useMutation,
} from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import { WhoIsHere } from "@/components/who-is-here";
import { SomeoneIsTyping } from "@/components/someone-Typing";

export default function Room({ id }: { id: string }) {
  const [draft, setDraft] = useState("");
  const todos = useStorage((root) => root.todos) || new LiveList([]); // Ensure todos is initialized

  const addTodo = useMutation(({ storage }, text: string) => {
    const todosList = storage.get("todos");
    if (todosList) {
      todosList.push(new LiveObject({ text, checked: false }));
    }
  });

  const toggleTodo = useMutation(({ storage }, index: number) => {
    const todo = storage.get("todos").get(index);
    if (todo) {
      const newCheckedState = !todo.get("checked");
      todo.update({ checked: newCheckedState });
    }
  });

  const deleteTodo = useMutation(({ storage }, index: number) => {
    storage.get("todos").delete(index);
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (draft && e.key === "Enter") {
      addTodo(draft);
      setDraft("");
    }
  };

  return (
    <RoomProvider id={id} initialStorage={{ todos: new LiveList([]) }}> {/* Correct initialization */}
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        <div className="container">
          <WhoIsHere />
          <input
            type="text"
            placeholder="What needs to be done?"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SomeoneIsTyping />
          {todos.size > 0 ? (
            todos.map((todo, index) => (
              <div key={index} className="todo_container">
                <div className="todo" onClick={() => toggleTodo(index)}>
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: todo.get("checked") ? "line-through" : undefined,
                    }}
                  >
                    {todo.get("text")}
                  </span>
                </div>
                <button className="delete_button" onClick={() => deleteTodo(index)}>
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div>No todos available.</div>
          )}
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}