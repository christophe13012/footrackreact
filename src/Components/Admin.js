import React, { useState } from "react";
import { searchPlayers, searchLeagues, searchClubs } from "../api";
import Navbar from "./Navbar";
import PlayerTable from "./PlayerTable";
import ClubTable from "./ClubTable";
import LeagueTable from "./LeagueTable";

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleModal = (section) => {
    setSectionName(section);
    setModalTitle(`Search & add a ${section}`);
    setShowModal(true);
  };

  const handleSearch = async (type) => {
    try {
      console.log("type", type);
      let results = [];
      if (type === "player") {
        results = await searchPlayers(searchTerm);
      } else if (type === "league") {
        results = await searchLeagues(searchTerm);
      } else if (type === "club") {
        results = await searchClubs(searchTerm);
      }
      console.log("RESULTS", results);
      setSearchResults(results.results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleCloseModal = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowModal(false);
  };

  const addItem = (type, item) => {
    console.log(`Adding ${type}:`, item);
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="section-container p-4 rounded bg-light">
              <div className="d-flex justify-content-between mb-3">
                <h2>League</h2>
                <button
                  onClick={() => handleModal("League")}
                  className="btn btn-primary"
                >
                  Search & add
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>League 1</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>League 2</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>League 3</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>League 4</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="section-container p-4 rounded bg-light">
              <div className="d-flex justify-content-between mb-3">
                <h2>Club</h2>
                <button
                  onClick={() => handleModal("Club")}
                  className="btn btn-primary"
                >
                  Search & add
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Club 1</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Club 2</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Club 3</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Club 4</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="section-container p-4 rounded bg-light">
              <div className="d-flex justify-content-between mb-3">
                <h2>Players</h2>
                <button
                  onClick={() => handleModal("Player")}
                  className="btn btn-primary"
                >
                  Search & add
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Player 1</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Player 2</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Player 3</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Player 4</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showModal && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{modalTitle}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search term"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleSearch(sectionName.toLowerCase())}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  {sectionName.toLowerCase() === "player" ? (
                    <PlayerTable
                      searchResults={searchResults}
                      addItem={addItem}
                      sectionName={sectionName}
                    />
                  ) : sectionName.toLowerCase() === "club" ? (
                    <ClubTable
                      searchResults={searchResults}
                      addItem={addItem}
                      sectionName={sectionName}
                    />
                  ) : (
                    <LeagueTable
                      searchResults={searchResults}
                      addItem={addItem}
                      sectionName={sectionName}
                    />
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
