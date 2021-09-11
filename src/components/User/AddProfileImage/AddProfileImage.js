import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./AddProfileImage.scss";
import { CHANGE_PROFILE, DEFAULT_USER_PROFILE, DRAG_AND_DROP, DROP_FILE, USER_IMG, SELECT_IMG } from "../../../utils/constants";
import API from "../../../utils/API";
import alertify from "alertifyjs";
import { CHANGE } from '../../../labels/button';
const AddProfileImage = ({ show, onHide }) => {
  const [acceptedFile, setAcceptedFile] = useState(DEFAULT_USER_PROFILE);
  const [selected, setSelected] = useState(false);
  const [base64String, setBase64String] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(inputFiles => {
    if (inputFiles[0].type.includes("image")) {
      setAcceptedFile(inputFiles[0]);
      setSelected(true);
      let file = inputFiles[0];
      let reader = new FileReader();
      reader.onload = function () {
        let base64Str = reader.result.replace("data:", "")
          .replace(/^.+,/, "");
        setBase64String("data:image/png;base64," + base64Str);
      }
      reader.readAsDataURL(file);
    }
    else {
      alertify.error("Only IMG");
    }
  }, [])

  const onChangeImgLocal = (newImg) =>{
    const oldLocalStorage = JSON.parse(localStorage.getItem("user"));
    oldLocalStorage.imgUrl = `${newImg}?${Date.now()}`;
    localStorage.setItem("user", JSON.stringify(oldLocalStorage));
  }

  const imgUploadHandler = () => {
    setIsUploading(true);
    if (selected) {
      API
        .post(
          `${process.env.REACT_APP_BASE_URL}${USER_IMG}`,
          { image: base64String }
        )
        .then((res) => {
          setSelected(false);
          setAcceptedFile(DEFAULT_USER_PROFILE);
          onChangeImgLocal(res?.data?.data?.imgUrl);
          onHide();
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          setIsUploading(false);
        })
    }
    else {
      alertify.warning(SELECT_IMG);
    }
  }

  const onChangeHandler = () => {
    imgUploadHandler();
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {CHANGE_PROFILE}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="add-profile__profile-pic">
          <img src={selected ? URL.createObjectURL(acceptedFile) : DEFAULT_USER_PROFILE} alt="UserProfile" />
        </div>
        <div {...getRootProps()} className="add-profile__input-img">
          <input {...getInputProps()} accept="image/*" />
          {
            isDragActive ?
              <p>{DROP_FILE}</p> :
              <p>{DRAG_AND_DROP}</p>
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onChangeHandler}
          variant="dark" disabled={isUploading}>{CHANGE}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddProfileImage
