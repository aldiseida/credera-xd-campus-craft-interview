import './style.css';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const ProfilePosts = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  if (isLoading) {
    return (
      <section id="profile-posts">
        <h2 className="page-heading-2">Pinned Posts</h2>
        <div className="profile-post-results">
          <div className="content-card fade-in">
            <div className="post-author">
              <div className="post-author-avatar loading"></div>
              <div className="post-author-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block skeleton-block--quarter loading"></div>
              </div>
            </div>
            <div className="post-content skeleton-block loading"></div>
          </div>
        </div>
      </section>
    );
  }

  const { pinnedPost } = data; 

  return (
    <section id="profile-posts">
      <h2 className="page-heading-2">Pinned Posts</h2>
      <div className="profile-post-results">
        <div className="content-card">
          <button
            className="post-expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse post" : "Expand post"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "-" : "+"}
          </button>

          <div className="post-author fade-in">
            <div className="post-author-avatar fade-in">
              {pinnedPost.authorFirstName.at(0)}{pinnedPost.authorLastName.at(0)}
            </div>

            <div className="post-author-info fade-in">
              <div className="post-author-row">
                <p className="page-paragraph">
                  {pinnedPost.authorFirstName} {pinnedPost.authorLastName}
                </p>
                <p className = "page-paragraph">{pinnedPost.publishDate.split('T')[0]}</p>
              </div>

              <div className="post-author-row">
                <p className="page-micro">
                  {pinnedPost.jobTitle} @ {pinnedPost.companyName}
                </p>
                <p className = "page-micro">{pinnedPost.city}, {pinnedPost.state}</p>
              </div>
            </div>
          </div>
          {isExpanded && (
            <p className="page-body post-content fade-in">{pinnedPost.post}</p>
          )}
        </div>
      </div>
    </section>
  );
};
