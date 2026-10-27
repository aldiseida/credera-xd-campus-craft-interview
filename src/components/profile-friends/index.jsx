import './style.css';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';

export const ProfileFriends = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendsListData,
  });

  if (isLoading)
    return (
      <section id="profile-friends">
        <div className="content-card fade-in">
          <h2 className="page-heading-2">Friends</h2>
          <ul className="profile-friends-list">
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );

  const { friends } = data;
  const sortedFriends = [...friends].sort((a, b) => {
    if(a.topFriend && !b.topFriend){ return -1; }
    if(!a.topFriend && b.topFriend){ return 1; }

    const lastNameA = a.name.split(' ').at(-1);
    const lastNameB = b.name.split(' ').at(-1);

    return lastNameA.localeCompare(lastNameB);
  });

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <ul className="profile-friends-list">
          {sortedFriends.map((friend, index) => (
            <li className="profile-list-item fade-in" key={index}>
              <div
                className="profile-list-item-avatar"
                aria-label="Stuart Raymond"
              ></div>
              <div className = "profile-list-item-info">
                <div className="profile-list-item-name">
                  <p className="page-paragraph">{friend.name}</p>
                  {friend.topFriend && (
                    <p className="profile-list-top">TOP</p>
                  )}
                </div>
                <p className="page-micro">
                  {friend.jobTitle} @ {friend.companyName}
                </p>
                {/* <pre>{JSON.stringify(friend)}</pre> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
