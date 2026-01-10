import React from 'react';
import './AISummaryBox.css';

interface AISummaryBoxProps {
    summaryPoints: string[];
    className?: string;
}

/**
 * AISummaryBox Component
 *
 * Displays AI-generated summary bullet points for a news article.
 * Magazine Premium style with gold accent.
 *
 * @example
 * <AISummaryBox
 *   summaryPoints={[
 *     "Giá căn hộ Bình Dương tăng 7-10% năm 2024",
 *     "Dự báo tăng thêm 10-20% trong 2025",
 *     "Lợi suất thuê đạt 4.7%"
 *   ]}
 * />
 */
export const AISummaryBox: React.FC<AISummaryBoxProps> = ({
    summaryPoints,
    className = ''
}) => {
    if (!summaryPoints || summaryPoints.length === 0) {
        return null;
    }

    return (
        <div className={`mag-ai-summary ${className}`}>
            <div className="mag-ai-summary__header">
                <div className="mag-ai-summary__icon">
                    <i className="fas fa-robot" aria-hidden="true"></i>
                </div>
                <span className="mag-ai-summary__title">Tóm Tắt Nhanh</span>
                <span className="mag-ai-summary__badge">AI</span>
            </div>

            <ul className="mag-ai-summary__list">
                {summaryPoints.map((point, index) => (
                    <li key={index} className="mag-ai-summary__item">
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AISummaryBox;
