import { useState } from 'react'
import './App.css'

interface Student {
  id: number;
  name: string;
  grade: number;
  subjects: string[];
}

function App() {
  // 使用 useState 來管理學生陣列
  // 注意：這裡的 students 是一個陣列，陣列中的每個元素都是一個物件
  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: '張小明', 
      grade: 90,
      subjects: ['數學', '物理', '化學']
    },
    { 
      id: 2, 
      name: '李小花', 
      grade: 85,
      subjects: ['國文', '英文', '歷史']
    }
  ]);

  // 控制是否使用錯誤的實現方式
  const [useIncorrectImplementation, setUseIncorrectImplementation] = useState({
    add: false,
    updateGrade: false,
    updateSubjects: false,
    delete: false
  });

  // 新增學生
  const addStudent = () => {
    if (useIncorrectImplementation.add) {
      // 錯誤示範 1：直接修改原陣列
      students.push({
        id: Date.now(),
        name: '新學生',
        grade: 0,
        subjects: []
      });
      setStudents(students); // 這樣不會觸發重新渲染
    } else {
      // 正確示範：創建全新的陣列和物件
      setStudents([
        ...students,
        {
          id: Date.now(),
          name: '新學生',
          grade: 0,
          subjects: []
        }
      ]);
    }
  };

  // 更新學生成績
  const updateGrade = (id: number, newGrade: number) => {
    if (useIncorrectImplementation.updateGrade) {
      // 錯誤示範：直接修改陣列中的物件
      const student = students.find(student => student.id === id);
      if (student) {
        student.grade = newGrade;
      }
      setStudents(students); // 這樣不會觸發重新渲染
    } else {
      // 正確示範：創建新陣列和新物件
      setStudents(students.map(student => 
        student.id === id 
          ? { ...student, grade: newGrade }
          : student
      ));
    }
  };

  // 更新學生的科目
  const updateSubjects = (id: number, newSubject: string) => {
    if (useIncorrectImplementation.updateSubjects) {
      // 錯誤示範：直接修改陣列中的物件的陣列屬性
      const student = students.find(student => student.id === id);
      if (student) {
        student.subjects.push(newSubject);
      }
      setStudents(students); // 這樣不會觸發重新渲染
    } else {
      // 正確示範：創建新陣列、新物件和新陣列屬性
      setStudents(students.map(student => 
        student.id === id 
          ? { 
              ...student, 
              subjects: [...student.subjects, newSubject]
            }
          : student
      ));
    }
  };

  // 刪除學生
  const deleteStudent = (id: number) => {
    if (useIncorrectImplementation.delete) {
      // 錯誤示範：使用 splice 直接修改原陣列
      const index = students.findIndex(student => student.id === id);
      if (index !== -1) {
        students.splice(index, 1);
      }
      setStudents(students); // 這樣不會觸發重新渲染
    } else {
      // 正確示範：使用 filter 創建新陣列
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // 切換實現方式
  const toggleImplementation = (type: keyof typeof useIncorrectImplementation) => {
    setUseIncorrectImplementation(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // 格式化狀態顯示
  const formatState = () => {
    return JSON.stringify(students, null, 2);
  };

  return (
    <div className="App">
      <div className="main-content">
        <h1>學生名單管理系統</h1>
        
        <div className="implementation-controls">
          <h2>實現方式控制</h2>
          <div className="toggle-buttons">
            <button 
              className={`toggle-button ${useIncorrectImplementation.add ? 'active' : ''}`}
              onClick={() => toggleImplementation('add')}
            >
              新增學生: {useIncorrectImplementation.add ? '錯誤' : '正確'}實現
            </button>
            <button 
              className={`toggle-button ${useIncorrectImplementation.updateGrade ? 'active' : ''}`}
              onClick={() => toggleImplementation('updateGrade')}
            >
              更新成績: {useIncorrectImplementation.updateGrade ? '錯誤' : '正確'}實現
            </button>
            <button 
              className={`toggle-button ${useIncorrectImplementation.updateSubjects ? 'active' : ''}`}
              onClick={() => toggleImplementation('updateSubjects')}
            >
              更新科目: {useIncorrectImplementation.updateSubjects ? '錯誤' : '正確'}實現
            </button>
            <button 
              className={`toggle-button ${useIncorrectImplementation.delete ? 'active' : ''}`}
              onClick={() => toggleImplementation('delete')}
            >
              刪除學生: {useIncorrectImplementation.delete ? '錯誤' : '正確'}實現
            </button>
          </div>
        </div>

        <button className="add-button" onClick={addStudent}>新增學生</button>
        
        <ul className="student-list">
          {students.map(student => (
            <li key={student.id} className="student-item">
              <div className="student-info">
                <h3>{student.name}</h3>
                <p>成績: {student.grade}</p>
                <p>科目: {student.subjects.join(', ')}</p>
              </div>
              <div className="student-actions">
                <button 
                  className="update-button"
                  onClick={() => updateGrade(student.id, student.grade + 5)}
                >
                  增加成績
                </button>
                <button 
                  className="update-button"
                  onClick={() => updateSubjects(student.id, '新科目')}
                >
                  新增科目
                </button>
                <button 
                  className="delete-button"
                  onClick={() => deleteStudent(student.id)}
                >
                  刪除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="state-panel">
        <h2>當前狀態</h2>
        <div className="state-content">
          <pre>{formatState()}</pre>
        </div>
      </div>
    </div>
  );
} 

export default App
