import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Restaurant from "../component/Restaurant";
import Loader from "../component/Loader";
import { url } from "../../Api";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { BiMapAlt } from "react-icons/bi";
const Container = styled.div`
    width: 410px;
    height: 770px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;
const HeaderContainer = styled.div`
    display: flex;

    align-items: center;
    width: 410px;
    height: 60px;
    background-color: white;
    color: black;
    padding: 5px 15px;
    font-size: 15px;
    border: 1px solid ${(props) => props.theme.borderGrayColor};
    position: absolute;

    top: 0;
    font-weight: bold;
    z-index: 3;
    .icon {
        cursor: pointer;
        &:hover {
            color: ${(props) => props.theme.manColor};
        }
        color: ${(props) => props.theme.mainColor};
    }
    .map {
        font-size:23px;
        color: rgba(0,0,0,0.3);
        margin-top:3px;
    }
`;
const ListContainer = styled.div`
    width: 390px;
    /* 410,770 */
    height: 700px;
    /* background-color:red; */
    margin-top: 65px;
    /* display:flex; */

    overflow: auto;
    /* display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  grid-template-rows: masonry; */
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
    .Target-Element {
        width: 100vw;
        height: 140px;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
    }
`;
const Footer = styled.div`
    width: 410px;
    height: 60px;
    background-color: white;
    position: absolute;
    bottom: 0;
`;
const AreaContainer = styled.div`
    width: 50px;
    height: 30px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        margin-bottom: 5px;
    }
    .map {
        font-size: 24px;
    }
`;
const InputContainer = styled.div`
    width: 322px;
    height: 30px;
    margin-left: 15px;
    input {
        width: 322px;
        height: 30px;
        border: 0;
        outline: 0;
        font-size: 15px;
        color: transparent;
        text-shadow: 0 0 0 #000000;
        &:focus {
            outline: none;
        }
    }
`;

let currentPage = 0;
let currentSearchWord = "";
const getToken = localStorage.getItem("guestToken");

const RestaurantSearch = () => {
    const [restaurantArr, setRestaurantArr] = useState([]);
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [firstInput, setfirstInput] = useState(false);
    let last = false;

    const bringSearchWord = (e) => {
        e.preventDefault();
        setSearchWord(e.target.value);
        // TODO : axios로 추천 키워드를 요청받아야 함
        setfirstInput(true);
    };

    const getSearch = async (e) => {
        e.preventDefault();
        if (currentSearchWord === "" || currentSearchWord !== searchWord) {
            currentPage = 0;
            setRestaurantArr([]);
            setfirstInput(false);
        }
        currentSearchWord = searchWord;
        bringMarketInfo();
    };

    const bringMarketInfo = async () => {
        
    const getToken = localStorage.getItem("guestToken");
        if (last == false && firstInput) {
            //마지막이 아니어야 get을 할 수 있음 마지막이라면 last가 true일것 false여야 할 수 있음
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setPost(true);
            await axios //${searchWord}
                .get(
                    url +
                        `/fooding/restaurant/search?keyword=${currentSearchWord}&page=${currentPage}&size=10`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + getToken,
                        },
                    }
                )
                .then((res) => {
                    currentPage++;
                    const lastresult = res.data.last;
                    setRestaurantArr((restaurantArr) => restaurantArr.concat(res.data.content));
                    setIsLoaded(true);
                    if (lastresult === true) {
                        last = true;
                        setIsLoaded(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoaded(false);
                });
        }
    };

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !last && isLoaded) {
            observer.unobserve(entry.target);
            await bringMarketInfo();
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        let observer;
        if (target && !last && firstInput) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: 0.4,
            });
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [isLoaded]);

    return (
        <Container>
            {/* 헤더 따로 만들기 */}
            <HeaderContainer>
                <Link to={`/guest/restaurantList`}>
                    <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
                </Link>
                <InputContainer>
                    <form onSubmit={getSearch}>
                        <input
                            onChange={bringSearchWord}
                            value={searchWord}
                            type="text"
                            placeholder="검색어를 입력하세요"
                        ></input>
                    </form>
                </InputContainer>
                {post ? (
                    <div className="map">
                        <Link
                            style={{ textDecoration: "none", color: "inherit" }}
                            to={`/guest/location`}
                            state={{ searchWord: searchWord }}
                        >
                            <BiMapAlt></BiMapAlt>
                        </Link>
                    </div>
                ) : null}
            </HeaderContainer>
            <ListContainer>
                {/* 여기서 get해와서 배열 꺼내서  component에 prop보냄*/}
                {restaurantArr?.map((content, index) => {
                    return (
                        <Link
                            to={`/guest/${content.id}`}
                            key={index}
                            state={{
                                avgScore: content.avgScore,
                                reviewCount: content.reviewCount,
                                viewCount: content.viewCount,
                            }}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Restaurant content={content} />
                        </Link>
                    );
                })}
                <div ref={setTarget} className="Target-Element">
                    {isLoaded && !last && <Loader />}
                </div>
            </ListContainer>
        </Container>
    );
};
export default RestaurantSearch;
