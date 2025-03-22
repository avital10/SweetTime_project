import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSweets, deleteSweet, getTotalSweets } from "../api/SweetService";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid, TextField, Pagination } from "@mui/material";
import Sweet from "../components/Sweet";
import MinCart from "../components/MinCart";

const SweetList = () => {
  const [status, setStatus] = useState("init");
  const [arr, setArr] = useState([]);
  const [totalSweets, setTotalSweets] = useState(0);
  const [isSmallCartOpen, setIsSmallCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const isFirstRender = useRef(true);
  let currenyUser=useSelector(st=>st.user.currentUser)

  const arrCart = useSelector((state) => state.cart.arr);
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  let flag = true;

  useEffect(() => {
    setStatus("pending");
    getAllSweets()
      .then(res => {
        setArr(res.data);
        setTotalSweets(res.data.length);
      })
      .catch(err => {
        console.log(err);
        alert("שגיאה בקבלת ממתקים");
      })
      .finally(() => {
        setStatus("finish");
      });
  }, []);

  useEffect(() => {
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      flag = false;
    }

    if (arrCart.length > 0 && flag) {
      setIsSmallCartOpen(true);
    }
  }, [arrCart]);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsSmallCartOpen(false);
    }, 2000);
    return () => clearTimeout(timer);

  }, [isSmallCartOpen]);

  const deleteItem = async (id) => {
    try {
      await deleteSweet(id,currenyUser?.token);
      setArr(arr.filter(item => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const filteredSweets = arr.filter(item =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFilteredPages = Math.ceil(filteredSweets.length / itemsPerPage);
  const displayedSweets = filteredSweets.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ direction: "rtl", width: "100%" }}>
      <h1>הממתקים</h1>
      <TextField
        label="חפש ממתק"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(1); // לאפס את הדף בעת חיפוש
        }}
        sx={{ marginBottom: 2 }}
      />
      {!isCartPage && isSmallCartOpen && <MinCart setIsSmallCartOpen={setIsSmallCartOpen} />}
      {status === "pending" ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={3} justifyContent="flex-start" style={{ width: '100vw' }}>
            {displayedSweets.map(item => (
              <Sweet key={item._id} item={item} deleteItem={deleteItem} />
            ))}
          </Grid>
          {totalFilteredPages > 1 && (
            <Pagination
              count={totalFilteredPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
            />
          )}
        </>
      )}
      <Outlet />
    </div>
  );
};

export default SweetList;
