import React, { useEffect, useState } from 'react';
import "../../assets/css/notePage.css";
import NotePageModal from './NotePageModal'; // 모달 컴포넌트 추가
import api from '../../lib/api'

let color =[  "LightGoldenRodYellow","PaleGreen","LightPink","LightBlue"];
function NotePage() {
  const [stickiesArray, setStickiesArray] = useState([]);
  const [selectedSticky, setSelectedSticky] = useState(null); // 선택된 스티키 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const ref = await api.get('/api/posts/myNotes/1');
    // console.log('ref', ref);

  // 컬러 추가
  const stickiesRef = ref.map(item => ({
    ...item,
    color: color[Math.floor(Math.random() * color.length)]
  }));

    // 필요한 경우, setStickiesArray 호출하여 상태 업데이트
    setStickiesArray(stickiesRef);
  }

  // const createSticky = async () => {
    
  //   const content = document.getElementById("note_text").value;
  //   const title = '나야 노트';
  //   const gubun = 'sundays';

  //   let data = {title, memberId:1, content, gubun}

  //   const ref = await api.post('/api/posts/myNotes/save',data);
  //   // console.log('ref', ref);
  //   if(ref){      
  //     document.getElementById("note_text").value = '';
  //     fetchData();
  //   }
  // };

  // const deleteSticky = async (selectedSticky) => {
  //   console.log('deleteSticky',selectedSticky);
  //   const ref = await api.post('/api/posts/deletePost',selectedSticky);
  //   console.log('deleteref', ref);
  //   if(ref){
  //     fetchData();
  //   }
  // };

  const openModal = (sticky) => {
    setSelectedSticky(sticky); // 선택된 스티키 설정
    setIsModalOpen(true); // 모달 열기

  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSticky(null); // 선택된 스티키 초기화
    fetchData();
      // 드래그 방지 해제

  };

  // const handleDeleteConfirm = () => {
  //   if (selectedSticky) {
  //     deleteSticky(selectedSticky); // 스티키 삭제
  //     closeModal(); // 모달 닫기
  //   }
  // };

  return (
    <div calss="note_div">
      {/* <form> */}
        {/*<label htmlFor="note_color">색상:</label>
        <select id="note_color">
          <option value="LightGoldenRodYellow">노란색</option>
          <option value="PaleGreen">녹색</option>
          <option value="LightPink">분홍</option>
          <option value="LightBlue">파란색</option>
        </select>*/}
        {/* <label htmlFor="note_text">내용:</label>
        <input type="text" id="note_text" placeholder="Write your note here" />
        <button type="button" onClick={createSticky}>스티키 노트 추가</button>
      </form> */}
      <button type="button" onClick={() => openModal()}>생성</button>
      <ul id="stickies">
        {stickiesArray.map(sticky => (
          <li 
            key={sticky.id}
            style={{ backgroundColor: sticky.color }}
            onClick={() => openModal(sticky)} // 클릭 시 모달 열기
          >
            <div>제목 : {sticky.title}</div>
            <div className='sticky_content_div'>            
              <p className='sticky_content'>
              {sticky.content
                      .replace(/<p>/g, '\n')
                      .replace(/<\/p>/g, '')
                      .replace(/&nbsp;/g, ' ')
                      .split("\n")
                      .map((line, index) => (
              <React.Fragment key={index}>{line}<br /></React.Fragment>
              ))}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <NotePageModal isOpen={isModalOpen} closeModal={closeModal} selectedSticky={selectedSticky}/>
      )}
    </div>
  );
}

export default NotePage;
