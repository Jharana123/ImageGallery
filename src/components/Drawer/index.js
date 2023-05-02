import {  Drawer } from "antd";
import React, { useEffect, useState } from "react";
import styles from  "./style.module.css"

const ImageDrawer = ({ viewDrawer, onClose, drawerItem }) => {
  console.log('drawerItem', drawerItem)
  return (
    <>
      <Drawer
        title="Image Drawer"
        width={550}
        placement="right"
        onClose={onClose}
        visible={viewDrawer}
      >
        <div className={styles.imageDiv}>
          <img
            src={drawerItem.largeImageURL}
            alt="loading..."
            className={styles.drawerImage}
          />
        </div>
        <div className={styles.imageDetails}>
          <h2>Likes:{drawerItem.likes}</h2>
          <h2>Views:{drawerItem.views}</h2>
          <h2>Comments:{drawerItem.comments}</h2>
          <h2>Downloads:{drawerItem.downloads}</h2>
          <h2>User Name:{drawerItem.user}</h2>
          <h2>Image Size:{drawerItem.imageSize}</h2>
        </div>
      </Drawer>
    </>
  );
};

export default ImageDrawer;
