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
  Building
} from 'lucide-react';
import { fetchAdminLeads, updateLeadStatus, deleteLead } from '../../utils/api';
import { LeadRecord, LeadStatus } from '../../types';
import { OWNER_INFO } from '../../data/mockData';

export const AdminLeadsDashboard: React.FC = () => {
  const [password, setPassword] = useState(localStorage.getItem('growthlab_admin_pass') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState('');
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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'In Discussion':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div id="admin-login-view" className="pt-36 pb-24 max-w-md mx-auto px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Owner Lead Pipeline</h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized access for Shailendra Mishra ({OWNER_INFO.email}).
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password (growthlab2025)"
              value={inputPass}
              onChange={(e) => setInputPass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-600 outline-none font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
              <span>Authenticate Portal</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-leads-dashboard" className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Authenticated Owner Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">Shailendra Mishra</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Client Inquiries & Business Opportunity CRM
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadLeads()}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Inquiries', count: leads.length, color: 'text-slate-900' },
          { label: 'New / Unread', count: leads.filter((l) => l.status === 'New').length, color: 'text-blue-600' },
          { label: 'In Discussion', count: leads.filter((l) => l.status === 'In Discussion').length, color: 'text-purple-600' },
          { label: 'Converted', count: leads.filter((l) => l.status === 'Converted').length, color: 'text-emerald-600' },
          { label: 'Contacted', count: leads.filter((l) => l.status === 'Contacted').length, color: 'text-amber-600' },
        ].map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {m.label}
            </span>
            <div className={`text-2xl font-extrabold mt-1 ${m.color}`}>{m.count}</div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search leads by name, email, query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-blue-600 outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'New', 'Contacted', 'In Discussion', 'Converted', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
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
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500 text-xs">
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
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:border-slate-300 transition-all space-y-4"
              >
                {/* Card Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{lead.name}</h3>
                      {lead.businessName && (
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span>{lead.businessName}</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {lead.industry || 'General'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <a href={`mailto:${lead.email}`} className="hover:text-blue-600 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lead.email}</span>
                      </a>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="hover:text-emerald-600 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{lead.phone}</span>
                        </a>
                      )}
                      <span className="text-slate-400 text-[11px] flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Problem Statement Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                  <span className="font-bold text-slate-500 block text-[10px] uppercase tracking-wider mb-1">
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
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:border-blue-600 outline-none"
                        />
                        <button
                          onClick={() => handleSaveNotes(lead.id)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-1.5 text-slate-400 hover:text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="font-semibold text-slate-500">Internal Notes:</span>
                        <span className="italic">{lead.notes || 'No notes yet.'}</span>
                        <button
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setNotesText(lead.notes || '');
                          }}
                          className="p-1 text-slate-400 hover:text-blue-600"
                          title="Edit Notes"
                        >
                          <Edit2 className="w-3 h-3" />
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
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Client</span>
                    </a>

                    <a
                      href={`mailto:${lead.email}?subject=AI%20GrowthLab%20-%20Discussion%20re:%20${encodeURIComponent(
                        lead.businessName || 'Your Business'
                      )}`}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>Email Client</span>
                    </a>

                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-1.5 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
