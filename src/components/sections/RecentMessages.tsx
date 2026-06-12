"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface Message {
  name: string;
  subject: string;
  message: string;
  timestamp: string;
}

export function RecentMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMessages = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        setError(false);
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch (err) {
      console.error("[RecentMessages Fetch Error]", err);
      setError(true);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchMessages(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Just now";
    }
  };

  return (
    <section id="recent-messages" className="py-20 border-t border-theme bg-black/5 dark:bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 mb-10 sm:flex-row">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Recent Messages</h2>
            <p className="mt-1 text-sm text-muted-foreground">Messages left by visitors on this portfolio</p>
          </div>
          <button
            onClick={() => fetchMessages(true)}
            disabled={isRefreshing || loading}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-theme bg-card hover:bg-input transition-colors disabled:opacity-50 cursor-pointer pointer-events-auto"
            aria-label="Refresh messages"
          >
            <RefreshCw size={12} className={`${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          // Skeleton Loading Layout
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col justify-between p-6 rounded-2xl border border-theme/60 bg-card h-44"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-1/3 rounded bg-muted-foreground/20" />
                    <div className="h-3 w-1/4 rounded bg-muted-foreground/20" />
                  </div>
                  <div className="h-4 w-1/2 rounded bg-muted-foreground/20" />
                  <div className="space-y-1.5 pt-2">
                    <div className="h-3 w-full rounded bg-muted-foreground/20" />
                    <div className="h-3 w-5/6 rounded bg-muted-foreground/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <GlassCard className="text-center py-10">
            <p className="text-sm text-red-400">
              Unable to load messages. Please ensure your <code>GOOGLE_SCRIPT_URL</code> is correctly configured in your <code>.env.local</code>.
            </p>
          </GlassCard>
        ) : messages.length === 0 ? (
          <GlassCard className="text-center py-12">
            <MessageSquare size={32} className="mx-auto text-muted-foreground opacity-50 mb-3" />
            <p className="text-sm text-muted-foreground">No public messages yet. Submit a message above to be the first!</p>
          </GlassCard>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.timestamp + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                >
                  <GlassCard className="h-full flex flex-col justify-between p-6 hover:border-cyan-500/30 dark:hover:border-cyan-400/30 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between border-b border-theme/20 pb-3 mb-3 gap-2">
                        <span className="font-semibold text-foreground text-sm truncate max-w-[150px]">
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground bg-theme/30 px-2 py-0.5 rounded-full font-mono shrink-0">
                          {formatDate(msg.timestamp)}
                        </span>
                      </div>
                      <h4 className="font-medium text-cyan-600 dark:text-cyan-400 text-sm mb-2 truncate">
                        {msg.subject}
                      </h4>
                      <p className="text-muted-foreground text-xs line-clamp-4 leading-relaxed whitespace-pre-line">
                        {msg.message}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
