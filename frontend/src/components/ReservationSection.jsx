import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { submitReservation } from '../services/api';

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    booking_date: '',
    booking_time: '19:30',
    guests: 2,
    special_requests: ''
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Default to today's date formatted as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.customer_name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please provide a valid contact number.');
      return;
    }
    if (!formData.booking_date) {
      setErrorMessage('Please select a booking date.');
      return;
    }

    setLoading(true);
    try {
      const res = await submitReservation(formData);
      setSuccessResult(res.reservation || formData);
      // Reset form
      setFormData({
        customer_name: '',
        phone: '',
        email: '',
        booking_date: '',
        booking_time: '19:30',
        guests: 2,
        special_requests: ''
      });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit reservation. Please try again or WhatsApp us.');
    } finally {
      setLoading(false);
    }
  };

  // Pre-filled WhatsApp message URL
  const whatsAppMessage = encodeURIComponent(
    `Hello OHO! Veg Restaurant! I would like to book a table for ${formData.guests || 2} guests on ${formData.booking_date || 'an upcoming date'} at ${formData.booking_time}.`
  );
  const whatsAppUrl = `https://wa.me/919876543210?text=${whatsAppMessage}`;

  return (
    <section id="reservations" className="py-24 bg-[#042F2E] text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hospitality info */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="text-yellow-400 text-xs font-black uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              Table Reservation
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Reserve Your Feast at <em className="italic font-serif text-yellow-400">OHO!</em>
            </h2>

            <p className="text-teal-100 text-base leading-relaxed">
              Whether you are planning a relaxed family dinner, an anniversary celebration, or a corporate lunch, reserve your table ahead for a seamless dining experience.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Instant Confirmation & Reminder</h4>
                  <p className="text-xs text-teal-200 mt-0.5">We will hold your table for up to 15 minutes past your reserved time.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Special Dietary Arrangements</h4>
                  <p className="text-xs text-teal-200 mt-0.5">Separate Jain preparation without onion/garlic readily available upon request.</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4">
              <p className="text-xs text-gray-300 mb-2">Prefer instant messaging?</p>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book via WhatsApp (+91 98765 43210)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-gray-800 p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/20">
              
              {successResult ? (
                <div className="text-center py-8 space-y-4 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1B4332] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B4332]">
                    Reservation Submitted!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Thank you, <strong>{successResult.customer_name}</strong>. Your request for <strong>{successResult.guests} guests</strong> on <strong>{successResult.booking_date} at {successResult.booking_time}</strong> has been logged.
                  </p>
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-gray-200 text-xs text-gray-600 max-w-sm mx-auto">
                    Status: <span className="font-bold uppercase text-amber-600">Pending Host Confirmation</span>
                    <br />
                    Our reservation desk will call or WhatsApp you within 15 minutes.
                  </div>
                  <button
                    onClick={() => setSuccessResult(null)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#1B4332] text-white font-semibold text-xs hover:bg-[#2D6A4F] transition-all cursor-pointer"
                  >
                    Make Another Booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-gray-100 pb-3 mb-4">
                    <h3 className="font-serif text-2xl font-bold text-[#1B4332]">Book a Table</h3>
                    <p className="text-xs text-gray-500">Fill in the details below to reserve your dining experience</p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="customer_name"
                          required
                          placeholder="e.g. Anand R."
                          value={formData.customer_name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address (Optional)</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          name="email"
                          placeholder="e.g. anand@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Number of Guests *</label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Date *</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          name="booking_date"
                          required
                          min={today}
                          value={formData.booking_date}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Time Slot *</label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          name="booking_time"
                          value={formData.booking_time}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none bg-white"
                        >
                          <optgroup label="Breakfast & Tiffin">
                            <option value="08:00">08:00 AM</option>
                            <option value="09:00">09:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                          </optgroup>
                          <optgroup label="Lunch">
                            <option value="12:30">12:30 PM</option>
                            <option value="13:15">01:15 PM</option>
                            <option value="14:00">02:00 PM</option>
                          </optgroup>
                          <optgroup label="Dinner">
                            <option value="19:00">07:00 PM</option>
                            <option value="19:30">07:30 PM</option>
                            <option value="20:15">08:15 PM</option>
                            <option value="21:00">09:00 PM</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Special Requests or Occasion</label>
                    <textarea
                      name="special_requests"
                      rows="2"
                      placeholder="e.g. Birthday dinner, window seat, Jain food preference..."
                      value={formData.special_requests}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#1B4332] focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-600 to-yellow-500 hover:from-teal-800 hover:to-yellow-600 text-white font-extrabold text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></span>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 text-yellow-200" />
                        <span>Confirm Table Reservation at <em className="italic font-serif">OHO!</em></span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
