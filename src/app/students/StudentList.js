import React, {useEffect, useState} from 'react';
import {ItemListPage} from '../commons/ItemListPage/ItemListPage';
import {studentService} from '../../services/services';
import FakeLink from '../commons/FakeLink';
import {CreateStudentAccountModal} from './CreateStudentAccountModal';
import {CreateButton} from '../commons/buttons/CreateButton';
import {ThreeDotsButton} from '../commons/buttons/ThreeDotsButton';
import {DeleteConfirmationModal} from '../commons/modals/ConfirmationModal';

const useStudentList = () => {
  const [students, setStudents] = useState(undefined);
  const addStudent = (student) => students.push(student);
  return {students, addStudent, setStudents};
};

const StudentList = () => {
  const [showCreateStudentAccountModal, setShowCreateStudentAccountModal] = useState(false);
  const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(undefined);
  const {students, addStudent, setStudents} = useStudentList();

  useEffect(() => {
    if (!students) {
      studentService.getStudents({skip: 0, size: 100})
        .then(students => setStudents(students));
    }
  });

  const actionItemsButton = (selectedStudent) =>
    <ThreeDotsButton dropDownItems={[{
      name: 'Delete',
      dangerous: true,
      onClick: () => {
        setSelectedStudent(selectedStudent);
        setShowRemoveStudentModal(true);
      }
    }]}/>;

  const deleteStudent = () => {
    studentService.deleteStudentById(selectedStudent.id)
      .then(() => {
        setStudents(students.filter(s => s !== selectedStudent));
      });
  };

  return (
    <div className="student-list font-poppins">
      <div style={{paddingTop: '20px', paddingBottom: '150px'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ItemListPage title="Student List"
            width="700px"
            filterItems={['Filter', 'Name', 'Email']}
            Button={() =>
              <CreateButton onClick={() => setShowCreateStudentAccountModal(true)}/>}
            tableHeaders={[
              'Name',
              'Email',
              ''
            ]}
            tableRowGenerator={{
              list: students,
              key: (student) => student.id,
              data: (student) => [
                <FakeLink key={student.name}>{student.name}</FakeLink>,
                <FakeLink key={student.email}>{student.email}</FakeLink>,
                actionItemsButton(student)
              ]
            }}
            tableDataStyle={{textAlign: 'left'}}/>

          <CreateStudentAccountModal show={showCreateStudentAccountModal}
            onClose={() => setShowCreateStudentAccountModal(false)}
            onStudentCreated={student => addStudent(student)}/>

          <DeleteConfirmationModal title={'Delete this Student'}
            data={[
              {
                title: 'Name',
                value: selectedStudent?.name
              },
              {
                title: 'Email',
                value: selectedStudent?.email
              }
            ]}
            show={showRemoveStudentModal}
            onClose={() => setShowRemoveStudentModal(false)}
            onSubmit={deleteStudent}/>
        </div>
      </div>
    </div>
  );
};

export {StudentList};
