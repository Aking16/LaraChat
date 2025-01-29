import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

const ConversationHeader = ({ selectedConversation }) => {
  console.log({ selectedConversation });
  return (
    <div className="flex items-center gap-4 border-b px-4 py-2">
      <Link href={route("dashboard")}>
        <ArrowLeft />
      </Link>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={selectedConversation.avatar} />
          <AvatarFallback>{selectedConversation.name.substring(0, 3)}</AvatarFallback>
        </Avatar>
        {selectedConversation.is_user ?
          <h3>{selectedConversation.name}</h3>
          :
          <div>
            <h3>{selectedConversation.name}</h3>
            <p>{selectedConversation.users.length} members</p>
          </div>
        }
      </div>
    </div>
  );
};

export default ConversationHeader;