import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchCompanyAction } from "../../store/search/actions";
import { selectCompanies } from "../../store/search/slice";

import type { Company } from "../..//store/search/types";

import './styles.css';

const Search = () => {
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);
  const [searchKey, setSearchKey] = useState("");

  const onClickSearch = () => {
    dispatch(searchCompanyAction({ searchKey }));
  };

  const renderSearchResult = (company: Company) => {
    return (
      <tr>
        <td>{company.name}</td>
        <td>{company.domain}</td>
        <td><img alt={company.name} src={company.logo} /></td>
      </tr>
    );
  };

  return (
    <>
      <>
        <input
          autoComplete="off"
          name="searchKey"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          type="text"
          value={searchKey}
        />
        <ul id="huge_list"></ul>
        <button onClick={onClickSearch}>Search</button>
      </>
      <table id="companies">
        <thead>
          <tr>
            <th>Name</th>
            <th>Domain</th>
            <th>Logo</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(renderSearchResult)}
        </tbody>
      </table>
    </>
  );
};

export default Search;
