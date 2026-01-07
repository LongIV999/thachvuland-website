/**
 * NewsCard Component
 * Inspired by cafef.vn's real estate news article card design
 * Features: Image, title, summary, metadata
 */

import React from 'react';
import './NewsCard.css';

interface NewsCardProps {
  image: string;
  title: string;
  summary?: string;
  category?: string;
  date?: string;
  href: string;
  variant?: 'featured' | 'standard' | 'compact';
}

export const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  summary,
  category,
  date,
  href,
  variant = 'standard'
}) => {
  return (
    <article className={`news-card news-card--${variant}`}>
      <a href={href} className="news-card__link">
        <div className="news-card__image-wrapper">
          <img
            src={image}
            alt={title}
            className="news-card__image"
            loading="lazy"
          />
          {category && (
            <span className="news-card__category">{category}</span>
          )}
        </div>

        <div className="news-card__content">
          <h3 className="news-card__title">{title}</h3>

          {summary && variant !== 'compact' && (
            <p className="news-card__summary">{summary}</p>
          )}

          {date && (
            <time className="news-card__date">{date}</time>
          )}
        </div>
      </a>
    </article>
  );
};

export default NewsCard;
