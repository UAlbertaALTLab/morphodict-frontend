/*
Name          : SearchSection
Inputs        : Props () 
              
  queryString : The current search word typed by the user.    
               
Goal          : Display a list of words that best match the queryString. 
              
*/

import SearchSection from "./SearchSection";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";

import { useQuery } from "react-query";
import { useEffect, useState } from "react";

import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function replaceSpecials(query) {
  let result = query.replace(/%C3%A2/g, 'â')
  result = result.replace(/%C3%AE/g, 'î')
  result = result.replace(/%C3%AA/g, 'ê')
  result = result.replace(/%C3%B4/g, 'ô')
  return result
}

function SearchResult(props) {
  const apiUrl = process.env.REACT_APP_BACKEND
  const data = props.location.state.data;
  const error = props.location.state.error;
  const isFetching = props.location.state.isFetching;

  let results = data;

  let filterFunc = (d) => { return d; };
  let settings = JSON.parse(window.localStorage.getItem("settings"));
  if (settings.md_source === true) {
    filterFunc = (d) => {
      d.definitions = d.definitions.filter((def) => {
        if (def.source_ids.find(item => {
          return item === "MD"
        })) {
          return def;
        }
      });
      for (let def of d.definitions) {
        if (def) {
          return d;
        }
      }
    }
  }
  if (settings.cw_source === true) {
    filterFunc = (d) => {
      d.definitions = d.definitions.filter((def) => {
        if (def.source_ids.find(item => {
          return item === "CW"
        })) {
          return def;
        }
      });
      for (let def of d.definitions) {
        if (def) {
          return d;
        }
      }
    }
  }
  if (settings.aecd_source === true) {
    filterFunc = (d) => {
      d.definitions = d.definitions.filter((def) => {
        if (def.source_ids.find(item => {
          return item === "AECD"
        })) {
          return def;
        }
      });
      for (let def of d.definitions) {
        if (def) {
          return d;
        }
      }
    }
  }

  let _type = props.location.state.type;
  if (_type === "Latn" && process.env.REACT_APP_ISO_CODE === "cwd") {
    _type = "Latn-x-macron"
  }

  while (isFetching) {
        const override: CSSProperties = {
              display: "block",
              margin: "0 auto",
            };
        return <ClipLoader
        color={"red"}
        loading={isFetching}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-cy="spinner"
      />
    }

  if (error){
    console.log("error: ", error)
  }

  return (
    <div className="container">
      {typeof results === "undefined" && !isFetching && (        
        <>
          <Alert variant="danger" className="justify-content-center">
            <Alert.Heading>
              Failed to Alert Server: Please Contact SYS Admin
            </Alert.Heading>
          </Alert>
        </>
      )}

      {/* What happens if we get no results from search intergration on sp3*/}
      {error && 1 === 1 && (
        <>
          <Alert variant="danger" className="justify-content-center">
            <Alert.Heading>SYSTEM CRTICAL ERROR: CALL SYS ADMIN</Alert.Heading>
          </Alert>
        </>
      )}

      {/* What happens if we get no results from search intergration on sp3*/}
      {!isFetching && data !== null && results.length === 0 && (
        <>
          <Alert variant="danger">
            <Alert.Heading>
              No results found for {replaceSpecials(props.location.state.queryString)}
            </Alert.Heading>
          </Alert>
        </>
      )}
      

      <div className="container" data-cy="all-search-results">
        {/* what happens if we get a result from the the db call*/}
        {!isFetching &&
          !error &&
          data !== null &&
          data !== "empty" &&
          results.filter(filterFunc).map((result, word_index) => (
            <SearchSection
              key={word_index}
              display={result}
              index={word_index}
              type={_type}
              infoSoundButtons={true}
            ></SearchSection>
          ))}
      </div>
    </div>
  );
}
export default SearchResult;