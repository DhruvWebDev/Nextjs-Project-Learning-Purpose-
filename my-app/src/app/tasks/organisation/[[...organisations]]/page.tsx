"use client";

import { useState } from "react";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
} from "@liveblocks/react/suspense";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { Input } from "@/components/ui/input";
import { SomeoneIsTyping } from "@/components/someone-Typing";
import { WhoIsHere } from "@/components/who-is-here";
import HashLoader from "react-spinners/HashLoader"

function Example() {
  const [draft, setDraft] = useState("");
  const updateMyPresence = useUpdateMyPresence();
  const todos = useStorage((root) => root.todos as LiveList<LiveObject<{ text: string; checked?: boolean }>>);

  const addTodo = useMutation(({ storage }, text) => {
    storage.get("todos").push(new LiveObject({ text }));
  }, []);

  const toggleTodo = useMutation(({ storage }, index) => {
    const todo = storage.get("todos").get(index);
    todo?.set("checked", !todo.get("checked"));
  }, []);

  const deleteTodo = useMutation(({ storage }, index) => {
    storage.get("todos").delete(index);
  }, []);

  return (
    <div className="p-4">
      <WhoIsHere />
      <Input
        type="text"
        placeholder="What needs to be done?"
        className="my-4"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          updateMyPresence({ isTyping: true });
        }}
        onKeyDown={(e) => {
          if (draft && e.key === "Enter") {
            updateMyPresence({ isTyping: false });
            addTodo(draft);
            setDraft("");
          }
        }}
        onBlur={() => updateMyPresence({ isTyping: false })}
      />
      <SomeoneIsTyping />
      <div className="space-y-2">
        {todos.map((todo, index) => (
          <div key={todo.id || index} className="flex items-center gap-2">
            <span
              onClick={() => toggleTodo(index)}
              className={`cursor-pointer flex-1 ${
                todo.checked ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(index)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Loading() {
  return <div><HashLoader /></div>;
}

export default function Page() {
  // Using a static room ID for the organization's tasks
  const roomId = "org-tasks-room";
  
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ isTyping: false }}
      initialStorage={{ todos: new LiveList([]) }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => <Example />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}