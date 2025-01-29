import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/Components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { EllipsisVertical, Hand } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ConversationCard({ conversation, online, selectedConversation }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          href={conversation.is_group ? route("chat.group", conversation) : route("chat.user", conversation)}
          preserveState
          className={`flex items-start h-20 gap-2 px-4 py-4 relative hover:bg-accent hover:text-accent-foreground ${conversation.is_user && conversation.blocked_at && "opacity-50"}`}>
          {conversation.is_user && <i className={`absolute bottom-5 left-4 border rounded-full h-3 w-3 z-20 ${online ? "bg-primary" : "bg-gray-700"}`} />}
          <Avatar className="!z-10">
            <AvatarImage src={conversation.avatar} />
            <AvatarFallback>{conversation.name.substring(0, 3)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center justify-between">
              <p>{conversation.name}</p>
              {/* {conversation.last_message_date && <p className="text-muted-foreground">{dayjs(conversation.last_message_date).fromNow()}</p>} */}
            </div>
            <span className="text-muted-foreground line-clamp-1 w-72 sm:w-50 md:w-56">{conversation.last_message}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:text-accent-foreground">
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Hand />
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="gap-2">
          <Hand size={16} />
          Block User
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu >
  );
}
