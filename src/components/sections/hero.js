import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { useI18n } from '@context/AppContext';
import { usePrefersReducedMotion } from '@hooks';

// Rotating taglines, matching the skills in the CV.
const TAGLINES = {
  en: [
    'I build scalable systems for the web.',
    'I design scalable cloud systems.',
    'I engineer fault-tolerant distributed systems.',
    'I build AI-powered GraphRAG pipelines.',
    'I craft high-performance full-stack apps.',
  ],
  fr: [
    'Je conçois des systèmes web scalables.',
    'Je conçois des systèmes cloud scalables.',
    'Je conçois des systèmes distribués résilients.',
    'Je développe des pipelines d’IA GraphRAG.',
    'Je crée des applications full-stack performantes.',
  ],
};

const TAGLINE_INTERVAL = 3200;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  .rotating-tagline {
    position: relative;
    min-height: 1.1em;

    @media (max-width: 480px) {
      min-height: 2.2em;
    }

    .tagline-phrase {
      display: inline-block;
      will-change: opacity, transform, filter;
    }

    @media (prefers-reduced-motion: no-preference) {
      .tagline-enter {
        opacity: 0;
        transform: translateY(40px);
        filter: blur(10px);
      }
      .tagline-enter-active {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
        transition: opacity 550ms var(--easing), transform 550ms var(--easing),
          filter 550ms var(--easing);
      }
      .tagline-exit {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
      }
      .tagline-exit-active {
        opacity: 0;
        transform: translateY(-40px);
        filter: blur(10px);
        transition: opacity 550ms var(--easing), transform 550ms var(--easing),
          filter 550ms var(--easing);
      }
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    color: var(--slate);
    transition: color 0.3s var(--easing);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const RotatingTagline = () => {
  const { lang } = useI18n();
  const prefersReducedMotion = usePrefersReducedMotion();
  const phrases = TAGLINES[lang] || TAGLINES.en;
  const [index, setIndex] = useState(0);

  // Restart from the first phrase whenever the language changes.
  useEffect(() => {
    setIndex(0);
  }, [lang]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % phrases.length);
    }, TAGLINE_INTERVAL);

    return () => clearInterval(id);
  }, [phrases.length, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <h3 className="big-heading">{phrases[0]}</h3>;
  }

  return (
    <h3 className="big-heading rotating-tagline">
      <TransitionGroup component={null}>
        <CSSTransition key={index} timeout={550} classNames="tagline">
          <span className="tagline-phrase">{phrases[index]}</span>
        </CSSTransition>
      </TransitionGroup>
    </h3>
  );
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { lang, t } = useI18n();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>{t('hero.greeting')}</h1>;
  const two = <h2 className="big-heading">Quang Hoang.</h2>;
  const three = <RotatingTagline />;
  const four = (
    <>
      {lang === 'fr' ? (
        <p>
          Je suis un ingénieur logiciel originaire du Vietnam (appelez-moi Quentin), spécialisé dans
          la conception de backends robustes et d’applications full-stack à grande échelle.
          Actuellement, je développe des plateformes de supervision et de visualisation réseau en
          tant qu’ingénieur logiciel en alternance chez{' '}
          <a href="https://www.bouyguestelecom.fr/" target="_blank" rel="noreferrer">
            Bouygues Telecom
          </a>
          .
        </p>
      ) : (
        <p>
          I’m a software engineer from Vietnam (you can call me Quentin) specializing in building
          robust, high-scale backends and full-stack applications. Currently, I’m building network
          monitoring &amp; visualization platforms as a Software Engineer Apprentice at{' '}
          <a href="https://www.bouyguestelecom.fr/" target="_blank" rel="noreferrer">
            Bouygues Telecom
          </a>
          .
        </p>
      )}
    </>
  );
  const five = (
    <a className="email-link" href="https://github.com/Quanghng" target="_blank" rel="noreferrer">
      {t('hero.cta')}
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
