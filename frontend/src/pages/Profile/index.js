import React, {useEffect, useState} from 'react';

import logoImg from '../../assets/logo.svg';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    //useEffect monitora alterações de estado. Executa sempre que a página é recarregada.
    useEffect(()=>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]) // qualquer altração em ongID dispara useEffect()

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }

            });

            setIncidents(incidents.filter(inc=>inc.id !== id));

        } catch (err){
            alert('Error ao deletar caso, tente novamente!');

        }        
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');

    }
    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}!</span>
                <Link className = "button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
              {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso: </strong>
                        <p>{incident.title}</p>

                        <strong>Descrição: </strong>
                        <p>{incident.description}</p>

                        <strong>Valor: </strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency : 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type = "button">
                            <FiTrash2 size = {20} color="#a8a8b3"/>
                        </button>
                    </li>
              ))}
            </ul>
        </div>
    );
}