import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';
import ITeacher from '../../components/TeacherItem/ITeacher';

import './styles.css';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      setTeachers(response.data);
    } catch (error) {
      alert('Erro na busca.');
    }
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form onSubmit={searchTeachers} id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => {
              setSubject(e.target.value);
            }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Português', label: 'Português' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Química', label: 'Química' },
              { value: 'Física', label: 'Física' },
              { value: 'Religião', label: 'Religião' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={e => {
              setWeek_day(e.target.value);
            }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={e => {
              setTime(e.target.value);
            }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map(teacher => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
