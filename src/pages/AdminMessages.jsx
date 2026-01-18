import { useEffect, useState } from "react";
import api from "../utils/api"; 

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/api/admin/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((msg) => {
    if (filter === "new") return msg.replied === false;
    if (filter === "replied") return msg.replied === true;
    return true;
  });

  const sendReply = async (id, replyText) => {
    if (!replyText) return;

    try {
      await api.post(`/api/admin/messages/${id}/reply`, { replyText });

      setMessages((prev) =>
        prev.map((m) =>
          m._id === id
            ? { ...m, replied: true, repliedAt: new Date() }
            : m
        )
      );
    } catch (err) {
      console.error("Reply failed", err);
      alert("Failed to send reply");
    }
  };

  if (loading) {
    return <div className="p-8 text-gray-500">Loading messages…</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        {["all", "new", "replied"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* MESSAGES */}
      {filteredMessages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white p-5 rounded-lg shadow border ${
                !msg.replied ? "border-blue-500" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{msg.name}</h3>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>

                <span
                  className={`font-semibold ${
                    msg.replied ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {msg.replied ? "Replied" : "New"}
                </span>
              </div>

              <p className="mt-3 text-gray-800 whitespace-pre-line">
                {msg.message}
              </p>

              {!msg.replied && (
                <div className="mt-4">
                  <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Type your reply…"
                    value={msg.replyText || ""}
                    onChange={(e) =>
                      setMessages((prev) =>
                        prev.map((m) =>
                          m._id === msg._id
                            ? { ...m, replyText: e.target.value }
                            : m
                        )
                      )
                    }
                  />

                  <button
                    onClick={() => sendReply(msg._id, msg.replyText)}
                    className="mt-2 bg-black text-white px-4 py-2 rounded"
                  >
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
