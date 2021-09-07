import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./AddProfileImage.scss";
import { DEFAULT_USER_PROFILE, USER_IMG } from "../../../utils/constants";
import API from "../../../utils/API";
import alertify from "alertifyjs";
const AddProfileImage = (props) => {
  const [acceptedFile, setAcceptedFile] = useState(DEFAULT_USER_PROFILE);
  const [selected, setSelected] = useState(false);
  const onDrop = useCallback(inputFiles => {
    if (inputFiles[0].type.includes("image")) {
      setAcceptedFile(inputFiles[0]);
      setSelected(true);
    }
    else {
      alertify.error("Only IMG");
    }
  }, [])
  const imgUploadHandler = () => {
    if (selected) {
      const formData = new FormData();
      formData.append(
        "userimage",
        acceptedFile
      );
      API
        .post(
          `${process.env.REACT_APP_BASE_URL}${USER_IMG}`,
          formData
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      alertify.warning("Please Select Img First");
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change profile photo
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
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          imgUploadHandler();
          props.onHide();
        }}
          variant="dark">Change</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddProfileImage
