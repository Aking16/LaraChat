import ConversationHeader from "@/Components/Conversations/ConversationHeader";
import MessageCard from "@/Components/Conversations/MessageCard";
import { ScrollArea } from "@/Components/ui/scroll-area";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { Head } from "@inertiajs/react";
import { MessageSquareDiff } from "lucide-react";
import { useEffect, useState } from "react";

function Home({ selectedConversation, messages }) {
  const [localMessages, setLocalMessages] = useState([]);

  useEffect(() => {
    if (messages) {
      setLocalMessages(messages.data.reverse());
    }
  }, [messages]);

  return (
    <div>
      <Head title="Home" />
      {messages ?
        <div>
          {localMessages.length === 0 ?
            <div className="grid h-screen p-5 lg:p-10 justify-center items-center text-center text-muted-foreground">
              <div className="relative">
                <p className="text-2xl z-10">
                  No Messages!
                </p>
                <MessageSquareDiff size={128} className="absolute bottom-20 left-1/2 -translate-x-1/2 text-muted" />
                <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-9xl text-destructive opacity-25 z-0">
                  404
                </p>
              </div>
            </div>
            :
            <div>
              <ConversationHeader selectedConversation={selectedConversation} />
              <ScrollArea className="h-[85vh] ps-5 lg:ps-10 py-4">
                {localMessages.map(item =>
                  <MessageCard
                    key={item.id}
                    message={item}
                  />
                )}
              </ScrollArea>
            </div>
          }
        </div>
        :
        <div className="grid h-screen justify-center items-center text-center text-muted-foreground">
          <div className="relative">
            <p className="text-2xl z-10">
              Please select a conversation to start chatting!
            </p>
            <MessageSquareDiff size={128} className="absolute bottom-20 left-1/2 -translate-x-1/2 text-muted" />
            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-9xl text-destructive opacity-25 z-0">
              404
            </p>
          </div>
        </div>
      }
    </div>
  );
}

Home.layout = (page) => {
  return (
    <AuthenticatedLayout>
      <ChatLayout>
        {page}
      </ChatLayout>
    </AuthenticatedLayout>
  );
};

export default Home;
