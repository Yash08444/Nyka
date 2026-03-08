"use client";

import { MessageCircle } from "lucide-react";
import { ChatDrawer } from "./ChatDrawer";
import { useChat } from "@/context/ChatContext";

export const GlobalChat = () => {
    const { isChatOpen, openChat, closeChat } = useChat();

    return (
        <>
            {/* Floating Chatbot Icon - Fixed relative to shell */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] pointer-events-none z-[110] px-6 flex justify-end">
                <button
                    onClick={openChat}
                    className="pointer-events-auto w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-all active:scale-90 hover:scale-110 group haptic-feedback"
                    aria-label="Open Chat"
                >
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground rounded-full border-2 border-white animate-pulse" />
                </button>
            </div>

            {/* Global Chat Drawer - Full Screen within shell */}
            {isChatOpen && <ChatDrawer isOpen={isChatOpen} onClose={closeChat} />}
        </>
    );
};
