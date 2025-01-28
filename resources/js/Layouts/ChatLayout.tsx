import React from "react";
import { usePage } from "@inertiajs/react";

export default function ChatLayout({ children }) {
  const page = usePage();
  const conversations = page.props.conversations;
  const selectedConversation = page.props.selectedConversation;

  console.log({ conversations });
  console.log({ selectedConversation });

  return (
    <div>
      {children}
    </div>
  );
}
