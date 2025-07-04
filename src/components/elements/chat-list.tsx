import Link from "next/link"

export default function ChatList() {
    return (
        <section className=" pr-1 w-full md:min-w-[320px] h-full">
            {
                chats.map((_, index) => (
                    <ChatListItems key={index} />
                ))
            }
        </section>
    )
}

export const ChatListItems = () => {
    return (
        <Link href={"/community/2"}>
            <div className="flex w-full items-center gap-x-3.5 p-2 hover:bg-gradient-to-r from-foreground/5 to-foreground/10 rounded-md cursor-pointer">
                <div className='h-[52px] w-[52px] bg-gray-200 rounded-xl overflow-hidden relative'>
                </div>
                <div className='space-y-1 flex-1'>
                    <div className='flex items-center ' >
                        <h2 className='text-base font-medium flex-1'>Tutor 1</h2>
                        <p className='text-xs text-foreground/50 font-light'>20/03/2025</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm font-light  text-foreground/50 flex-1'>Hello</p>
                        <p className='text-xs text-foreground rounded-xl font-light px-2 py-[2px] bg-foreground/10'>22</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}


const chats = [
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    },
    {
        name: "Chat 1",
        id: "1",
        lastMessage: "Hello",
        lastMessageTime: "10:00 AM",
        unreadCount: 2,
        isOnline: true,
    }
]