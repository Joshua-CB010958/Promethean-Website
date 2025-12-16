import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Mobile App Development', href: '#services' },
      { label: 'Web Development', href: '#services' },
      { label: 'Software Solutions', href: '#services' },
      { label: 'AI Integration', href: '#services' },
      { label: 'Business Automation', href: '#services' },
    ],
    company: [
      { label: 'About Us', href: '#why-us' },
      { label: 'Our Process', href: '#process' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Careers', href: '#contact' },
    ],
    resources: [
      { label: 'Case Studies', href: '#portfolio' },
      { label: 'Blog', href: '#contact' },
      { label: 'Documentation', href: '#contact' },
      { label: 'Support', href: '#contact' },
      { label: 'Privacy Policy', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/promethean-ai-uk/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/PrometheanAI_UK', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="footer">
      <div className="container mx-auto">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">Promethean AI</h3>
            <p className="footer-tagline">
              Building intelligent solutions that transform businesses and empower innovation.
            </p>
            
            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-link"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-links-group">
            <div className="footer-column">
              <h4 className="footer-column-title">Services</h4>
              <ul className="footer-links">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <ul className="footer-links">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Resources</h4>
              <ul className="footer-links">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h4 className="footer-column-title">Get in Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={18} />
                <a href="mailto:info@prometheanai.com" className="contact-link">
                  prometheanaiweb@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span className="contact-text">
                  Warwick, United Kingdom
                </span>
              </div>
            </div>
            
            <a href="#contact" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-lg)' }}>
              Contact Us
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Promethean AI. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#contact" className="footer-bottom-link">Terms of Service</a>
            <span className="footer-divider">•</span>
            <a href="#contact" className="footer-bottom-link">Privacy Policy</a>
            <span className="footer-divider">•</span>
            <a href="#contact" className="footer-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-surface-elevated);
          border-top: 1px solid var(--color-border);
          padding: var(--space-4xl) 0 var(--space-xl);
          margin-top: var(--space-5xl);
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 2fr 1fr;
          gap: var(--space-3xl);
          padding: 0 var(--space-xl);
          margin-bottom: var(--space-3xl);
        }

        .footer-brand {
          max-width: 20rem;
        }

        .footer-logo {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: var(--space-md);
        }

        .footer-tagline {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-lg);
          font-size: 0.9rem;
        }

        .footer-social {
          display: flex;
          gap: var(--space-md);
        }

        .social-link {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: var(--gradient-primary);
          border-color: transparent;
          color: white;
          transform: translateY(-2px);
        }

        .footer-links-group {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-2xl);
        }

        .footer-column-title {
          color: var(--color-text-primary);
          margin-bottom: var(--space-lg);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .footer-link {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          transition: color var(--transition-base);
        }

        .footer-link:hover {
          color: var(--color-primary-light);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .contact-link {
          color: var(--color-text-secondary);
          transition: color var(--transition-base);
        }

        .contact-link:hover {
          color: var(--color-primary-light);
        }

        .contact-text {
          color: var(--color-text-secondary);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-xl);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--color-border);
          flex-wrap: wrap;
          gap: var(--space-md);
        }

        .footer-copyright {
          color: var(--color-text-tertiary);
          font-size: 0.875rem;
        }

        .footer-bottom-links {
          display: flex;
          gap: var(--space-md);
          align-items: center;
        }

        .footer-bottom-link {
          color: var(--color-text-tertiary);
          font-size: 0.875rem;
          transition: color var(--transition-base);
        }

        .footer-bottom-link:hover {
          color: var(--color-text-secondary);
        }

        .footer-divider {
          color: var(--color-text-tertiary);
        }

        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }

          .footer-links-group {
            grid-template-columns: repeat(3, 1fr);
          }

          .footer-brand {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .footer-links-group {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
