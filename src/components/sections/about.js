import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import { useI18n } from '@context/AppContext';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);
    isolation: isolate;

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      display: block;
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
      pointer-events: none;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
      will-change: transform;
    }

    /* In light theme, skip the grayscale→color duotone. Show the photo in full
       color by default and fade it on hover to reveal the green accent. */
    html[data-theme='light'] & {
      background-color: var(--green);

      &:before {
        display: none;
      }

      .img {
        mix-blend-mode: normal;
        filter: none;
        opacity: 0.75;
      }

      &:hover .img,
      &:focus .img {
        opacity: 1;
        filter: none;
        mix-blend-mode: normal;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { lang, t } = useI18n();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'TypeScript / Node.js (NestJS)',
    'Java',
    'Python',
    'AWS & Docker',
    'PostgreSQL, Redis & Neo4j',
    'React & Next.js',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">{t('about.heading')}</h2>

      <div className="inner">
        <StyledText>
          <div>
            {lang === 'fr' ? (
              <>
                <p>
                  Bonjour ! Je m’appelle Quang — mais vous pouvez m’appeler Quentin. Je suis un
                  ingénieur logiciel originaire du Vietnam qui aime concevoir et construire des
                  systèmes fiables et à grande échelle. J’ai obtenu ma licence en informatique à{' '}
                  <a href="https://www.sorbonne-universite.fr/">Sorbonne Université</a> (major de
                  promotion) et je termine actuellement mon Master en ingénierie logicielle à{' '}
                  <a href="https://www.efrei.fr/">l’EFREI Paris</a>.
                </p>

                <p>
                  Au cours des trois dernières années, j’ai eu la chance de travailler en alternance
                  pour de grands groupes français comme{' '}
                  <a href="https://group.bnpparibas/">BNP Paribas</a> et{' '}
                  <a href="https://www.bouyguestelecom.fr/">Bouygues Telecom</a>. Chez Bouygues, je
                  participe à la construction d’une plateforme de supervision et de visualisation du
                  réseau télécom — en gérant le frontend, le backend, les bases de données et le
                  déploiement sur AWS. Je suis particulièrement fier d’avoir proposé et architecturé
                  une nouvelle fonctionnalité d’IA, inspirée de mon mémoire de fin d’études, que mon
                  équipe intègre désormais en production.
                </p>

                <p>
                  Je recherche actuellement un poste en CDI à partir de septembre. Je parle
                  couramment le français, l’anglais et le vietnamien. Voici quelques technologies
                  avec lesquelles j’ai travaillé récemment :
                </p>
              </>
            ) : (
              <>
                <p>
                  Hello! I’m Quang — but you can call me Quentin. I’m a software engineer from
                  Vietnam who enjoys designing and building high-scale, reliable systems. I earned
                  my Bachelor’s in Computer Science at{' '}
                  <a href="https://www.sorbonne-universite.fr/">Sorbonne University</a> (graduating
                  as valedictorian) and I’m currently finishing my Master’s in Software Engineering
                  at <a href="https://www.efrei.fr/">EFREI Paris</a>.
                </p>

                <p>
                  Over the past three years, I’ve had the privilege of working as an apprentice for
                  major French groups like <a href="https://group.bnpparibas/">BNP Paribas</a> and{' '}
                  <a href="https://www.bouyguestelecom.fr/">Bouygues Telecom</a>. At Bouygues, I
                  help build a monitoring &amp; visualization platform for the telecom network —
                  owning the frontend, backend, databases, and the deployment on AWS. I’m especially
                  proud that I proposed and architected a new AI feature, inspired by my master’s
                  thesis, that my team is now integrating into production.
                </p>

                <p>
                  I’m currently looking for a full-time role (CDI) starting in September. I speak
                  French, English, and Vietnamese fluently. Here are a few technologies I’ve been
                  working with recently:
                </p>
              </>
            )}
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
