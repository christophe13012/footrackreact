import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme
import {getAllClubs, getAllLeagues, getPlayers} from '../api';
import Navbar from './Navbar';
import futImage from '../fut.png';
import {useNavigate} from "react-router-dom"; // Adjust the path as necessary

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const leaguesList = await getAllLeagues();
            setLeagues(leaguesList);
        } catch (error) {
            console.error('Error fetching players data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlayer(null);
    }

    const columnDefs = [
        { field: 'name', sortable: true, filter: true },
        { field: 'country', sortable: true, filter: true },
        { field: 'continent', sortable: true, filter: true },
        // Updated fields with formatting
        {
            field: 'avgMarketValue',
            headerName: 'Average Market Value',
            sortable: true,
            filter: true,
            // Adding cell renderer for formatting
            cellRenderer: (params) => {
                const averageMarketValue = Math.round(params.value || 0);
                return new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }).format(averageMarketValue);
            }
        },
        {
            field: 'avgStadiumSeats',
            headerName: 'Average Stadium Seats',
            sortable: true,
            filter: true,
            // Adding cell renderer for rounding
            cellRenderer: (params) => Math.round(params.value || 0).toLocaleString()
        },
        { field: 'totalClubs', headerName: 'Total Clubs', sortable: true, filter: true },
        { field: 'totalPlayers', headerName: 'Total Players', sortable: true, filter: true },
    ];


    const handleRowClick = (event) => {
        navigate(`/league/${event.data.id}`, { state: { league: event.data } });
    };

    const filter = (player) => {
        const normalizeString = (str) =>
            str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

        const searchNormalized = normalizeString(searchTerm);
        return (
            normalizeString(player.name).includes(searchNormalized) ||
            normalizeString(player.country).includes(searchNormalized) ||
            normalizeString(player.continent).includes(searchNormalized)
        );
    };

    const filtered = leagues.filter(filter);

    return (
        <div className="container mt-5">
            <Navbar/>
            <div className="row mb-3 justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="ag-theme-alpine" style={{height: 600, width: '100%', marginTop: '20px'}}>
                {isLoading ? (
                    <div className="text-center">
                        <span className="spinner-custom" role="status">⚽</span>
                    </div>

                ) : (
                    <AgGridReact
                        rowData={filtered}
                        columnDefs={columnDefs}
                        domLayout='autoHeight'
                        pagination={true}
                        paginationPageSize={10}
                        onRowClicked={handleRowClick} // Add this line
                    ></AgGridReact>
                )}
            </div>
        </div>
    );
};

export default Leagues;
