import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, ArrowLeft, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { streamChat, type Msg } from "@/utils/aiChat";

const ChatPage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Sahara. I'm here to listen and offer supportive, evidence-based guidance. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll to bottom on new messages
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    // basic length guard
    if (text.length > 4000) {
      toast({ title: "Message too long", description: "Please keep messages under 4000 characters." });
      return;
    }

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: (delta) => upsertAssistant(delta),
      onDone: () => setIsLoading(false),
      onError: (msg) => {
        setIsLoading(false);
        toast({ title: "Chat error", description: msg, variant: "destructive" });
      },
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && canSend) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">AI Mental Health Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Chat with Sahara for supportive, evidence-based guidance. If you are in crisis, contact local emergency services.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-gentle border">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl">Conversation</CardTitle>
          </CardHeader>

          <CardContent>
            <div
              ref={listRef}
              className="h-[55vh] w-full overflow-y-auto pr-2 space-y-4 bg-background/50 rounded-md p-4"
            >
              {messages.map((m, idx) => (
                <div key={idx} className="flex">
                  <div
                    className={
                      m.role === "user"
                        ? "ml-auto max-w-[85%] rounded-lg bg-primary text-primary-foreground px-4 py-2 shadow"
                        : "mr-auto max-w-[85%] rounded-lg bg-card border px-4 py-2 shadow"
                    }
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto max-w-[85%] rounded-lg bg-card border px-4 py-2 shadow flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="gap-2">
            <Input
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={!canSend}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
