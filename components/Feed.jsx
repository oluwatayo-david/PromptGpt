"use client";

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'; // Make sure to import the skeleton's CSS
import PromptCard from "@/components/PromptCard";

const PromptCardSkeleton = () => {
  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center justify-start flex-1 gap-3">
          <Skeleton circle height={40} width={40} />
          <div className="flex flex-col">
            <Skeleton width={120} height={20} />
            <Skeleton width={180} height={15} />
          </div>
        </div>
        <Skeleton width={12} height={12} />
      </div>

      <Skeleton count={2} style={{ marginTop: '16px', marginBottom: '16px' }} />
      <Skeleton width={60} height={20} />
    </div>
  );
};

const PromptCardList = ({ data, isLoading, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {isLoading
        ? [...Array(5)].map((_, index) => <PromptCardSkeleton key={index} />)
        : data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // Search states
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="outline-none search_input peer focus:shadow-red-200/50 caret-pink-500"
        />
      </form>

      {searchedResults.length > 0 ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          isLoading={isLoading}
        />
      ) : (
        /* All Prompts */
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} isLoading={isLoading} />
      )}
    </section>
  );
};

export default Feed;
