import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="container mx-auto">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">Promethean AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions-desktop">
            <MagneticButton href="#contact" className="btn btn-primary">
              Book a Consultation
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="nav-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
              Book a Consultation
            </a>
          </div>
        )}
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: var(--space-lg) 0;
          transition: all var(--transition-base);
        }

        .nav-scrolled {
          background: var(--glass-background);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: var(--shadow-lg);
          padding: var(--space-md) 0;
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-xl);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links-desktop {
          display: none;
          gap: var(--space-xl);
        }

        .nav-link {
          color: var(--color-text-secondary);
          transition: color var(--transition-base);
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--color-text-primary);
        }

        .nav-actions-desktop {
          display: none;
        }

        .nav-mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--color-text-primary);
          cursor: pointer;
          padding: var(--space-xs);
        }

        .nav-mobile-menu {
          display: flex;
          flex-direction: column;
          padding: var(--space-xl);
          background: var(--color-surface-elevated);
          border-top: 1px solid var(--color-border);
          margin-top: var(--space-md);
        }

        .nav-mobile-link {
          padding: var(--space-md) 0;
          color: var(--color-text-secondary);
          border-bottom: 1px solid var(--color-border);
          transition: color var(--transition-base);
        }

        .nav-mobile-link:hover {
          color: var(--color-text-primary);
        }

        @media (min-width: 768px) {
          .nav-links-desktop,
          .nav-actions-desktop {
            display: flex;
          }

          .nav-mobile-toggle {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}