import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";

function ItemSearch({ searchKeyword, setSearchKeyword }) {
  const [searchData, setSearchData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetch(`https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy`)
        .then((response) => response.json())
        .then((data) => {
          setSearchData(data);
          setShowResults(true);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SearchNav>
      <div className="search-container">
        <BsSearch className="search-icon" color="black" />
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      {/* {suggestions.length > 0 && (
        <div className="searchResults">
          {suggestions.map((item, index) => (
            <div key={index} className="searchResultItem">
              <div className="location">{item.diaDiem}</div>
            </div>
          ))}
        </div>
      )} */}
      {/* {searchData.length > 0 && showResults && (
        <div className="searchResults" ref={searchResultsRef}>
          {searchData.map((item) => (
            <div className="searchResultItem" key={item.id}>
              <div className="icon">
                <GrLocation className="iconLocal" />
              </div>
              <div className="location">{item.diaDiem}</div>
            </div>
          ))}
        </div>
      )} */}
    </SearchNav>
  );
}

export default ItemSearch;

const SearchNav = styled.div`
  display: flex;
  flex-direction: column;
  .search-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 50px;
    padding: 0 10px;
    height: 50px;
  }

  .search-icon {
    margin: 0 10px;
  }

  .search-input {
    border: none;
    padding: 0 8px;
    font-size: 14px;
    outline: none;
    width: 20vw;
    height: 48px;
    border-radius: 50px;
  }

  .searchResults {
    position: absolute;
    width: 340px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    transform: translateX(0px) translateY(55px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    z-index: 1;
  }
  .searchResultItem {
    display: flex;
    align-items: center;
    padding: 10px;
    &:hover {
      background-color: #f1f1f1;
    }
  }
  .icon {
    margin-right: 10px;
  }
  .location {
    font-weight: bold;
  }
  .iconLocal {
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #000;
  }
`;
