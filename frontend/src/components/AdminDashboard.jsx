import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Plus, Trash2, Edit3, CheckCircle, 
  XCircle, Clock, Utensils, MessageSquare, AlertCircle, RefreshCw, X, Eye, EyeOff
} from 'lucide-react';
import { 
  adminLogin, adminGetStats, adminGetMenu, adminCreateMenu, 
  adminUpdateMenu, adminDeleteMenu, adminGetReservations, 
  adminUpdateReservation, adminGetEnquiries, adminUpdateEnquiry 
} from '../services/api';

export default function AdminDashboard({ isOpen, onClose, onAuthChange }) {
  const [token, setToken] = useState(localStorage.getItem('vihan_admin_token') || '');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('vihanveg123');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin View: 'stats', 'menu', 'reservations', 'enquiries'
  const [activeTab, setActiveTab] = useState('reservations');

  // Data states
  const [stats, setStats] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Menu Modal State (Add / Edit)
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    category: 'breakfast',
    price: '',
    description: '',
    image_url: '',
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: 'medium',
    dietary: 'Pure Veg'
  });

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await adminLogin({ username, password });
      setToken(res.token);
      localStorage.setItem('vihan_admin_token', res.token);
      onAuthChange(true);
      loadAllAdminData(res.token);
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('vihan_admin_token');
    onAuthChange(false);
  };

  const loadAllAdminData = async (activeTok = token) => {
    if (!activeTok) return;
    setLoading(true);
    try {
      const [statsData, menuData, resData, enqData] = await Promise.allSettled([
        adminGetStats(activeTok),
        adminGetMenu(activeTok),
        adminGetReservations(activeTok),
        adminGetEnquiries(activeTok)
      ]);

      if (statsData.status === 'fulfilled') setStats(statsData.value);
      if (menuData.status === 'fulfilled') setMenuItems(menuData.value);
      if (resData.status === 'fulfilled') setReservations(resData.value);
      if (enqData.status === 'fulfilled') setEnquiries(enqData.value);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && isOpen) {
      loadAllAdminData(token);
    }
  }, [token, isOpen]);

  // Reservation Status Change
  const handleUpdateReservationStatus = async (id, newStatus) => {
    try {
      await adminUpdateReservation(token, id, newStatus);
      setActionMessage(`Reservation #${id} updated to ${newStatus}`);
      setTimeout(() => setActionMessage(''), 3000);
      loadAllAdminData(token);
    } catch (err) {
      alert("Failed to update reservation: " + err.message);
    }
  };

  // Enquiry Status Change
  const handleUpdateEnquiryStatus = async (id, newStatus) => {
    try {
      await adminUpdateEnquiry(token, id, newStatus);
      loadAllAdminData(token);
    } catch (err) {
      alert("Failed to update enquiry: " + err.message);
    }
  };

  // Menu Item Actions
  const handleOpenAddMenu = () => {
    setEditingItem(null);
    setMenuForm({
      name: '',
      category: 'breakfast',
      price: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      is_available: true,
      is_featured: false,
      is_chef_special: false,
      spice_level: 'medium',
      dietary: 'Pure Veg'
    });
    setMenuModalOpen(true);
  };

  const handleOpenEditMenu = (item) => {
    setEditingItem(item);
    setMenuForm({ ...item });
    setMenuModalOpen(true);
  };

  const handleSaveMenu = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await adminUpdateMenu(token, editingItem.id, menuForm);
        setActionMessage(`Updated '${menuForm.name}'`);
      } else {
        await adminCreateMenu(token, menuForm);
        setActionMessage(`Added '${menuForm.name}'`);
      }
      setMenuModalOpen(false);
      setTimeout(() => setActionMessage(''), 3000);
      loadAllAdminData(token);
    } catch (err) {
      alert("Error saving dish: " + err.message);
    }
  };

  const handleDeleteMenu = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete '${name}' from the menu?`)) return;
    try {
      await adminDeleteMenu(token, id);
      setActionMessage(`Deleted '${name}'`);
      setTimeout(() => setActionMessage(''), 3000);
      loadAllAdminData(token);
    } catch (err) {
      alert("Error deleting dish: " + err.message);
    }
  };

  const handleToggleAvailable = async (item) => {
    try {
      await adminUpdateMenu(token, item.id, { is_available: !item.is_available });
      loadAllAdminData(token);
    } catch (err) {
      alert("Error updating availability: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top Bar */}
        <div className="bg-[#042F2E] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-teal-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-teal-600 to-yellow-500 text-[#042F2E]">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold"><em className="italic font-serif">OHO!</em> Veg — Staff & Admin Portal</h2>
              <p className="text-[11px] text-yellow-400">Operations, Menu CRUD & Table Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={() => loadAllAdminData(token)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="p-2 px-3 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action message banner */}
        {actionMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs px-6 py-2 font-medium flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage('')}><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FDFBF7]">
          
          {!token ? (
            /* Admin Login View */
            <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl shadow-lg border border-gray-200/80 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B4332]">Restaurant Admin Login</h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">
                Restricted to authorized restaurant management staff.
              </p>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs text-left border border-red-200">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 pr-10 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                  <strong>Default Demo Credentials:</strong>
                  <br />Username: <code className="bg-amber-100 px-1 py-0.5 rounded">admin</code>
                  <br />Password: <code className="bg-amber-100 px-1 py-0.5 rounded">vihanveg123</code>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  ) : (
                    <span>Sign In to Admin Portal</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div>
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
                {[
                  { id: 'reservations', label: 'Table Reservations', icon: <Clock className="w-4 h-4" />, count: reservations.length },
                  { id: 'menu', label: 'Menu Management', icon: <Utensils className="w-4 h-4" />, count: menuItems.length },
                  { id: 'enquiries', label: 'Customer Inquiries', icon: <MessageSquare className="w-4 h-4" />, count: enquiries.length },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#1B4332] text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      activeTab === tab.id ? 'bg-[#D4AF37] text-[#0F281E]' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* TAB 1: RESERVATIONS */}
              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-[#1B4332]">
                      Guest Table Bookings ({reservations.length})
                    </h3>
                  </div>

                  {reservations.length === 0 ? (
                    <p className="text-gray-500 text-sm py-8 text-center">No reservations found.</p>
                  ) : (
                    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#1B4332]/5 text-[#1B4332] uppercase tracking-wider font-bold border-b border-gray-200">
                          <tr>
                            <th className="p-3.5">ID</th>
                            <th className="p-3.5">Guest Name</th>
                            <th className="p-3.5">Phone / Contact</th>
                            <th className="p-3.5">Date & Time</th>
                            <th className="p-3.5">Guests</th>
                            <th className="p-3.5">Special Requests</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {reservations.map(res => (
                            <tr key={res.id} className="hover:bg-gray-50/80">
                              <td className="p-3.5 font-bold text-gray-400">#{res.id}</td>
                              <td className="p-3.5 font-bold text-gray-900">{res.customer_name}</td>
                              <td className="p-3.5">
                                <a 
                                  href={`tel:${res.phone}`} 
                                  className="text-blue-600 hover:underline font-medium block"
                                >
                                  {res.phone}
                                </a>
                                {res.email && <span className="text-gray-400 text-[11px]">{res.email}</span>}
                              </td>
                              <td className="p-3.5">
                                <span className="font-semibold text-gray-800">{res.booking_date}</span>
                                <span className="block text-gray-500 font-mono text-[11px]">{res.booking_time}</span>
                              </td>
                              <td className="p-3.5 font-bold text-[#1B4332]">
                                {res.guests} {res.guests === 1 ? 'person' : 'people'}
                              </td>
                              <td className="p-3.5 text-gray-500 max-w-xs truncate" title={res.special_requests}>
                                {res.special_requests || '—'}
                              </td>
                              <td className="p-3.5">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                  res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                  res.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-amber-100 text-amber-800 animate-pulse'
                                }`}>
                                  {res.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                                {res.status !== 'confirmed' && (
                                  <button
                                    onClick={() => handleUpdateReservationStatus(res.id, 'confirmed')}
                                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                                    title="Confirm Booking"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                )}
                                {res.status !== 'cancelled' && (
                                  <button
                                    onClick={() => handleUpdateReservationStatus(res.id, 'cancelled')}
                                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                    title="Cancel Booking"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: MENU MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1B4332]">Menu Catalog</h3>
                      <p className="text-xs text-gray-500">Add, edit, change prices, and toggle dish availability</p>
                    </div>
                    <button
                      onClick={handleOpenAddMenu}
                      className="px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#D4AF37]" />
                      <span>Add New Dish</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map(item => (
                      <div 
                        key={item.id} 
                        className={`p-4 rounded-2xl bg-white border shadow-sm flex gap-3 transition-all ${
                          item.is_available ? 'border-gray-200' : 'border-red-200 bg-red-50/20 opacity-75'
                        }`}
                      >
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 bg-gray-100"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-[#40916C]">
                                {item.category.replace('_', ' ')}
                              </span>
                              <span className="font-bold text-sm text-[#1B4332]">₹{item.price}</span>
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 truncate" title={item.name}>
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-gray-500 line-clamp-1">{item.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                            <button
                              onClick={() => handleToggleAvailable(item)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                                item.is_available 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {item.is_available ? 'In Stock' : 'Out of Stock'}
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEditMenu(item)}
                                className="p-1 rounded text-gray-600 hover:text-[#1B4332] hover:bg-gray-100 cursor-pointer"
                                title="Edit Dish"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMenu(item.id, item.name)}
                                className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                title="Delete Dish"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1B4332]">
                    Customer Enquiries & Feedback ({enquiries.length})
                  </h3>

                  {enquiries.length === 0 ? (
                    <p className="text-gray-500 text-sm py-8 text-center">No enquiries yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enquiries.map(enq => (
                        <div key={enq.id} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-sm text-gray-900">{enq.customer_name}</h4>
                              <p className="text-xs text-blue-600">{enq.email}</p>
                              {enq.phone && <p className="text-xs text-gray-500">{enq.phone}</p>}
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              enq.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {enq.status}
                            </span>
                          </div>

                          <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            "{enq.message}"
                          </p>

                          <div className="flex items-center justify-between text-[11px] pt-1">
                            <span className="text-gray-400">
                              {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'Recent'}
                            </span>
                            {enq.status === 'unread' && (
                              <button
                                onClick={() => handleUpdateEnquiryStatus(enq.id, 'read')}
                                className="font-bold text-[#2D6A4F] hover:underline"
                              >
                                Mark as Read
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* Add / Edit Dish Modal */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-[#1B4332]">
                {editingItem ? 'Edit Dish' : 'Add New Vegetarian Dish'}
              </h3>
              <button onClick={() => setMenuModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSaveMenu} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  placeholder="e.g. Paneer Butter Masala"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none bg-white"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="south_indian">South Indian</option>
                    <option value="north_indian">North Indian</option>
                    <option value="chinese">Chinese</option>
                    <option value="beverages">Beverages</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    placeholder="240"
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={menuForm.image_url}
                  onChange={(e) => setMenuForm({ ...menuForm, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  placeholder="Ingredients, preparation style..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                ></textarea>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={menuForm.is_available}
                    onChange={(e) => setMenuForm({ ...menuForm, is_available: e.target.checked })}
                    className="rounded text-[#1B4332]"
                  />
                  <span>Available in Stock</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={menuForm.is_featured}
                    onChange={(e) => setMenuForm({ ...menuForm, is_featured: e.target.checked })}
                    className="rounded text-[#1B4332]"
                  />
                  <span>Featured on Home</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={menuForm.is_chef_special}
                    onChange={(e) => setMenuForm({ ...menuForm, is_chef_special: e.target.checked })}
                    className="rounded text-[#1B4332]"
                  />
                  <span>Chef's Special Badge</span>
                </label>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMenuModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
