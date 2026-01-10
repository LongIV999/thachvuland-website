import React from 'react';
import './ProjectLinking.css';

interface Project {
    id: number;
    title: string;
    image: string;
    location: string;
    price: string;
    status: string;
    link: string;
}

interface ProjectLinkingProps {
    relatedProjectIds: number[];
    allProjects: Project[];
    className?: string;
    onContactClick?: (projectId: number) => void;
}

/**
 * ProjectLinking Component
 *
 * Displays related real estate projects mentioned in a news article.
 * Enables cross-linking between news and project pages for better UX and lead gen.
 *
 * @example
 * <ProjectLinking
 *   relatedProjectIds={[1, 2]}
 *   allProjects={projectData}
 *   onContactClick={(id) => openContactForm(id)}
 * />
 */
export const ProjectLinking: React.FC<ProjectLinkingProps> = ({
    relatedProjectIds,
    allProjects,
    className = '',
    onContactClick
}) => {
    // Filter projects that match the related IDs
    const relatedProjects = allProjects.filter(project =>
        relatedProjectIds.includes(project.id)
    );

    if (relatedProjects.length === 0) {
        return null;
    }

    const handleContactClick = (e: React.MouseEvent, projectId: number) => {
        e.preventDefault();
        if (onContactClick) {
            onContactClick(projectId);
        } else {
            // Default: open Zalo
            window.open('https://zalo.me/0903469888', '_blank');
        }
    };

    return (
        <section className={`mag-project-linking ${className}`}>
            <div className="mag-project-linking__header">
                <i className="fas fa-building mag-project-linking__icon" aria-hidden="true"></i>
                <h3 className="mag-project-linking__title">Dự Án Liên Quan</h3>
            </div>

            <div className="mag-project-linking__grid">
                {relatedProjects.map(project => (
                    <article key={project.id} className="mag-project-link-card">
                        <a href={project.link} className="mag-project-link-card__image-link">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="mag-project-link-card__image"
                                loading="lazy"
                            />
                            <span className="mag-project-link-card__status">{project.status}</span>
                        </a>

                        <div className="mag-project-link-card__content">
                            <a href={project.link}>
                                <h4 className="mag-project-link-card__name">{project.title}</h4>
                            </a>

                            <p className="mag-project-link-card__location">
                                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                                {project.location}
                            </p>

                            <p className="mag-project-link-card__price">
                                {project.price}
                            </p>

                            <button
                                className="mag-project-link-card__cta"
                                onClick={(e) => handleContactClick(e, project.id)}
                            >
                                <i className="fas fa-phone" aria-hidden="true"></i>
                                Nhận Tư Vấn
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

/**
 * ProjectTag Component
 *
 * Compact inline tag for showing related projects within article content.
 *
 * @example
 * <ProjectTag project={projectData[0]} />
 */
interface ProjectTagProps {
    project: Project;
    onClick?: () => void;
}

export const ProjectTag: React.FC<ProjectTagProps> = ({ project, onClick }) => {
    return (
        <a
            href={project.link}
            className="mag-project-tag"
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <i className="fas fa-building" aria-hidden="true"></i>
            <span>{project.title}</span>
        </a>
    );
};

/**
 * ProjectTagList Component
 *
 * Renders a list of project tags for featured articles.
 */
interface ProjectTagListProps {
    projectIds: number[];
    allProjects: Project[];
}

export const ProjectTagList: React.FC<ProjectTagListProps> = ({
    projectIds,
    allProjects
}) => {
    const projects = allProjects.filter(p => projectIds.includes(p.id));

    if (projects.length === 0) return null;

    return (
        <div className="mag-project-tags">
            <span className="mag-project-tags__label">
                <i className="fas fa-link" aria-hidden="true"></i>
                Liên quan:
            </span>
            {projects.map(project => (
                <ProjectTag key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectLinking;
