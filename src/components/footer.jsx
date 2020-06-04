import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='d-flex justify-content-between align-items-center px-3'>
      <div className='footer-left'>
        <span className='footer-disclaimer'>
          This website was created for educational purposes only
        </span>
      </div>
      <div className='footer-right d-flex align-items-baseline'>
        <span className='footer-text mr-2'>Developer: Fabio Carrella</span>
        <a
          href='https://www.linkedin.com/in/fabio-carrella'
          target='_blank'
          rel='noopener noreferrer'
          className='mr-2'
        >
          <FaLinkedin></FaLinkedin>
        </a>
        <a
          href='https://github.com/ThomYorke7'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub></FaGithub>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
