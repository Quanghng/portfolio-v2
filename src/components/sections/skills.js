import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import { useI18n } from '@context/AppContext';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledSkillsSection = styled.section`
  max-width: 900px;

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px 50px;
    margin-top: 50px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledSkillCategory = styled.div`
  .category-title {
    margin: 0 0 15px;
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
  }

  ul.skills-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 10px 10px 0;
      padding: 8px 14px;
      border-radius: var(--border-radius);
      background-color: var(--light-navy);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      line-height: 1;
      transition: var(--transition);

      &:hover,
      &:focus {
        color: var(--white);
        background-color: var(--lightest-navy);
        transform: translateY(-3px);
      }
    }
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useI18n();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillCategories = [
    {
      title: t('skills.cat.languages'),
      skills: ['TypeScript', 'Node.js (NestJS, Express)', 'Python', 'Java', 'Go', 'C#', 'SQL'],
    },
    {
      title: t('skills.cat.dataCloud'),
      skills: [
        'AWS',
        'Kubernetes',
        'Docker',
        'Terraform',
        'Kafka',
        'RabbitMQ',
        'GraphQL',
        'REST APIs',
      ],
    },
    {
      title: t('skills.cat.databases'),
      skills: [
        'PostgreSQL',
        'Redis',
        'MongoDB',
        'ElasticSearch',
        'JanusGraph',
        'Neo4j',
        'ScyllaDB',
      ],
    },
    {
      title: t('skills.cat.ai'),
      skills: [
        'LangGraph',
        'LangChain',
        'GraphRAG',
        'LLM Evaluation (RAGAS)',
        'LangFuse',
        'MLflow',
      ],
    },
    {
      title: t('skills.cat.frontend'),
      skills: ['React', 'Next.js', 'Angular', 'Tailwind CSS'],
    },
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">{t('skills.heading')}</h2>

      <div className="skills-grid">
        {skillCategories &&
          skillCategories.map(({ title, skills }, i) => (
            <StyledSkillCategory key={i}>
              <h3 className="category-title">{title}</h3>
              <ul className="skills-list">
                {skills.map((skill, j) => (
                  <li key={j}>{skill}</li>
                ))}
              </ul>
            </StyledSkillCategory>
          ))}
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
