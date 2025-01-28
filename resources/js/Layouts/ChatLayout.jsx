import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import ConversationCard from "@/Components/Conversations/ConversationCard";

export default function ChatLayout({ children }) {
  const page = usePage();
  const conversations = page.props.conversations;
  const selectedConversation = page.props.selectedConversation;
  const [localConversations, setLocalConversations] = useState([]);
  const [sortedConversations, setSortedConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});

  console.log({ conversations });
  console.log({ selectedConversation });

  const isUserOnline = (userId) => onlineUsers[userId];

  const onSearch = (event) => {
    const search = event.target.value.toLowerCase();
    setLocalConversations(
      conversations.filter((item) => item.name.toLowerCase().includes(search))
    );
  };

  useEffect(() => {
    setLocalConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    setSortedConversations(
      localConversations.sort((a, b) => {
        if (a.blocked_at && b.blocked_at) {
          return a.blocked_at > b.blocked_at ? 1 : -1;
        } else if (a.blocked_at) {
          return 1;
        } else if (b.blocked_at) {
          return -1;
        }

        if (a.last_message_date && b.last_message_date) {
          return b.last_message_date.localeCompare(a.last_message_date);
        } else if (a.last_message_date) {
          return -1;
        } else if (b.last_message_date) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  }, [localConversations]);

  useEffect(() => {
    window.Echo.join("online")
      .here(users => {
        const onlineUsersObject = Object.fromEntries(users.map(user => [user.id, user]));
        setOnlineUsers(prev => ({ ...prev, ...onlineUsersObject }));
      })
      .joining(user => {
        setOnlineUsers(prev => {
          const updatedUser = { ...prev };
          updatedUser[user.id] = user;
          return updatedUser;
        });
      })
      .leaving(user => {
        setOnlineUsers(prev => {
          const updatedUser = { ...prev };
          delete updatedUser[user.id];
          return updatedUser;
        });
      })
      .error(error => {
        console.log("error", error);
      });

    return () => { window.Echo.leave("online"); };
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <aside
        className={`flex flex-col h-full w-full py-4 sm:w-56 md:w-80 border-e transition-all overflow-x-hidden overflow-y-auto ${selectedConversation && "-ms-[100vw] sm:ms-0"}`}>
        <div className="px-4 space-y-2">
          <h1 className="text-xl font-bold">Conversations</h1>
          <Input onKeyUp={onSearch} placeholder="Search" />
        </div>
        <div className="w-full mt-2">
          {sortedConversations.map((item, index) => (
            <ConversationCard
              key={index}
              conversation={item}
              online={!!isUserOnline(item.id)}
              selectedConversation={selectedConversation}
            />
          ))}
        </div>
      </aside>
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
