"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Calendar,
  Users,
  User,
  Play,
  Check,
  GraduationCap,
  PenTool,
  MessageCircle,
  FileSearch,
  X,
  Sparkles,
  Lock,
  Menu,
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
  const [fullName, setFullName] = useState<string>("");
  const [friendFullName, setFriendFullName] = useState<string>("");
  const [friendPhone, setFriendPhone] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [modalFullName, setModalFullName] = useState<string>("");
  const [modalFriendFullName, setModalFriendFullName] = useState<string>("");
  const [modalFriendPhone, setModalFriendPhone] = useState<string>("");
  const [modalCustomMsg, setModalCustomMsg] = useState<string>("");

  const phoneNumber = "212600211281";

  const buildWhatsAppLink = (
    overrideName?: string,
    overrideFriendName?: string,
    overrideFriendPhone?: string,
    overrideMsg?: string
  ) => {
    const f = (overrideName !== undefined ? overrideName : fullName).trim();
    const student1 = f ? f : "Étudiant 1";

    const ff = (overrideFriendName !== undefined ? overrideFriendName : friendFullName).trim();
    const student2 = ff ? ff : "Ami(e) / Étudiant 2";
    const fPhone = (overrideFriendPhone !== undefined ? overrideFriendPhone : friendPhone).trim();

    const note = (overrideMsg !== undefined ? overrideMsg : customMessage).trim();

    let lines: string[] = [];

    if (selectedOption === "friend") {
      lines = [
        `Bonjour Taha ! 👋`,
        ``,
        `Je souhaite nous inscrire à 2 au programme *English with Taha* (Offre Duo : Bac Duo) !`,
        ``,
        `👤 *Étudiant 1 :* ${student1}`,
        `👥 *Étudiant 2 (Ami/e) :* ${student2}`,
        `📞 *Numéro de l'ami(e) :* ${fPhone || "Non renseigné"}`,
        ``,
        `🎯 *Notre objectif :* ${selectedGoal}`,
      ];
    } else {
      lines = [
        `Bonjour Taha ! 👋`,
        ``,
        `Je m'appelle *${student1}*.`,
        `Je souhaite rejoindre votre programme *English with Taha*.`,
        ``,
        `🎯 *Mon objectif :* ${selectedGoal}`,
        `👥 *Formule :* Offre Individuelle (Ghir ana)`,
      ];
    }

    if (note) {
      lines.push(``, `💬 *Message :* ${note}`);
    }

    lines.push(
      ``,
      selectedOption === "friend"
        ? `Pourriez-vous nous transmettre les détails de l'offre Duo et les disponibilités ? Merci !`
        : `Pourriez-vous me transmettre les détails de l'offre et les disponibilités ? Merci !`
    );

    const message = lines.join("\n");
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  };

  const handleOpenWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (selectedOption === "just-me") {
      if (fullName.trim()) {
        window.open(buildWhatsAppLink(fullName, friendFullName, friendPhone, customMessage), "_blank");
      } else {
        setModalFullName(fullName);
        setModalFriendFullName(friendFullName);
        setModalFriendPhone(friendPhone);
        setModalCustomMsg(customMessage);
        setIsWhatsAppModalOpen(true);
      }
    } else {
      if (fullName.trim() && friendFullName.trim()) {
        window.open(buildWhatsAppLink(fullName, friendFullName, friendPhone, customMessage), "_blank");
      } else {
        setModalFullName(fullName);
        setModalFriendFullName(friendFullName);
        setModalFriendPhone(friendPhone);
        setModalCustomMsg(customMessage);
        setIsWhatsAppModalOpen(true);
      }
    }
  };

  const handleConfirmWhatsAppModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFullName.trim()) return;
    setFullName(modalFullName);
    if (selectedOption === "friend") {
      if (modalFriendFullName.trim()) setFriendFullName(modalFriendFullName);
      if (modalFriendPhone.trim()) setFriendPhone(modalFriendPhone);
    }
    if (modalCustomMsg.trim()) setCustomMessage(modalCustomMsg);

    window.open(
      buildWhatsAppLink(
        modalFullName,
        modalFriendFullName,
        modalFriendPhone,
        modalCustomMsg
      ),
      "_blank"
    );
    setIsWhatsAppModalOpen(false);
  };

  const goals = ["Grammar ", "Vocabulary", "Writing", "Kulchi"];

  const componentsList = [
    {
      id: "vocab",
      iconType: "A",
      badgeClass: "badge-blue",
      title: "Vocabulary",
      desc: "Expand your vocabulary and use words confidently.",
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

  const [activeComponentIndex, setActiveComponentIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isPointerDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollStartRef = useRef<number>(0);

  // Smooth scroll to target slide
  const scrollToSlide = (index: number) => {
    setActiveComponentIndex(index);
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.querySelectorAll(".component-card");
    const targetCard = cards[index] as HTMLElement;
    if (targetCard) {
      const scrollLeft =
        targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  };

  // Auto-advance every 10 seconds with smooth animation
  useEffect(() => {
    const timer = setInterval(() => {
      // Don't auto-rotate if the user is actively swiping
      if (isInteractingRef.current) return;

      setActiveComponentIndex((prev) => {
        const next = (prev + 1) % componentsList.length;
        if (carouselRef.current) {
          const container = carouselRef.current;
          const cards = container.querySelectorAll(".component-card");
          const targetCard = cards[next] as HTMLElement;
          if (targetCard) {
            const scrollLeft =
              targetCard.offsetLeft -
              (container.clientWidth - targetCard.clientWidth) / 2;
            container.scrollTo({
              left: Math.max(0, scrollLeft),
              behavior: "smooth",
            });
          }
        }
        return next;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [componentsList.length]);

  // Handle manual scroll / swipe left and right
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.querySelectorAll(".component-card");
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const el = card as HTMLElement;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveComponentIndex(closestIndex);

    // Pause auto-rotation for 5s after manual scroll
    isInteractingRef.current = true;
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 5000);
  };

  // Pointer drag support for smooth dragging on both touch and mouse
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isPointerDownRef.current = true;
    isInteractingRef.current = true;
    startXRef.current = e.clientX;
    scrollStartRef.current = carouselRef.current.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !carouselRef.current) return;
    const dx = e.clientX - startXRef.current;
    carouselRef.current.scrollLeft = scrollStartRef.current - dx;
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 5000);
  };

  return (
    <main className="page-container">
      {/* Top Header */}
      <header className="site-header">
        <div className="header-brand-group">
          <a className="site-brand" href="#program" aria-label="Bac English — Home">
            <Image
              src="/images/image copy.png"
              alt="Bac English — Learn, Practice, Succeed"
              width={558}
              height={252}
              priority
              className="site-brand-logo"
            />
          </a>
          <div className="program-badge">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>2026 / 2027 PROGRAM</span>
          </div>
        </div>
        <button
          className="mobile-menu-btn"
          aria-label="Menu"
          onClick={() => setIsWhatsAppModalOpen(true)}
        >
          <Menu className="w-5 h-5 text-slate-800" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="program">
        {/* Left Column: Headline, Description, CTAs, Social Proof */}
        <div className="hero-left">
          <h1 className="hero-title">
            Bla stress. Bla guess.<br />
            Wjjed English dyal l&apos;Bac for success.
          </h1>

          <p className="hero-subtitle">
            Mn lesson l&apos;exercice, mn exercice l&apos;National.<br />
            Nraja3o, ntderbo, w nwjdo English dyalk!
          </p>

          <div className="cta-group">
            <button
              onClick={handleOpenWhatsApp}
              className="btn-whatsapp"
              id="hero-whatsapp-cta"
            >
              <WhatsAppIcon size={20} />
              <span> 7jez Blastek</span>
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
              <span className="social-desc">Join our community</span>
            </div>
          </div>
        </div>

        {/* Right Column: Instructor Visual, Blue Arch Backdrop, Handwritten Text, Floating Card */}
        <div className="hero-right">
          {/* Royal Blue Arch Backdrop */}
          <div className="hero-backdrop-arch">
            <div className="hero-backdrop-dots"></div>

            {/* Handwritten Script Words on Blue Area */}
            <div className="hero-handwritten-text">
              <span className="handwritten-word">Nail it.</span>
              <span className="handwritten-word">Write it.</span>
              <span className="handwritten-word">Win it.</span>
              <svg
                className="handwritten-arrow"
                width="46"
                height="28"
                viewBox="0 0 46 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M40 3C30 3 15 6 6 18M6 18L14 14M6 18L10 24"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Clean Integrated Cutout Image of Taha */}
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
                <Calendar className="w-5 h-5" />
              </div>
              <div className="reg-card-info">
                <span className="reg-card-season">Bac English 2026 / 2027</span>
                <span className="reg-card-status">Registration Open!</span>
              </div>
            </div>
            <div className="reg-card-divider"></div>
            <div className="reg-card-bottom">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Places Limitées • 7jez Blastek</span>
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
                <p className="chat-bubble-greeting">Salam 👋</p>
                <p className="chat-bubble-question">Chno aktar haja mberztak f English dyal l'Bac?</p>
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
            <h2 className="option-section-title">KIFACH BAGHI TWJED L&apos;BAC?</h2>

            {/* Tab Switcher */}
            <div className="option-tab-switcher">
              <button
                className={`tab-btn ${selectedOption === "just-me" ? "active" : ""}`}
                onClick={() => setSelectedOption("just-me")}
              >
                <User className="w-4 h-4" />
                <span>Bac Solo</span>
              </button>
              <button
                className={`tab-btn ${selectedOption === "friend" ? "active" : ""}`}
                onClick={() => setSelectedOption("friend")}
              >
                <Users className="w-4 h-4" />
                <span>Bac Duo</span>
              </button>
            </div>

            {/* Plan Details & Form */}
            <div className="plan-detail-card">
              {/* Left Column: Offer Info, Price, Perks & Guarantee */}
              <div className="plan-info-col">
                <div className="plan-header-row">
                  <div className="plan-badge-icon">
                    {selectedOption === "just-me" ? (
                      <GraduationCap className="w-5 h-5" />
                    ) : (
                      <Users className="w-5 h-5" />
                    )}
                  </div>
                  <div className="plan-title-wrap">
                    <h3 className="plan-name">
                      {selectedOption === "just-me" ? "Bac Solo" : "Bac Duo"}
                    </h3>
                    <span className="plan-subname">Bac English with Taha</span>
                  </div>
                </div>

               

                <ul className="perks-list">
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Plearn → practise → Bac</span>
                  </li>
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Grammar, Vocabulary & Functions</span>
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
                  <li className="perk-item">
                    <span className="perk-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Ghanbdaw à 0</span>
                  </li>
                </ul>

                <div className="plan-perk-highlight">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Bac 2026 / 2027 • Places limitées</span>
                </div>
              </div>

              {/* Right Column: High-End Registration Form */}
              <div className="plan-form-col">
                {selectedOption === "just-me" ? (
                  <div className="form-inputs-group">
                    <div className="form-col-title">Vos informations</div>
                    <div className="input-row-2col">
                      <div className="input-field-wrap">
                        <label className="input-label">Prénom &amp; Nom</label>
                        <input
                          type="text"
                          className="text-input"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ex: Yassine Alami"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="form-inputs-group duo-inputs-wrapper">
                    {/* Student 1 */}
                    <div className="form-group-block">
                      <div className="form-step-header">
                        <span className="form-step-badge">1</span>
                        <span className="form-step-title">Vos coordonnées (Étudiant 1)</span>
                      </div>
                      <div className="input-row-2col">
                        <div className="input-field-wrap">
                          <label className="input-label">Votre Prénom &amp; Nom</label>
                          <input
                            type="text"
                            className="text-input"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Ex: Yassine Alami"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Student 2 (Friend) */}
                    <div className="form-group-block">
                      <div className="form-step-header">
                        <span className="form-step-badge">2</span>
                        <span className="form-step-title">Coordonnées de votre ami(e) (Étudiant 2)</span>
                      </div>
                      <div className="input-row-2col">
                        <div className="input-field-wrap">
                          <label className="input-label">Prénom &amp; Nom de l&apos;ami(e)</label>
                          <input
                            type="text"
                            className="text-input"
                            value={friendFullName}
                            onChange={(e) => setFriendFullName(e.target.value)}
                            placeholder="Ex: Mehdi Bennani"
                          />
                        </div>
                      </div>

                      <div className="input-field-wrap" style={{ marginTop: "0.5rem" }}>
                        <label className="input-label">Numéro de téléphone de l&apos;ami(e) (WhatsApp)</label>
                        <input
                          type="tel"
                          className="text-input"
                          value={friendPhone}
                          onChange={(e) => {
                            setFriendPhone(e.target.value);
                            setModalFriendPhone(e.target.value);
                          }}
                          placeholder="Ex: 06 12 34 56 78"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="input-field-wrap" style={{ marginTop: "0.45rem" }}>
                  <label className="input-label">Message ou question (optionnel)</label>
                  <input
                    type="text"
                    className="text-input"
                    value={customMessage}
                    onChange={(e) => {
                      setCustomMessage(e.target.value);
                      setModalCustomMsg(e.target.value);
                    }}
                    placeholder="Ex: Vos disponibilités pour ce mois ?"
                  />
                </div>

                {/* WhatsApp Action Button */}
                <button
                  onClick={handleOpenWhatsApp}
                  className="btn-whatsapp btn-form-whatsapp"
                  id="form-whatsapp-cta"
                  style={{ marginTop: "0.65rem" }}
                >
                  <WhatsAppIcon size={19} />
                  <span> 7jez Blastek</span>
                </button>

                <p className="form-guarantee-note">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Réponse directe par Taha sur WhatsApp • Sans engagement</span>
                </p>
              </div>
            </div>

            {/* Trust Badges */}
          </div>
        </div>
      </section>

      {/* English Components Section */}
      <section className="components-section" id="components">
        <div className="components-header">
          <h2 className="components-title">ENGLISH COMPONENTS</h2>
        </div>

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="components-grid"
        >
          {componentsList.map((item, idx) => (
            <div
              key={item.id}
              className={`component-card ${activeComponentIndex === idx ? "is-active-slide" : ""}`}
            >
              <div className={`component-icon-badge ${item.badgeClass}`}>
                {item.iconType ? item.iconType : item.icon}
              </div>
              <h3 className="component-title">{item.title}</h3>
              <p className="component-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots (Mobile Only - No Arrows) */}
        <div className="carousel-dots-row" aria-label="Carousel pagination">
          {componentsList.map((item, idx) => (
            <button
              key={`dot-${item.id}`}
              type="button"
              className={`carousel-dot ${activeComponentIndex === idx ? "active" : ""}`}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Slide ${idx + 1}: ${item.title}`}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bottom-cta-banner">
        <div className="bottom-banner-left">
          <h2 className="banner-title-1">TSENNITI BEZAF DYAL LWE9T.
<br />DABA HOWA LWE9T BACH TBDA THDER.</h2>
          <p className="banner-subtitle">
            M3a English with Taha, Bda parcours dyalk l&apos;it9an lha9i9i
          </p>
        </div>

        <div className="bottom-banner-right">
          <button
            onClick={handleOpenWhatsApp}
            className="btn-whatsapp"
            id="bottom-whatsapp-cta"
          >
            <WhatsAppIcon size={20} />
            <span> 7jez Blastek</span>
          </button>

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
              Join our community
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
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    handleOpenWhatsApp();
                  }}
                  className="btn-whatsapp"
                >
                  <WhatsAppIcon size={18} />
                  <span>Start on WhatsApp Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Lead Capture & Message Automation Modal */}
      {isWhatsAppModalOpen && (
        <div className="modal-overlay" onClick={() => setIsWhatsAppModalOpen(false)}>
          <div
            className="modal-content whatsapp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="whatsapp-modal-title-group">
                <div className="whatsapp-modal-icon-badge">
                  <WhatsAppIcon size={22} />
                </div>
                <div>
                  <h3 className="modal-title">Recevoir mon offre sur WhatsApp</h3>
                  <p className="whatsapp-modal-subtitle">
                    Entrez votre nom pour que le message soit automatiquement personnalisé
                  </p>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsWhatsAppModalOpen(false)}
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmWhatsAppModal} className="whatsapp-modal-form">
              {selectedOption === "just-me" ? (
                <div className="whatsapp-inputs-grid">
                  <div className="input-field-wrap">
                    <label className="input-label">Prénom &amp; Nom *</label>
                    <input
                      type="text"
                      required
                      autoFocus
                      className="text-input"
                      value={modalFullName}
                      onChange={(e) => setModalFullName(e.target.value)}
                      placeholder="Ex: Yassine Alami"
                    />
                  </div>
                </div>
              ) : (
                <div className="whatsapp-duo-fields">
                  <span className="form-section-subtitle">👤 Vos coordonnées (Étudiant 1)</span>
                  <div className="whatsapp-inputs-grid">
                    <div className="input-field-wrap">
                      <label className="input-label">Votre Prénom &amp; Nom *</label>
                      <input
                        type="text"
                        required
                        autoFocus
                        className="text-input"
                        value={modalFullName}
                        onChange={(e) => setModalFullName(e.target.value)}
                        placeholder="Ex: Yassine Alami"
                      />
                    </div>
                  </div>

                  <span className="form-section-subtitle" style={{ marginTop: "0.55rem" }}>
                    👥 Coordonnées de votre ami(e) (Étudiant 2)
                  </span>
                  <div className="whatsapp-inputs-grid">
                    <div className="input-field-wrap">
                      <label className="input-label">Prénom &amp; Nom de l&apos;ami(e) *</label>
                      <input
                        type="text"
                        required
                        className="text-input"
                        value={modalFriendFullName}
                        onChange={(e) => setModalFriendFullName(e.target.value)}
                        placeholder="Ex: Mehdi Bennani"
                      />
                    </div>
                  </div>

                  <div className="input-field-wrap" style={{ marginTop: "0.45rem" }}>
                    <label className="input-label">Numéro de téléphone de l&apos;ami(e) *</label>
                    <input
                      type="tel"
                      required
                      className="text-input"
                      value={modalFriendPhone}
                      onChange={(e) => setModalFriendPhone(e.target.value)}
                      placeholder="Ex: 06 12 34 56 78"
                    />
                  </div>
                </div>
              )}

              <div className="input-field-wrap" style={{ marginTop: "0.55rem" }}>
                <label className="input-label">Message ou question pour Taha (optionnel)</label>
                <textarea
                  rows={2}
                  className="text-input text-textarea"
                  value={modalCustomMsg}
                  onChange={(e) => setModalCustomMsg(e.target.value)}
                  placeholder="Ex: Je suis disponible les soirs de semaine..."
                />
              </div>

              {/* Message Live Preview */}
              <div className="whatsapp-preview-card">
                <div className="whatsapp-preview-header">
                  <span className="whatsapp-preview-tag">Message envoyé à Taha sur WhatsApp</span>
                </div>
                <div className="whatsapp-preview-bubble">
                  {selectedOption === "friend" ? (
                    <p>
                      Bonjour Taha ! 👋<br />
                      Je souhaite nous inscrire à 2 au programme <em>English with Taha</em> (Offre Duo : Ana O Sahbi) !<br /><br />
                      👤 <strong>Étudiant 1 :</strong> {modalFullName.trim() ? modalFullName.trim() : "[Votre Prénom & Nom]"}<br />
                      👥 <strong>Étudiant 2 (Ami/e) :</strong> {modalFriendFullName.trim() ? modalFriendFullName.trim() : "[Prénom & Nom de l'ami(e)]"}<br />
                      📞 <strong>Téléphone ami(e) :</strong> {modalFriendPhone.trim() || "[Numéro de l'ami(e)]"}<br /><br />
                      🎯 <strong>Notre objectif :</strong> {selectedGoal}<br />
                      {modalCustomMsg.trim() && (
                        <>
                          💬 <strong>Message :</strong> {modalCustomMsg.trim()}<br />
                        </>
                      )}
                      <br />
                      Pourriez-vous nous transmettre les détails de l&apos;offre Duo et les disponibilités ? Merci !
                    </p>
                  ) : (
                    <p>
                      Bonjour Taha ! 👋<br />
                      Je m&apos;appelle <strong>{modalFullName.trim() ? modalFullName.trim() : "[Votre Prénom & Nom]"}</strong>.<br />
                      Je souhaite rejoindre le programme <em>English with Taha</em>.<br /><br />
                      🎯 <strong>Mon objectif :</strong> {selectedGoal}<br />
                      👥 <strong>Formule :</strong> Offre Individuelle (Bac Solo)<br />
                      {modalCustomMsg.trim() && (
                        <>
                          💬 <strong>Message :</strong> {modalCustomMsg.trim()}<br />
                        </>
                      )}
                      <br />
                      Pourriez-vous me transmettre les détails de l&apos;offre et les disponibilités ? Merci !
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn-whatsapp whatsapp-submit-btn"
                disabled={
                  selectedOption === "friend"
                    ? !modalFullName.trim() || !modalFriendFullName.trim()
                    : !modalFullName.trim()
                }
              >
                <WhatsAppIcon size={20} />
                <span>Envoyer sur WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
