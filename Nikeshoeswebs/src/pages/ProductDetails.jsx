import React, { useState, useRef ,useEffect} from "react";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");

  const reviewUser = useRef('');

  const reviewMsg = useRef('');

  const dispatch = useDispatch();

  const { id } = useParams();

  const [rating, setRating] = useState(null);

  const product = products.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);

  const submitHandler =(e)=>{
    e.preventDefault();

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj ={
      userName: reviewUserName,
      rating,
      text: reviewUserMsg,
    };

     reviews.push(reviewObj);

    console.log(reviewObj)
    toast.success('Review Submitted')
  }
  

  const addToCart = () =>{
    dispatch(cartActions.addItem({
      id,
      image:imgUrl,
      productName,
      price,

    }))
    toast.success('Product Added Successfully');
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[product])
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>

            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center mb-3">
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-s-fill"></i>
                  </span>
                  <span>
                    <i class="ri-star-half-s-line"></i>
                  </span>

                  <p>({avgRating} Ratings)</p>
                </div>

                <div className="d-flex align-items-center gap-5">
                <span className="product__price">${price}</span>
                <span>Category: {category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="buy__btn" onClick={addToCart}>
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li kew={index} className="mb-4">
                          <h6>{item.userName}</h6>
                          <span>{item.rating} ( rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h4>Leave Your Experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder="Enter Name" ref={reviewUser}
                          required/>
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span whileTap={{scale:1.5}} whileHover={{scale:0.8}}  onClick={() => setRating(1)}>
                            1<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.4}} whileHover={{scale:0.8}} onClick={() => setRating(2)}>
                            2<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.5}} whileHover={{scale:0.8}} onClick={() => setRating(3)}>
                            3<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.5}} whileHover={{scale:0.8}} onClick={() => setRating(4)}>
                            4<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale:1.5}} whileHover={{scale:0.8}} onClick={() => setRating(5)}>
                            5<i class="ri-star-s-fill"></i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message"
                          />
                        </div>

                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                         type="submit" className="buy__btn">
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title">You Might Also Like</h2>
            </Col>

            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
