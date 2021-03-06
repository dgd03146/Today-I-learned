import React, { useRef, useState, useContext } from 'react';
import { storage } from '../../../../service/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AuthContext from '../../../../store/auth-context';
import Position from './position';
import { CountryDropdown } from 'react-country-region-selector';
import styles from './editForm.module.css';
import Card from '../../../layout/card/card';
import ImageFileInput from './image_file_input/imageFileInput';

const EditForm = (props) => {
  const playerCtx = useContext(AuthContext);

  const [country, setCountry] = useState('');

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const nameRef = useRef();
  const colorRef = useRef();
  const positionRef = useRef();
  const nicknameRef = useRef();

  const types = ['image/png', 'image/jpeg'];

  const selectCountry = (val) => {
    setCountry(val);
  };

  const handleImageChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImage(selected);
      setError('');
    } else {
      setImage(null);
      setError('Please select an image file (png or jpeg');
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const imageRef = ref(storage, 'image');
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, 'error getting the image url');
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
    addPlayerHandler();
    submitData();
  };

  const addPlayerHandler = () => {
    playerCtx.addPlayer({
      name: nameRef.current.value,
      color: colorRef.current.value,
      position: positionRef.current.value,
      country: country,
      nickname: nicknameRef.current.value,
      url: url
    });
  };

  const submitData = () => {
    const player = {
      name: nameRef.current.value,
      color: colorRef.current.value,
      position: positionRef.current.value,
      country: country,
      nickname: nicknameRef.current.value,
      url: url
    };

    fetch('https://squad-maker-default-rtdb.firebaseio.com/players.json', {
      method: 'POST',
      body: JSON.stringify({ player })
    });
  };

  return (
    <Card>
      <form className={styles.creator} onSubmit={submitHandler}>
        <div className={styles.firstRow}>
          <div className={styles.nameContainer}>
            <label className={styles.label} htmlFor="name">
              NAME
            </label>
            <input
              className={styles.name}
              id="name"
              type="text"
              placeholder="ADD NAME"
              ref={nameRef}
              value={props.name}
            />
          </div>
          <div className={styles.colorContainer}>
            <label className={styles.label} htmlFor="color">
              COLOR
            </label>
            <select name="color" id="color" ref={colorRef} value={props.color}>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>
        </div>
        <label className={styles.label} htmlFor="position">
          POSITION
        </label>
        <Position positionRef={positionRef} position={props.position} />
        <label className={styles.label} htmlFor="country">
          COUNTRY
        </label>
        <CountryDropdown value={props.country} onChange={(val) => selectCountry(val)} />
        <label className={styles.label} htmlFor="nickname">
          NICKNAME
        </label>
        <input className={styles.name} id="nickname" type="text" ref={nicknameRef} value={props.nickname} />
        <label className={styles.label} htmlFor="image">
          Choose an image from your phone or computer
        </label>
        <div className={styles.upload}>
          {/* <label for="file">UPLOAD</label>
          <input type="file" id="file" onChange={handleImageChange} />
          {error && <div className={styles.error}>{error}</div>} */}
          <ImageFileInput />
          <button type="submit" className={styles.add}>
            DELETE
          </button>
        </div>
      </form>
    </Card>
  );
};
export default EditForm;
