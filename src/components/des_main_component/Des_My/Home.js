import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../screens/Header';
import Footer from '../../screens/Footer';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
// import DesHome from './DesHome';
import DesStyle from './DesStyle';
import DesReview from './DesReview';
// import Error404 from '../../error/Error404';
import Error404 from '../../error/Error404';
import { useLocation } from 'react-router';
import StarRating from './StarRating';
import DesHome from './DesHome';
import DesGalleryView from '../../gallery/DesGalleryView';
import { useNavigate } from 'react-router';
import DesReservationForm from './DesReservationForm';
import DesReservationDate from './DesResrevationDate';








function Home() {
    const dispatch = useDispatch();
    const params = useParams();
    const user = useSelector((state) => state.user);
    const [des, setDes] = useState({});
    const [shop, setShop] = useState({});
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };


    useEffect(() => {
        axios.get(`http://localhost:8090/shopdesinfobynum?desNum=${params.desnum}`)
            .then((res) => {
                setShop(res.data.shop);
                setDes(res.data.des);
                dispatch({ type: 'SET_DES', payload: res.data.des });

                console.log(res.data);
            })
    }, [des.num]);



    return (<>

        <div className="web-container">
            <div className="cd-container bg-white">
                <Header />
                <section className="section-header">
                    <div className="section-header-container">
                        <span className="section-header-text">스타일리스트 정보</span>
                    </div>
                </section>

                <main className="cd-main">


                    <hr className="divide-line" />

                    {/* <!-- 스타일리스트 프로필 --> */}
                    <div className="stylelist-content">

                        <div className="st-profile-container">
                            <div className="des-star-location">
                                <div className="st-profile-img">
                                    {des.num && <img src={`http://localhost:8090/desimg/${des.num}`} alt="프로필 이미지" className="st-profile-img" />}
                                </div>

                                <div className="st-profile-context">

                                    <div className="st-profile-name">
                                        {des.position} {des.desNickname}

                                    </div>
                                    {shop !== null ? (
                                        <Link to={`/shop/${shop.num}`}>

                                            <div className="st-profile-shop">
                                                {shop.name}
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="st-profile-shop">
                                        </div>
                                    )
                                    }

                                    <div className="st-profile-info">
                                        {des.info}
                                    </div>

                                    <StarRating rating={des.star} />

                                </div>
                            </div>
                            <div className="st-button-container">
                                {des.id === user.id &&
                                    <>
                                        <a href="#"><button className="st-button">편집<i className="fas fa-pen btn-icon"></i></button></a>
                                    </>
                                }
                                {shop !== null ? (
                                    <Link to={`/des/${des.num}/reservation`}>
                                        <button className="st-button">예약하기<i className="far fa-calendar-alt btn-icon"></i></button>
                                    </Link>
                                ) : (
                                    <div className="st-profile-shop">
                                    </div>)
                                }

                            </div>

                        </div>
                    </div>
                    {/* <!-- 스타일 리스트 정보 메뉴 --> */}
                    <nav className="main-nav">
                        <ul className="main-nav-list">
                            <li className={`main-nav-list-text ${isActive`/des/${des.num}/style` ? 'active' : ''}`}><Link to={`/des/${des.num}/home`}>홈</Link></li>
                            <li className={`main-nav-list-text ${isActive`/des/${des.num}/style` ? 'active' : ''}`}><Link to={`/des/${des.num}/style`}>스타일</Link></li>
                            <li className={`main-nav-list-text ${isActive`/des/${des.num}/review` ? 'active' : ''}`}><Link to={`/des/${des.num}/review`}>리뷰</Link></li>
                            {shop !== null ? (
                                <li className={`main-nav-list-text ${isActive`/des/${des.num}/review` ? 'active' : ''}`}><Link to={`/des/${des.num}/reservation`}>예약</Link></li>
                            ) : (
                                <div className="st-profile-shop">
                                </div>)
                            }


                        </ul>
                    </nav>
                    <hr className="divide-line" />
                    <Routes>
                        <Route path="home" element={<DesHome desInfo={des} ShopInfo={shop} />} />
                        <Route path="style" element={<DesStyle desInfo={des} />} />
                        <Route path="review" element={<DesReview desInfo={des} />} />
                        <Route path='/:desgalnum' element={<DesGalleryView />} />
                        <Route path='reservation' element={<DesReservationDate desInfo={des} shopInfo={shop} />} />
                        {/* <Route path='reservation' element={<DesReservationForm desInfo={des} shopInfo={shop} />} /> */}


                        {/* <Route path="/reser vation/:desnum/*" element={<DesReservation desInfo={des} />} /> */}
                        <Route path='/*' element={<Error404 />} />
                    </Routes>



                </main>
                <Footer />
            </div >
        </div >

    </>
    );
}

export default Home;