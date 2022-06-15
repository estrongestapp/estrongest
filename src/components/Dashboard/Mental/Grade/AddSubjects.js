import { useState, useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import { Typography, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import Subject from './Subject';
import SubjectAddField from './SubjectAddField';


export default function AddSubjects({ subjects }) {
    const { information, changeInformation } = useContext(InformationContext);
    const [subjectName, setSubjectName] = useState('');
    const [grade, setGrade] = useState('');
    const [error, setError] = useState({});
    const week = moment().utc(true).week();

    function changeStatus() {
        const notas = information.intelectual.notas;
        const newSubjectErrors = {};

        if (grade === '') newSubjectErrors.grade = 'A nota não pode estar vazia';
        if (Number(grade) < 0 || Number(grade) > 10) newSubjectErrors.grade = 'A nota precisa estar entre 0 e 10';

        if (subjectName.length < 3) newSubjectErrors.subject = 'Digite pelo menos 3 letras';

        setError(newSubjectErrors);

        if (Object.keys(newSubjectErrors).length > 0) return;

        notas[week].push({
            materia: subjectName,
            nota: Number(grade),
        });
        setSubjectName('');
        setGrade('');

        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                notas,
            },
        });
    }

    function handleDelete(id) {
        const notas = information.intelectual.notas;
        notas[week].splice(id, 1);

        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                notas,
            },
        });
    }

    function getProgress() {
        const notas = information?.intelectual?.notas || {};
        return `${week}` in notas ? notas[week] : null;
    }

    return (
        <>
            <Typography sx={{ fontSize: 20 }}>
                Em quais matérias?
            </Typography>
            {getProgress().map((test, index) => <Subject key={index} id={index} test={test} handleDelete={handleDelete} />)}
            <SubjectAddField
                subjectName={subjectName}
                setSubjectName={setSubjectName}
                grade={grade}
                setGrade={setGrade}
                error={error}
            />
            <IconButton onClick={changeStatus}>
                <AddCircle
                    size='inherit'
                    sx={{
                        color: '#BF211E',
                        fontSize: 30,
                    }}
                />
            </IconButton>
        </>
    );
}