import { usePage } from '@inertiajs/react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import dayjs from 'dayjs';

const MessageCard = ({ message }) => {
  const currentUser = usePage().props.auth.user;

  console.log(message);
  return (
    <div className={`flex flex-col mt-4 pe-5 lg:pe-10 ${currentUser.id === message.sender_id ? "items-end" : "items-start"} first:mt-0`}>
      <div className={`flex items-center gap-2 ${currentUser.id === message.sender_id && "flex-row-reverse"}`}>
        <Avatar>
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>{message.sender.name.substring(0, 3)}</AvatarFallback>
        </Avatar>
        <p>{message.sender.name}</p>
      </div>
      <div className={`p-3 rounded-lg mt-2 ${currentUser.id === message.sender_id ? "bg-blue-500 text-primary-foreground rounded-tr-none dark:bg-slate-800 dark:text-foreground" : "bg-accent rounded-tl-none"}`}>
        <p>{message.message}</p>
        <span className={`w-full ms-auto text-muted-foreground ${currentUser.id === message.sender_id && " text-primary-foreground/50 dark:text-muted-foreground"}`}>{dayjs(message.updated_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default MessageCard;