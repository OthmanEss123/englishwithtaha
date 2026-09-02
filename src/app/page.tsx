"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Users,
  Play,
  Check,
  ShieldCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  PenTool,
  MessageCircle,
  FileSearch,
  X,
  Sparkles,
} from "lucide-react";

// Pixel-perfect WhatsApp SVG Icon
function WhatsAppIcon({ className = "w-5 h-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.004 2C6.48 2 2 6.48 2 12.004C2 13.882 2.52 15.642 3.425 17.152L2.086 21.914L6.968 20.602C8.441 21.455 10.165 21.944 12.004 21.944C17.528 21.944 22.008 17.464 22.008 11.94C22.008 6.416 17.528 2 12.004 2ZM12.004 20.264C10.378 20.264 8.854 19.789 7.558 18.966L7.241 18.766L4.354 19.539L5.144 16.719L4.924 16.37C4.032 14.952 3.559 13.31 3.559 11.94C3.559 7.284 7.348 3.495 12.004 3.495C16.66 3.495 20.449 7.284 20.449 11.94C20.449 16.596 16.66 20.264 12.004 20.264ZM16.634 14.498C16.381 14.372 15.132 13.758 14.901 13.673C14.67 13.589 14.502 13.547 14.333 13.8C14.165 14.053 13.68 14.622 13.533 14.791C13.385 14.96 13.238 14.981 12.985 14.854C12.732 14.728 11.916 14.461 10.947 13.597C10.192 12.924 9.682 12.093 9.535 11.84C9.387 11.587 9.519 11.45 9.646 11.324C9.76 11.21 9.9 11.027 10.026 10.88C10.153 10.732 10.195 10.627 10.279 10.458C10.364 10.289 10.322 10.142 10.258 10.015C10.195 9.889 9.689 8.646 9.478 8.14C9.273 7.647 9.064 7.714 8.909 7.706C8.761 7.697 8.592 7.697 8.424 7.697C8.255 7.697 7.981 7.761 7.749 8.014C7.517 8.267 6.864 8.878 6.864 10.121C6.864 11.364 7.77 12.565 7.896 12.734C8.023 12.903 9.676 15.452 12.204 16.543C12.806 16.803 13.272 16.958 13.638 17.075C14.241 17.266 14.79 17.239 15.224 17.174C15.707 17.102 16.711 16.566 16.922 15.976C17.133 15.386 17.133 14.88 17.07 14.775C17.006 14.669 16.887 14.625 16.634 14.498Z" />
    </svg>
  );
}

export default function HomePage() {
  const [selectedGoal, setSelectedGoal] = useState<string>("Speaking");
  const [selectedOption, setSelectedOption] = useState<"just-me" | "friend">("just-me");
  const [firstName, setFirstName] = useState<string>("Othman");
  const [lastName, setLastName] = useState<string>("Essaadi");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const phoneNumber = "212600000000";

  const buildWhatsAppLink = () => {
    const optionText = selectedOption === "just-me" ? "Just Me" : "Me + A Friend";
    const message = `Hello Taha! I am ${firstName || "Student"} ${lastName || ""}. I would like to join the English with Taha program (${optionText}) for my goal: ${selectedGoal}. Please share the offer details!`;
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  };

  const goals = ["Speaking", "Career", "Studies", "Travel"];

  const componentsList = [
    {
      id: "vocab",
      iconType: "A",
      badgeClass: "badge-blue",
      title: "Vocabulary",
      desc: "Expand your vocabulary and use words confidently.",
    },
    {
      id: "reading",
      icon: <BookOpen className="w-5 h-5" />,
      badgeClass: "badge-green",
      title: "Reading",
      desc: "Read and understand different texts with ease.",
    },
    {
      id: "writing",
      icon: <PenTool className="w-5 h-5" />,
      badgeClass: "badge-amber",
      title: "Writing",
      desc: "Write clear, well-structured texts for any purpose.",
    },
    {
      id: "functions",
      icon: <MessageCircle className="w-5 h-5" />,
      badgeClass: "badge-purple",
      title: "Functions",
      desc: "Learn useful expressions for real-life situations.",
    },
    {
      id: "grammar",
      iconType: "G",
      badgeClass: "badge-pink",
      title: "Grammar",
      desc: "Master grammar rules and use them accurately.",
    },
    {
      id: "comprehension",
      icon: <FileSearch className="w-5 h-5" />,
      badgeClass: "badge-teal",
      title: "Reading Comprehension",
      desc: "Understand texts better and answer with confidence.",
    },
  ];

  return (
    <main className="page-container">
      {/* Top Header */}
      <header className="site-header">
        <div className="program-badge">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>2026 / 2027 PROGRAM</span>
        </div>

        <button
          className="menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </header>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="modal-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <div className="program-badge">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>English with Taha</span>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="mobile-nav-links">
              <a
                href="#program"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Program Overview
              </a>
              <a
                href="#enroll"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Choose Your Option
              </a>
              <a
                href="#components"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                English Components
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ marginTop: "0.5rem" }}
              >
                <WhatsAppIcon size={18} />
                <span>Get My Offer on WhatsApp</span>
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section" id="program">
        {/* Left Column */}
        <div className="hero-left">
          <h1 className="hero-title">
            DON&apos;T JUST<br />
            LEARN ENGLISH.<br />
            <span className="hero-title-highlight">START SPEAKING IT.</span>
          </h1>

          <p className="hero-subtitle">
            A practical program with Taha to help you speak confidently, communicate
            naturally and actually use your English.
          </p>

          <div className="cta-group">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              id="hero-whatsapp-cta"
            >
              <WhatsAppIcon size={20} />
              <span>Get My Offer on WhatsApp</span>
            </a>

            <button
              className="btn-ghost-video"
              onClick={() => setIsVideoModalOpen(true)}
              id="watch-how-it-works-btn"
            >
              <div className="play-icon-wrap">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <span>Watch how it works</span>
            </button>
          </div>

          <div className="social-proof">
            <div className="avatar-stack">
              <Image
                src="/images/avatar1.jpg"
                alt="Student 1"
                width={38}
                height={38}
                className="avatar-item"
              />
              <Image
                src="/images/avatar2.jpg"
                alt="Student 2"
                width={38}
                height={38}
                className="avatar-item"
              />
              <Image
                src="/images/avatar3.jpg"
                alt="Student 3"
                width={38}
                height={38}
                className="avatar-item"
              />
              <Image
                src="/images/avatar4.jpg"
                alt="Student 4"
                width={38}
                height={38}
                className="avatar-item"
              />
            </div>
            <div className="social-proof-text">
              <span className="social-count">+1500 Students</span>
              <span className="social-desc">Join our community</span>
            </div>
          </div>
        </div>

        {/* Right Column: Instructor & Badges */}
        <div className="hero-right">
          {/* Royal Blue Curved Backdrop Shape */}
          <div className="hero-backdrop-circle">
            <div className="hero-backdrop-dots"></div>
          </div>

          {/* Handwritten Style Words on the Blue Area */}
          <div className="hero-handwritten-text">
            <span className="handwritten-word">Speak.</span>
            <span className="handwritten-word">Practice.</span>
            <span className="handwritten-word">Improve.</span>
            <svg
              className="handwritten-arrow"
              width="45"
              height="20"
              viewBox="0 0 45 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6C14 2 28 3 40 14M40 14L32 12M40 14L38 5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Taha Cutout Instructor Image */}
          <div className="hero-image-wrapper">
            <Image
              src="/images/taha_clean.png"
              alt="Taha - English Instructor"
              width={420}
              height={682}
              priority
              unoptimized
              className="hero-image"
            />
          </div>

          {/* Floating Registration Card */}
          <div className="floating-reg-card">
            <div className="reg-card-top">
              <div className="reg-card-icon-wrap">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span className="reg-card-title">2026 / 2027</span>
                <p className="reg-card-status">Registration<br />Open!</p>
              </div>
            </div>
            <div className="reg-card-badge">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Limited Seats</span>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Interactive Section: WhatsApp Chat Simulation & Offer Form */}
      <section className="middle-section" id="enroll">
        <div className="middle-grid">
          {/* Left Card: Interactive WhatsApp Chat Preview */}
          <div className="chat-preview-card">
            <div className="chat-header">
              <div className="chat-avatar-thumb-wrap">
                <Image
                  src="/images/taha_clean.png"
                  alt="Taha Avatar"
                  width={42}
                  height={68}
                  unoptimized
                  className="chat-avatar-thumb"
                />
              </div>
              <div className="chat-header-info">
                <span className="chat-header-name">English with Taha</span>
                <span className="chat-header-status">
                  <span className="online-dot"></span> Online
                </span>
              </div>
            </div>

            <div className="chat-body">
              <div className="chat-bubble-received">
                <p className="chat-bubble-greeting">Hey {firstName || "there"} 👋</p>
                <p className="chat-bubble-question">What&apos;s your main English goal?</p>
                <span className="chat-bubble-time">10:30</span>
              </div>

              <div>
                <div className="chat-chips-grid">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      className={`chat-chip ${selectedGoal === goal ? "active" : ""}`}
                      onClick={() => setSelectedGoal(goal)}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {selectedGoal && (
                <div className="chat-response-preview">
                  <span>🎯 Goal selected: <strong>{selectedGoal}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* Right Card: Choose Your Option */}
          <div className="option-selection-card">
            <h2 className="option-section-title">CHOOSE YOUR OPTION</h2>

            {/* Tab Switcher */}
            <div className="option-tab-switcher">
              <button
                className={`tab-btn ${selectedOption === "just-me" ? "active" : ""}`}
                onClick={() => setSelectedOption("just-me")}
              >
                <Users className="w-4 h-4" />
                <span>Just Me</span>
              </button>
              <button
                className={`tab-btn ${selectedOption === "friend" ? "active" : ""}`}
                onClick={() => setSelectedOption("friend")}
              >
                <Users className="w-4 h-4" />
                <span>Me + A Friend</span>
              </button>
            </div>

            {/* Plan Details & Form */}
            <div className="plan-detail-card">
              {/* Left Column: Perks */}
              <div className="plan-info-col">
                <div className="plan-header-row">
                  <div className="plan-badge-icon">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="plan-title-wrap">
                    <h3 className="plan-name">
                      {selectedOption === "just-me" ? "JUST ME" : "ME + A FRIEND"}
                    </h3>
                    <span className="plan-subname">English with Taha Program</span>
                  </div>
                </div>

                <ul className="perks-list">
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Personalized learning path</span>
                  </li>
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Speaking &amp; pronunciation</span>
                  </li>
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Practice &amp; feedback</span>
                  </li>
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Progress tracking</span>
                  </li>
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Support &amp; guidance</span>
                  </li>
                </ul>
              </div>

              {/* Right Column: Pricing & Name Inputs */}
              <div className="plan-form-col">
                <div className="pricing-block">
                  <span className="pricing-amount">XX MAD</span>
                  <span className="pricing-duration">One-time / Full Program</span>
                </div>

                <div className="form-inputs-group">
                  <div className="input-field-wrap">
                    <label className="input-label">First name</label>
                    <input
                      type="text"
                      className="text-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Othman"
                    />
                  </div>
                  <div className="input-field-wrap">
                    <label className="input-label">Last name</label>
                    <input
                      type="text"
                      className="text-input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Essaadi"
                    />
                  </div>
                </div>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp btn-form-whatsapp"
                  id="form-whatsapp-cta"
                >
                  <WhatsAppIcon size={18} />
                  <span>Get My Offer on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges-row">
              <span className="trust-item">
                <ShieldCheck className="w-4 h-4 trust-icon" />
                <span>No payment required</span>
              </span>
              <span className="trust-item">
                <Zap className="w-4 h-4 trust-icon" />
                <span>Takes less than 1 minute</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* English Components Section */}
      <section className="components-section" id="components">
        <div className="components-header">
          <h2 className="components-title">ENGLISH COMPONENTS</h2>
        </div>

        <div className="carousel-container">
          <button
            className="carousel-nav-btn"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            aria-label="Previous component"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="carousel-cards-track">
            {componentsList.map((item) => (
              <div key={item.id} className="component-card">
                <div className={`component-icon-badge ${item.badgeClass}`}>
                  {item.iconType ? item.iconType : item.icon}
                </div>
                <h3 className="component-title">{item.title}</h3>
                <p className="component-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <button
            className="carousel-nav-btn"
            onClick={() => setCurrentSlide(Math.min(componentsList.length - 1, currentSlide + 1))}
            aria-label="Next component"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="carousel-dots">
          {componentsList.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bottom-cta-banner">
        <div className="bottom-banner-left">
          <h2 className="banner-title-1">YOU&apos;VE WAITED LONG ENOUGH.</h2>
          <h2 className="banner-title-2">IT&apos;S TIME TO SPEAK.</h2>
          <p className="banner-subtitle">
            Join English with Taha and start your journey to real fluency.
          </p>
        </div>

        <div className="bottom-banner-right">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            id="bottom-whatsapp-cta"
          >
            <WhatsAppIcon size={20} />
            <span>Get My Offer on WhatsApp</span>
          </a>

          <div className="banner-social-proof">
            <div className="avatar-stack">
              <Image
                src="/images/avatar1.jpg"
                alt="Student 1"
                width={30}
                height={30}
                className="avatar-item"
              />
              <Image
                src="/images/avatar2.jpg"
                alt="Student 2"
                width={30}
                height={30}
                className="avatar-item"
              />
              <Image
                src="/images/avatar3.jpg"
                alt="Student 3"
                width={30}
                height={30}
                className="avatar-item"
              />
              <Image
                src="/images/avatar4.jpg"
                alt="Student 4"
                width={30}
                height={30}
                className="avatar-item"
              />
            </div>
            <p className="banner-social-text">
              Join <strong>1500+</strong> students already improving
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal ("Watch how it works") */}
      {isVideoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">How English with Taha Works</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body">
              <div className="video-player-mock">
                <div className="video-play-huge">
                  <Play className="w-7 h-7 fill-white text-white ml-1" />
                </div>
                <h4 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Interactive Video Presentation
                </h4>
                <p style={{ color: "#bfdbfe", maxWidth: "420px", fontSize: "0.875rem" }}>
                  Discover our interactive speaking sessions, customized feedback loops, and how we take you from hesitant to fluent in months.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: "1.25rem" }}>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <WhatsAppIcon size={18} />
                  <span>Start on WhatsApp Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
