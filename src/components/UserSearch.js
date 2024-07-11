import { useState, useEffect, useCallback } from "react";
import MessageAvatar from "./MessageAvatar";
import { useSelector } from "react-redux";
import { selectTheme } from "@/slices/globalSettingsSlice";

const UserSearch = ({ joinPrivateRoom }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const theme = useSelector(selectTheme);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 2000); // 500ms debounce time

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const searchUsers = async () => {
      if (debouncedQuery.length > 0) {
        const res = await fetch(`/api/users/search?query=${debouncedQuery}`);
        const data = await res.json();
        setResults(data);
      } else {
        setResults([]);
      }
    };
    searchUsers();
  }, [debouncedQuery]);

  const handleSelectUser = (user) => {
    // create a private room
    joinPrivateRoom(user);

    setQuery("");
    setResults([]);
  };

  return (
    <div className="list-padding">
      <input
        type="text"
        className={`search-bar${theme}`}
        placeholder="Search users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length !== 0 && (
        <ul className="search-results">
          {results.map((user) => (
            <li
              className={`search-result${theme}`}
              key={user.id}
              onClick={() => handleSelectUser(user)}
            >
              <MessageAvatar image_src={user.avatar} />
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;
