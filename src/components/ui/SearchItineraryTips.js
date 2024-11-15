import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";

function SearchItineraryTips({ searchKeyword, setSearchKeyword, isTest }) {
  return (
    <div>
      {isTest ? (
        <SearchNav>
          <div className="search-container">
            <BsSearch className="search-icon" color="black" />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm..."
            />
          </div>
        </SearchNav>
      ) : (
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
        </SearchNav>
      )}
    </div>
  );
}

export default SearchItineraryTips;

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
