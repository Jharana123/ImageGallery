import NavBar from "../../components/Navbar";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageDrawer from "../../components/Drawer";
import InfiniteScroll from "react-infinite-scroll-component";
import '../../App.css'
const Images = () => {

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [viewDrawer, _viewDrawer] = useState(false);
  const[drawerItem,setDrawerItem]=useState([]);

  useEffect(() => {
    getApiData(page, false, true);
  }, [searchData]);

 

 const onCloseDrawer = () => {
   _viewDrawer(false);
 };

  const getApiData = async (page, isScroll = false, isNewSearch = false) => {
    try {
      let photoRetrived = await axios.get(
        `https://pixabay.com/api/?key=27902955-63d21b568260991c6fc1dc611&q=${searchData}&image_type=photo`,
        {
          params: {
            page: page,
            per_page: 20,
          },
        }
      );
      // console.log('photoRetrived', photoRetrived)
      if (isNewSearch) {
        setImages([searchData]);

        if (isScroll) {
          setImages([...images, ...photoRetrived.data.hits]);
        } else {
          setImages(photoRetrived.data.hits);
        }
      } else {
        setImages([...images, ...photoRetrived.data.hits]);
      }
    } catch {
      console.error();
    }
  };

  const getData = (data) => {
    setPage(page + 1);
    getApiData(page, true);
    searchData(data);
  };
   const onClickDrawerHandler = (item) => {
     console.log('item', item)
     setDrawerItem(item);
     _viewDrawer(true);
   };
   const onClickSortByViews = () => {
     let tempArray = [...images];
     let updatedArray = tempArray.sort((a, b) => {
       return b.views - a.views;
     });
     setImages(updatedArray);
   };

   const onClickSortBySIze = () => {
     let tempArray = [...images];
     let updatedArray = tempArray.sort((a, b) => {
       return b.imageSize - a.imageSize;
     });
     setImages(updatedArray);
   };

   const searchFieldHandler = (e) => {
     getApiData(page, e.target.value, true);
     setSearchData(e.target.value);
     console.log("searchFieldInput", e.target.value);
   };
   const content = (
     <div>
       <div>
         <a onClick={() => onClickSortByViews()}>By number of Views</a>
       </div>
       <div>
         <a onClick={() => onClickSortBySIze()}>By image Size</a>
       </div>
     </div>
   );
  return (
    <>
      <NavBar
        onSearch={(e) => searchFieldHandler(e)}
        value={searchData}
        content={content}
      />
      <div>
        <InfiniteScroll
          dataLength={images.length}
          next={() => getData()}
          hasMore={true}
        >
          <div className={styles.mainPageContainer}>
            {images.map((item) => (
              <div className={styles.container}>
                <img
                  src={item.largeImageURL}
                  alt="loading.."
                  className={styles.imageSize}
                  onClick={() => onClickDrawerHandler(item)}
                />
                <div className={styles.imageDetails}></div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
        <div>
          <ImageDrawer
            viewDrawer={viewDrawer}
            onClose={() => onCloseDrawer()}
            drawerItem={drawerItem}
          />
        </div>
      </div>
    </>
  );
};
export default Images;
