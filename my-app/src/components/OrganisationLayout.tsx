'use client';
import { RoomProvider } from "@/app/liveblocks.config";
import { RoomInfo } from "@liveblocks/node";
import Link from "next/link";

export default function BoardsSidebar({ boards }: { boards: RoomInfo[] }) {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Boards</h2>
      <div className="space-y-4">
        {boards?.length > 0 &&
          boards.map((board) => (
            <Link
              key={board.id}
              href={`/boards/${board.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-700"
            >
              <span className="flex-1">{board.metadata.boardName}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
