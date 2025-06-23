import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './ContactForm.css';

// Importando as imagens corretamente
import instagramIcon from '../assets/images/instagram.png';
import emailIcon from '../assets/images/email.png';
import whatsappIcon from '../assets/images/whatsapp.png';

const socialLinks = [
  {
    href: 'https://www.instagram.com/s4tu.r0?igsh=NHVzMjk1cTJyeXlh',
    label: 'Instagram',
    icon: instagramIcon,
  },
  {
    href: 'mailto:peixotosofia145@gmail.com',
    label: 'Email',
    icon: emailIcon,
  },
  {
    href: 'https://wa.me/5521984204822',
    label: 'WhatsApp',
    icon: whatsappIcon,
  },
];

const ContactForm = () => {
  const formRef = useRef();
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, []);

  // Animação de máquina de escrever ao digitar mensagem
  useEffect(() => {
    if (typing && form.message) {
      let i = 0;
      setTyped('');
      const interval = setInterval(() => {
        setTyped(form.message.slice(0, i + 1));
        i++;
        if (i >= form.message.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 18);
      return () => clearInterval(interval);
    }
  }, [form.message, typing]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'message') setTyping(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Mensagem enviada!');
    setForm({ name: '', email: '', message: '' });
    setTyped('');
  };

  return (
    <section className="contact-section">
      <div className="contact-telegram" ref={formRef}>
        <h2>Deixe uma Pista</h2>
        <form className="telegram-form" onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
          <label htmlFor="message">Mensagem</label>
          <textarea id="message" name="message" value={form.message} onChange={handleChange} required />
          <div className="typed-preview">{typed}&nbsp;<span className="type-cursor">|</span></div>
          <button type="submit" className="neon-btn noir-btn">Enviar</button>
        </form>
        <div className="contact-icons">
          {socialLinks.map(s => (
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} key={s.label} className="contact-icon-link">
              <img src={s.icon} alt={s.label} className="contact-icon" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 