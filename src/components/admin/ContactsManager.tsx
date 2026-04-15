import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Trash2, 
  Search, 
  Filter,
  MessageSquare,
  Phone,
  Mail as MailIcon,
  Calendar,
  Tag
} from 'lucide-react';
import { cn } from '@/utils/utils';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

const ContactsManager: React.FC<{ token: string }> = ({ token }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'name'>('date');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : data.messages || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === id ? { ...msg, status } : msg
        ));
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę wiadomość?')) return;
    
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const filteredMessages = messages
    .filter(msg => {
      const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const getStatusColor = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'read': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'replied': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return <Clock className="w-3 h-3" />;
      case 'read': return <Eye className="w-3 h-3" />;
      case 'replied': return <CheckCircle className="w-3 h-3" />;
      case 'archived': return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold font-georgia italic text-white mb-2">Wiadomości <span className="text-[#c9a84c]">Kontaktowe</span></h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[4px] font-bold">Zarządzanie formularzem kontaktowym</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#0d0d0d] border border-white/5 px-6 py-3 rounded-2xl">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Nowe</span>
            <span className="ml-2 text-lg font-bold text-white">{messages.filter(m => m.status === 'new').length}</span>
          </div>
          <div className="bg-[#0d0d0d] border border-white/5 px-6 py-3 rounded-2xl">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Wszystkie</span>
            <span className="ml-2 text-lg font-bold text-white">{messages.length}</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-4 py-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Szukaj po imieniu, emailu, temacie lub treści..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm flex-1"
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'new', 'read', 'replied', 'archived'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                  statusFilter === status 
                    ? "bg-[#c9a84c] text-black border-[#c9a84c]/50" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                )}
              >
                {status === 'all' ? 'Wszystkie' : 
                 status === 'new' ? 'Nowe' : 
                 status === 'read' ? 'Przeczytane' : 
                 status === 'replied' ? 'Odpowiedziane' : 'Archiwalne'}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {['date', 'status', 'name'].map(sort => (
              <button
                key={sort}
                onClick={() => setSortBy(sort as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                  sortBy === sort 
                    ? "bg-[#c9a84c] text-black border-[#c9a84c]/50" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                )}
              >
                {sort === 'date' ? 'Data' : sort === 'status' ? 'Status' : 'Nazwa'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="col-span-2">
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-lg font-bold font-georgia italic text-white">Lista Wiadomości</h3>
            </div>
            
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500">Ładowanie wiadomości...</div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-6 text-center text-gray-500">Brak wiadomości spełniających kryteria</div>
              ) : (
                filteredMessages.map(message => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-6 hover:bg-white/5 transition-all cursor-pointer group",
                      selectedMessage?.id === message.id && "bg-white/10 border-l-4 border-[#c9a84c]"
                    )}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-[#c9a84c]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{message.name}</span>
                            <span className="text-xs text-gray-500">{message.email}</span>
                            {message.phone && (
                              <>
                                <span className="text-gray-600">•</span>
                                <span className="text-xs text-gray-500">{message.phone}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#c9a84c] font-bold">{message.topic}</span>
                            <span className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString('pl-PL')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(message.status)}`}>
                          {getStatusIcon(message.status)}
                          <span className="ml-1">
                            {message.status === 'new' ? 'Nowa' : 
                             message.status === 'read' ? 'Przeczytana' : 
                             message.status === 'replied' ? 'Odpowiedziana' : 'Archiwalna'}
                          </span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id);
                          }}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 line-clamp-2">
                      {message.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Message Details */}
        <div className="col-span-1">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold font-georgia italic text-white mb-2">Szczegóły Wiadomości</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedMessage.status)}`}>
                    {getStatusIcon(selectedMessage.status)}
                    <span>
                      {selectedMessage.status === 'new' ? 'Nowa' : 
                       selectedMessage.status === 'read' ? 'Przeczytana' : 
                       selectedMessage.status === 'replied' ? 'Odpowiedziana' : 'Archiwalna'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedMessage.status !== 'replied' && (
                    <button
                      onClick={() => updateStatus(selectedMessage.id, 'replied')}
                      className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl text-xs font-bold hover:bg-green-500/30 transition-all"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Odpowiedziano
                    </button>
                  )}
                  {selectedMessage.status !== 'archived' && (
                    <button
                      onClick={() => updateStatus(selectedMessage.id, 'archived')}
                      className="px-4 py-2 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-xl text-xs font-bold hover:bg-gray-500/30 transition-all"
                    >
                      <XCircle className="w-4 h-4 inline mr-1" />
                      Archiwum
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[#c9a84c]" />
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-black">Nadawca</span>
                  </div>
                  <div className="text-white font-bold">{selectedMessage.name}</div>
                  <div className="text-sm text-gray-400">{selectedMessage.email}</div>
                  {selectedMessage.phone && (
                    <div className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedMessage.phone}
                    </div>
                  )}
                </div>

                <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-[#c9a84c]" />
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-black">Temat</span>
                  </div>
                  <div className="text-white">{selectedMessage.topic}</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#c9a84c]" />
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-black">Data</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div>Wysłano: {new Date(selectedMessage.createdAt).toLocaleString('pl-PL')}</div>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-[#c9a84c]" />
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-black">Treść</span>
                  </div>
                  <div className="text-sm text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => updateStatus(selectedMessage.id, selectedMessage.status === 'new' ? 'read' : 'new')}
                    className="flex-1 py-3 bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white hover:bg-white/20 transition-all"
                  >
                    {selectedMessage.status === 'new' ? 'Oznacz jako przeczytane' : 'Oznacz jako nowe'}
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#c9a84c]" />
              </div>
              <h3 className="text-lg font-bold font-georgia italic text-white mb-2">Wybierz Wiadomość</h3>
              <p className="text-sm text-gray-500">Kliknij na wiadomość z listy, aby wyświetlić jej szczegóły</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsManager;