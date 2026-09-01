import React, { useState, useEffect } from 'react';
import {
  Lock,
  Search,
  Filter,
  Download,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Edit2,
  Trash2,
  Layers,
  ArrowRight,
  Shield,
  Building,
  Key,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { fetchAdminLeads, updateLeadStatus, deleteLead, adminLogin } from '../../utils/api';
import { LeadRecord, LeadStatus } from '../../types';
import { OWNER_INFO } from '../../data/mockData';

export const AdminLeadsDashboard: React.FC = () => {
  const [password, setPassword] = useState(localStorage.getItem('growthlab_admin_pass') || 'growthlab2026');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState('growthlab2026');
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const loadLeads = async (passToUse?: string) => {
    const key = passToUse || password;
    if (!key) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminLeads(key);
      setLeads(data.leads || []);
      setIsAuthenticated(true);
      localStorage.setItem('growthlab_admin_pass', key);
    } catch (err: any) {
      setError(err.message || 'Incorrect admin password.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) {
      loadLeads(password);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPassword(inputPass);
    loadLeads(inputPass);
  };

  const handleQuickUnlock = (passKey: string) => {
    setInputPass(passKey);
    setPassword(passKey);
    loadLeads(passKey);
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(password, id, newStatus);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      await updateLeadStatus(password, id, undefined, notesText);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, notes: notesText } : lead))
      );
      setEditingNotesId(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update notes.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    try {
      await deleteLead(password, id);
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete lead.');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Business', 'Email', 'Phone', 'Industry', 'Problem', 'Status', 'CreatedAt', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${(l.businessName || '').replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${l.industry || ''}"`,
      `"${l.problem.replace(/"/g, '""')}"`,
      l.status,
      l.createdAt,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ai_growthlab_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      l.name.toLowerCase().includes(q) ||
      (l.businessName && l.businessName.toLowerCase().includes(q)) ||
      l.email.toLowerCase().includes(q) ||
      (l.phone && l.phone.includes(q)) ||
      l.problem.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Contacted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'In Discussion':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Converted':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  if (!isAuthenticated) {
    return (
      <div id="admin-login-view" className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4">
        <div className="w-full max-w-md bento-card p-8 sm:p-10 space-y-6 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Owner Lead Portal</h2>
            <p className="text-xs text-slate-400">
              Direct pipeline for <strong className="text-slate-200">Shailendra Mishra</strong> ({OWNER_INFO.email})
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Master Passkey:
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  placeholder="Enter passkey (e.g. growthlab2026)"
                  value={inputPass}
                  onChange={(e) => setInputPass(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm font-mono focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
              <span>Authenticate & Open Dashboard</span>
            </button>
          </form>

          {/* Quick Unlock Preset Helpers */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              1-Click Quick Passkey:
            </span>
            <div className="flex justify-center gap-2">
              {['growthlab2026', 'growthlab2025', 'shailendra2026'].map((pk) => (
                <button
                  key={pk}
                  type="button"
                  onClick={() => handleQuickUnlock(pk)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-indigo-300 border border-white/10 hover:border-indigo-500/40 text-[11px] font-mono transition-colors"
                >
                  {pk}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-leads-dashboard" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header Bento Box */}
      <div className="bento-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Authenticated Portal</span>
            </span>
            <span className="text-xs text-indigo-400 font-mono">Shailendra Mishra</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Client Inquiries & Business Opportunity CRM
          </h1>
          <p className="text-xs text-slate-400">
            Real-time pipeline of incoming business inquiries, contact details, and follow-up notes.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => loadLeads()}
            disabled={loading}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 border border-indigo-400/30 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Inquiries', count: leads.length, color: 'text-white' },
          { label: 'New / Unread', count: leads.filter((l) => l.status === 'New').length, color: 'text-blue-400' },
          { label: 'In Discussion', count: leads.filter((l) => l.status === 'In Discussion').length, color: 'text-purple-400' },
          { label: 'Converted', count: leads.filter((l) => l.status === 'Converted').length, color: 'text-emerald-400' },
          { label: 'Contacted', count: leads.filter((l) => l.status === 'Contacted').length, color: 'text-amber-400' },
        ].map((m, idx) => (
          <div key={idx} className="bento-subcard p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {m.label}
            </span>
            <div className={`text-2xl font-extrabold mt-1 font-mono ${m.color}`}>{m.count}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bento-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, email, query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'New', 'Contacted', 'In Discussion', 'Converted', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Cards / List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bento-card p-12 text-center text-slate-400 text-xs border-dashed border-white/10">
            No leads match the selected filter.
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const whatsappText = encodeURIComponent(
              `Hi ${lead.name}, this is Shailendra Mishra from AI GrowthLab. I reviewed your problem regarding "${lead.problem.slice(0, 80)}..." and would love to discuss a practical AI solution.`
            );
            const whatsappHref = lead.phone
              ? `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${whatsappText}`
              : `${OWNER_INFO.whatsappLink}`;

            return (
              <div
                key={lead.id}
                className="bento-card p-6 space-y-4 hover:border-indigo-500/40 transition-all group"
              >
                {/* Card Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {lead.name}
                      </h3>
                      {lead.businessName && (
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{lead.businessName}</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/5 text-slate-300 border border-white/10">
                        {lead.industry || 'General'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-0.5">
                      <a href={`mailto:${lead.email}`} className="hover:text-indigo-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{lead.email}</span>
                      </a>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="hover:text-emerald-300 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{lead.phone}</span>
                        </a>
                      )}
                      <span className="text-slate-500 text-[11px] flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(lead.createdAt).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-semibold text-slate-400">Status:</span>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer bg-slate-900 ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      <option value="New" className="bg-slate-900 text-white">New</option>
                      <option value="Contacted" className="bg-slate-900 text-white">Contacted</option>
                      <option value="In Discussion" className="bg-slate-900 text-white">In Discussion</option>
                      <option value="Converted" className="bg-slate-900 text-white">Converted</option>
                      <option value="Closed" className="bg-slate-900 text-white">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Problem Statement Box */}
                <div className="p-4 rounded-2xl bento-subcard text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  <span className="font-bold text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
                    Submitted Business Problem:
                  </span>
                  {lead.problem}
                </div>

                {/* Notes & Actions Bottom Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  {/* Notes Segment */}
                  <div className="flex-1 text-xs">
                    {editingNotesId === lead.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder="Add internal discussion note..."
                          className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-indigo-500 outline-none"
                        />
                        <button
                          onClick={() => handleSaveNotes(lead.id)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-1.5 text-slate-400 hover:text-slate-200 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="font-semibold text-slate-300">Internal Notes:</span>
                        <span className="italic text-slate-300">{lead.notes || 'No notes yet.'}</span>
                        <button
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setNotesText(lead.notes || '');
                          }}
                          className="p-1 text-slate-500 hover:text-indigo-300"
                          title="Edit Notes"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 1-Click Messaging Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </a>

                    <a
                      href={`mailto:${lead.email}?subject=AI%20GrowthLab%20-%20Discussion%20re:%20${encodeURIComponent(
                        lead.businessName || 'Your Business Problem'
                      )}`}
                      className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Client</span>
                    </a>

                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
