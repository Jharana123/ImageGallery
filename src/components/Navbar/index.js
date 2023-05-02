import { Popover,Button } from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { DebounceInput } from "react-debounce-input";

const NavBar = ({content,onSearch,value}) => {
  return (
    <>
      <div
        className={styles.navigationBar}
        // style={{ display: "fixed", top: "0" }}
      >
        <div className={styles.titleContainer}>
          <h1 className={styles.titleText}>Jharana's Gallery</h1>
        </div>

        <div className={styles.SearchField}>
          <DebounceInput
            className={styles.inputField}
            placeholder="Search Images "
            debounceTimeout={300}
            allowclear=""
            suffix={<SearchOutlined />}
            onChange={onSearch}
            value={value}
          />
        </div>
        <div>
          <Popover 
          placement="right" 
          content={content}
           title="Sort Image">
            <MoreOutlined className={styles.sortingMenu} />
          </Popover>
          
        </div>
      </div>
    </>
  );
};

export default NavBar;
