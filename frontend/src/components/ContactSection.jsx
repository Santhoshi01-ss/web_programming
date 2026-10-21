import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { submitEnquiry } from '../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.email || !formData.message) {
      setError('Please provide your name, email, and inquiry message.');
      return;
    }

    setLoading(true);
    try {
      await submitEnquiry(formData);
      setSuccess(true);
      setFormData({ customer_name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message || 'Error submitting enquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-800 text-xs font-black uppercase tracking-widest bg-teal-100 px-3.5 py-1.5 rounded-full border border-teal-200">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#042F2E] mt-3">
            Location, Hours & Enquiries at <em className="italic font-serif text-teal-700">OHO!</em>
          </h2>
          <p className="mt-3 text-gray-600 text-base">
            Have questions about party catering, bulk tiffins, or special dietary arrangements? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#EBE4D5] flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#D4AF37] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#1B4332]">Restaurant Address</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  #42, 100 Feet Heritage Boulevard, Near Gandhi Circle, MG Road, Bengaluru - 560001
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-xs font-bold text-[#2D6A4F] hover:underline"
                >
                  Get Directions via Google Maps &rarr;
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#EBE4D5] flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <h4 className="font-bold text-base text-[#1B4332]">Dining Timings</h4>
                <div className="flex justify-between gap-6 pt-1">
                  <span>Breakfast & Tiffin:</span>
                  <strong className="text-gray-800">7:00 AM – 11:30 AM</strong>
                </div>
                <div className="flex justify-between gap-6">
                  <span>Lunch Feast:</span>
                  <strong className="text-gray-800">12:00 PM – 3:45 PM</strong>
                </div>
                <div className="flex justify-between gap-6">
                  <span>Evening & Dinner:</span>
                  <strong className="text-gray-800">7:00 PM – 11:00 PM</strong>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#EBE4D5] flex items-start gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <h4 className="font-bold text-base text-[#1B4332]">Direct Phone & WhatsApp</h4>
                <p>Front Desk: <strong>+91 (080) 2558-8901</strong></p>
                <p>Reservations & WhatsApp: <strong>+91 98765 43210</strong></p>
                <p>Email: <strong>dine@hoveg.com</strong></p>
              </div>
            </div>

          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FDFBF7] border border-[#EBE4D5] shadow-lg">
              <h3 className="font-serif text-2xl font-bold text-[#1B4332] mb-1">
                Send an Online Enquiry
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                We typically respond within 2 business hours for event & catering queries.
              </p>

              {success ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-800 text-lg">Thank You!</h4>
                  <p className="text-xs text-emerald-700">
                    Your enquiry has been submitted. Our guest relations manager will reach out shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-xs font-bold text-emerald-800 underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="customer_name"
                        required
                        value={formData.customer_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full p-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full p-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full p-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Message or Enquiry *</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event, party catering, dietary needs, or question..."
                      className="w-full p-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-700 via-teal-600 to-yellow-500 hover:from-teal-800 hover:to-yellow-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-yellow-200" />
                        <span>Send Message to <em className="italic font-serif">OHO!</em></span>
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
