import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";

import { Loading } from '@component';

import { uploadImageAction, updateUserData } from '../../../../redux/core/actions';
import { IProps } from "./photo";

import styles from './photo.module.scss';

function Skills(props: IProps) {

    const [modalStatus, setModalStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const _uploadFile = (e: any) => {
        
        setLoading(true);
        setModalStatus(false);
        const imageFile = e.target.files[0];
        const uploadRes:any = dispatch(uploadImageAction(imageFile));
        uploadRes.then((res: any) => {
            const data = {
                photo: res.data.link
            }
            dispatch(updateUserData(data));
            setLoading(false);
        })
        .catch((err: any) => {
            console.log(err);
            setLoading(false);
        });
    }


    return (
        <>
            <div className={styles.box} onClick={() => setModalStatus(true)}>
                <img
                    src={props.userData.photo}
                    alt="user photo"
                    className={styles.image}
                />
            </div>

            <Modal
                show={modalStatus}
                onHide={() => setModalStatus(false)}
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h3 className="modal-title w-100 text-center">
                        Upload Photo
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.saveModal}>
                        <p>
                            Choose your photo
                        </p>

                        <div className={styles.uploadModalBtn}>
                            <label htmlFor="uploadFile" >
                                CHOOSE PHOTO
                            </label> 
                        </div>

                        <input
                            type="file"
                            id="uploadFile"
                            className={styles.uploadModalFileType}
                            accept="image/*"
                            onChange={(e) => {
                                _uploadFile(e);
                            }}
                            onClick={(e: any)=> { 
                                e.target.value = null
                            }}
                        />
                        
                    </div>
                </Modal.Body>
            </Modal>

            <Loading show={loading} />
        </>
    )
}


/* Export Component =============================== */
export default Skills;