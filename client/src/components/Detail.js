import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getDataById } from '../services/data.service';
import { useNavigate } from 'react-router-dom';

function Detail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [fileName, setFileName] = useState('');
    const [path, setPath] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [contentId, setContentId] = useState('');
    const [content, setContent] = useState([]);

    useEffect(() => {
        getDataById(id)
            .then(d => setFileInfo(d))
            .catch(err => console.log(err));
    });

    const setFileInfo = (data) => {
        setFileName(data.fileName);
        setPath(data.path);
        setCreatedBy(data.createdBy);
        setCreatedDate(data.createdDate);
        setContentId(data._id);
        setContent(data.contents);
    }

    const backClick = () => {
        navigate('/');
    }

    return (
        <div>
            <br />
            <h3>Basic Info</h3>
            <table>
                <tr>
                    <td>Id</td>
                    <td>{contentId}</td>
                </tr>
                <tr>
                    <td>File</td>
                    <td>{fileName}</td>
                </tr>
                <tr>
                    <td>Path</td>
                    <td>{path}</td>
                </tr>
                <tr>
                    <td>Created By</td>
                    <td>{createdBy}</td>
                </tr>
                <tr>
                    <td>Created Date</td>
                    <td>{createdDate}</td>
                </tr>
            </table>
            <br />
            <h3>Content</h3>
            <ul>{content.map(item => <li>{item}</li>)}</ul>
            <br />
            &nbsp; <Button variant='contained' onClick={backClick}>Back</Button>
        </div>
    )
}

export default Detail