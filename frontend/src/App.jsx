import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ReservationSection from './components/ReservationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import DishDetailModal from './components/DishDetailModal';
import AdminDashboard from './components/AdminDashboard';
import { fetchMenu } from './services/api';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [dishes, setDishes] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);

  // Admin state
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('vihan_admin_token'));

  // Modals
  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    photo: null,
    list: [],
    index: 0
  });

  const [selectedDish, setSelectedDish] = useState(null);

  // Load menu items
  const loadMenuData = async () => {
    setLoadingMenu(true);
    try {
      const items = await fetchMenu();
      setDishes(items);
    } catch (err) {
      console.error("Error fetching menu:", err);
    } finally {
      setLoadingMenu(false);
    }
  };

  useEffect(() => {
    loadMenuData();
  }, []);

  const scrollToSection = (id) => {
    setActivePage(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lightbox Handlers
  const handleOpenLightbox = (photo, list, index) => {
    setLightboxData({
      isOpen: true,
      photo,
      list,
      index
    });
  };

  const handleCloseLightbox = () => {
    setLightboxData(prev => ({ ...prev, isOpen: false }));
  };

  const handlePrevLightbox = () => {
    setLightboxData(prev => {
      const newIndex = (prev.index - 1 + prev.list.length) % prev.list.length;
      return {
        ...prev,
        index: newIndex,
        photo: prev.list[newIndex]
      };
    });
  };

  const handleNextLightbox = () => {
    setLightboxData(prev => {
      const newIndex = (prev.index + 1) % prev.list.length;
      return {
        ...prev,
        index: newIndex,
        photo: prev.list[newIndex]
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#212529] selection:bg-[#1B4332] selection:text-[#FDFBF7]">
      
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservations')}
        />

        {/* Featured Signature Dishes */}
        <FeaturedDishes
          dishes={dishes}
          onSelectDish={(dish) => setSelectedDish(dish)}
          onExploreFullMenu={() => scrollToSection('menu')}
        />

        {/* Interactive Menu Section */}
        <MenuSection
          dishes={dishes}
          onSelectDish={(dish) => setSelectedDish(dish)}
        />

        {/* About Us & Heritage */}
        <AboutSection />

        {/* Visual Gallery with Lightbox */}
        <GallerySection
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Table Reservation & WhatsApp */}
        <ReservationSection />

        {/* Contact, Timings & Customer Enquiry */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Lightbox Modal */}
      {lightboxData.isOpen && (
        <LightboxModal
          photo={lightboxData.photo}
          allPhotos={lightboxData.list}
          currentIndex={lightboxData.index}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}

      {/* Dish Detail Modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onBookTable={() => scrollToSection('reservations')}
        />
      )}

      {/* Admin Operations Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => {
          setAdminOpen(false);
          loadMenuData(); // refresh dishes if edited in admin
        }}
        onAuthChange={(isAuth) => setIsAdminLoggedIn(isAuth)}
      />

    </div>
  );
}
