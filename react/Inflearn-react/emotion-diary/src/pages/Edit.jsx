import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DiaryEditor from '../components/DiaryEditor';

import AuthContext from '../store/Auth-Context';

const Edit = () => {
  const navigate = useNavigate();
  const [originData, setOriginData] = useState();
  const { id } = useParams();

  const { data } = useContext(AuthContext);

  useEffect(() => {
    if (data.length >= 1) {
      const targetDiary = data.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, data]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
