import Header from "./Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import SimpleSlider from "./SimpleSlider";
import Slider from "react-slick";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 0px;
`;
const InputFormDiv = styled.div`
  width: 700px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .NameForm {
    height: 500px;
    .BorderTop {
      border-top: ${(props) => props.theme.menuBorderColor};
    }
    
  }
  form {
    height: 400px;
    width: 100%;
    margin-bottom: 40px;
    position: relative;

    button {
      position: absolute;
      right: 0;
    }
    input {
      border: none;
      border-bottom: 1px solid white;
      width: 100%;
      height: 35px;
      font-size: 15px;
      /* padding-top: 10px;
      padding-bottom: 5px; */
      box-sizing: border-box;
    }
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 15px;
      box-sizing: border-box;
      resize: none;
    }

    input:focus,
    textarea:focus {
      outline: none;
    }
  }
`;
const Button = styled.button`
  border: none;
  margin-top: 5px;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: ${(props) => props.theme.menuBorderColor};
`;
const MarketImgDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  .MarketImgForm {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    & input[type="file"] {
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: none;
      display: none;
    }
    & label {
      width: 209px;
      height: 180px;
      position: absolute;
      background-color: white;
      left: 0;
      top: 0;
      /* z-index:2; */
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 45px;
      border: ${(props) => props.theme.menuBorderColor};
      cursor: pointer;
    }
  }
`;
const MarketImg = styled.img`
  width: 210px;
  height: 179px;

  /* position: absolute; */
  /* left: 0;
  top: 0; */
  object-fit: cover;
`;

const SliderDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoForm = styled.form`
  height:300px;
 
  .AddressContainer{
    height:40px;
  }
  .NumberContainer {
    height: 80px;
    margin-top: 10px;
  }
  .BorderTop {
    border-top: ${(props) => props.theme.menuBorderColor};
  }
  .Time {
    height: 80px;
    margin-top: 20px;
  }
`;
const NameBox = styled.div`
  width: 140px;
  height: 100%;
  background-color: ${(props) => props.theme.fillGrayColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => props.theme.menuBorderColor};
`;
const SubBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: ${(props) => props.theme.fillGrayColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 345px;
  height: 94%;
  margin-left: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0px;
  padding-bottom: 0px;
  .SelectCategoryContainer{
    margin-left:30px;
    width:130px;
  }
  .CategoryTags{
    display:flex;
    justify-content:"space-evenly";  
    width:400px;
    height:30px;
    background-color:orange;
      .EachCategoryTag{
        display:flex;
        width:120px;
        background-color:"orange";
        .EachCategoryButton{
          border:3px solid black;
          border-radius:3px;
          width:20px;
          height:20px;
          &:hover{
            cursor:pointer;
          }
        }
      }
    }
`;

const NumContainer = styled.div`
  width: 80%;
  height: 80px;

  .NumInputStyle {
    width: 80%;
    font-size: 15px;
    height: 25px;
    margin-left: 3px;
  }
  .InputNTitleContainer {
    width: 100%;
    height: 40px;
    &:nth-child(1),
    &:nth-child(3) {
      border-bottom: ${(props) => props.theme.menuBorderColor};
    }
    display: flex;
    align-items: center;
  }

  .TimeInput {
    width: 120px;
    font-size: 15px;
    height: 25px;

    margin-top: 1px;
    margin-left: 3px;
  }
`;

const SmallInput = styled.input``;

const MenuList = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  width: 700px;
  /* border: ${(props) => props.theme.menuBorderColor}; */

  margin-bottom: 20px;
  margin-top: 150px;
  border-top: ${(props) => props.theme.menuBorderColor};
  border-left: ${(props) => props.theme.menuBorderColor};
`;

const MenuHeader = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${(props) => props.theme.fillGrayColor};
  display: flex;
  justify-content: center;
  align-items: center;
  //border-bottom: ${(props) => props.theme.menuBorderColor};
  border-bottom: ${(props) => props.theme.menuBorderColor};
  //border-top: ${(props) => props.theme.menuBorderColor};
  .menuImg {
    width: 20%;
    input {
      display: none;
    }
    position: relative;
  }
  .menuName {
    width: 20%;
  }
  .menuPrice {
    width: 15%;
  }
  .menuDesc {
    width: 37%;
  }
  .menuDel {
    width: 8%;
  }
`;

const MenuProp = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-right: ${(props) => props.theme.menuBorderColor};

  padding: 9px;



  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    position: absolute;
    display: inline-block;
    content: "";
    border-style: hidden;
    border: 0px;
    border-width: 0px;
  }
  input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: ${(props) => props.theme.menuBorderColor};
  }
  textarea {
    width: 100%;
    height: 70px;
    resize: none;
    border-radius: 5px;
    border: ${(props) => props.theme.menuBorderColor};
  }

  input:focus,
  textarea:focus {
    outline: none;
  }
 
  
`;

const MenuItem = styled(MenuHeader)`
  background-color: white;
  height: 100px;

  .menuDel {
    //trash
    button {
      color: red;
      border: 1px solid red;
      background-color: white;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`;

const MenuInput = styled(MenuHeader)`
  background-color: white;
  height: 100px;
`;

const FileIcon = styled.label`
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: none;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddMenuBtn = styled(Button)`
  width: 100px;
`;

const StyledSlider = styled(Slider)`
  height: 100%; //슬라이드 컨테이너 영역

  svg:focus {
    outline: none;
  }

  .slick-list {
    //슬라이드 스크린
    width: 210px;
    height: 179px;
    //margin: 0 auto;
    overflow-x: hidden;
    background: transparent;
  }

  .slick-slide div {
    //슬라이더  컨텐츠
    /* cursor: pointer; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 179px;
    background-color: transparent;
    color: ${(props) => props.theme.fillGrayColor};
    &:active {
      outline: none;
    }
  }

  .slick-prev {
    /* position: absolute;
    left: 5px;
    width: 20px;
    height: 20px;
    z-index: 10px; */
    /* position: relative;
    left: 50px; */
    padding-left: 25px;
    z-index: 1;
  }

  .slick-dots {
    //슬라이드의 위치
    bottom: 1px;
    margin-top: 100px;
  }

  .slick-track {
    //이건 잘 모르겠음
    width: 100%;
  }
`;

function Register() {
  const [menu, setMenu] = useState("");
  const [price, setPrice] = useState("");
  const { register, watch, getValues } = useForm();
  const menuChange = (event) => setMenu(event.target.value);
  const priceChange = (event) => setPrice(event.target.value);
  const [addMenu, setAddMenu] = useState(false);
  const [marketImgs, setMarketImgs] = useState([]);
  const [menuImg, setMenuImg] = useState();
  const [file, setFile] = useState();
  
  const [categorySelected,setCategorySelected]=useState([]);
  const addMenuFunc = () => setAddMenu((current) => !current);
  let categoryList = [];
  // useEffect(()=>{
  //   let temp = categorySelected;
  //   categoryList.push(temp);
  //   console.log(categoryList);
  // },[categorySelected]);

  const marketImgChange = (e) => {
    e.preventDefault();
    // setMarketImg(URL.createObjectURL(e.target.files[0]));
    const img = URL.createObjectURL(e.target.files[0]);

    const tempArr = [...marketImgs, img];
    setMarketImgs(tempArr);
    console.log(tempArr);
  };

  const onChangeImage = (e) => {
    e.preventDefault();
    const img = e.target.files[0];

    setMenuImg(img);

    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFile(prevFile);

    e.target.value = "";
  };
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleSelect = (e)=>{
    // if(categorySelected.length>0){
    //   categorySelected.map((value,index)=>{
    //   console.log("e.target.value ",e.target.value,"value ",value);
    //   if(e.target.value==value){
        
    //   }
    //   else{
    //     setCategorySelected((currentArray)=>[e.target.value,...currentArray]);
    //   }
    //   })
    // }
    // else{
    //    setCategorySelected((currentArray)=>[e.target.value,...currentArray]);
    //   }

    if(!categorySelected.includes(e.target.value)){
      setCategorySelected((currentArray)=>[e.target.value,...currentArray]);
    }
   
    
  }
  const categoryButtonClick =(index)=>{
 
    
    // setCategorySelected((currentArray)=>currentArray.map((value,index)=>{
    //   if(value===e.target.value){
    //     currentArray.pop(value);
    //   }
    // }));
    // const li = e.target.parentElement;
    // console.log(li);
    // li.remove();
    setCategorySelected(categorySelected.filter((item, categoryIndex) => index !== categoryIndex));
  
  }
  return (
    <Container>
      <Header />

      <InputFormDiv>
        <form className="NameForm">
          <div
            style={{
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "70%" }}>
              <InputContainer className="BorderTop">
                <NameBox>
                  <p>상호명</p>
                </NameBox>
                <InputBox>
                  <input
                    {...register("businessName")}
                    placeholder="상호명을 입력하시오."
                  />
                </InputBox>
              </InputContainer>
              <InputContainer style={{ height: "120px" }}>
                <NameBox>
                  <p>상세설명</p>
                </NameBox>
                <InputBox>
                  <textarea
                    {...register("detail")}
                    style={{ fontFamily: "Roboto" }}
                    placeholder="상세설명을 입력하시오"
                  />
                </InputBox>
              </InputContainer>
            </div>

            <div style={{ width: "30%", height: "180px" }}>
              <InputContainer style={{ height: "100%" }}>
                <MarketImgDiv>
                  <form className="MarketImgForm">
                    <input
                      id="market_img_input"
                      type="image"
                      type="file"
                      accept="image/jpg,image/png,image/jpeg,image/gif"
                      name="market_img"
                      onChange={marketImgChange}
                    />
                    <label htmlFor="market_img_input">
                      <SliderDiv>
                        <StyledSlider {...settings}>
                          {marketImgs?.length !== 0 ? (
                            marketImgs?.map((one, index) => (
                              <div>
                                <MarketImg src={one} key={index} />
                              </div>
                            ))
                          ) : (
                            <FontAwesomeIcon
                              style={{ color: "rgba(0, 0, 0, 0.1)" }}
                              icon={faCamera}
                            />
                          )}{" "}
                        </StyledSlider>
                      </SliderDiv>
                    </label>
                  </form>
                </MarketImgDiv>
              </InputContainer>
            </div>
          </div>

        </form>
        <InfoForm> 
          {/* 주소 입력  */}
          {/* <div style={{ width: "100%", height: "100px",}}> */}
          <InputContainer className="AddressContainer BorderTop">
            <NameBox>
              <p>주소</p>
            </NameBox>
            <InputBox style={{width:"80%"}}>
              {/* <div className="InputAddressContainer"> */}
                <input
                  className="NumInputStyle"
                  {...register("address")}
                  placeholder="주소를 입력하시오"
                  style={{ marginTop: "1px" }}
                />
              {/* </div> */}
              </InputBox>
          </InputContainer>
          <InputContainer className="AddressContainer">
            <NameBox>
              <p>카테고리</p>
            </NameBox>
            <InputBox style={{width:"80%", display:"flex", justifyContent:"flexStart"}}>
              <div className="SelectCategoryContainer">
                <select onChange={handleSelect} value={categorySelected}>
                   <option value="KOREAN">한식</option>
                   <option value="JAPANESE">일식</option>
                   <option value="CHINESE">중식</option>
                   <option value="WESTERN">WESTERN</option>
                   <option value="SNACK">SNACK</option>
                   <option value="NOODLE">NOODLE</option>
                   <option value="SOUP">SOUP</option>
                   <option value="BBQ">BBQ</option>
                   <option value="PORK">PORK</option>
                   <option value="BEEF">BEEF</option>
                   <option value="CHICKEN">CHICKEN</option>
                   <option value="LAMB">LAMB</option>
                   <option value="CAFE">CAFE</option>
                </select>
              
              </div>
              {/* <div style={{color:"white"}}></div> */}
              {/* <div>수정된 카테고리 {categorySelected}</div> */}
              <ul className="CategoryTags">                
                {categorySelected.map((value,index)=>{
                  return (<li key={index} className="EachCategoryTag"><div className="EachCategoryButton" onClick={()=>categoryButtonClick(index)}>X</div>{value}</li>)
                })}
                </ul>
              </InputBox>
          </InputContainer>
          <InputContainer className="NumberContainer BorderTop">
            <NameBox>
              <p>번호</p>
            </NameBox>
            <NumContainer>
              <div className="InputNTitleContainer">
                <SubBox>사업자 번호</SubBox>
                <input
                  className="NumInputStyle"
                  {...register("businessNum")}
                  placeholder="번호를 입력하시오"
                  style={{ marginTop: "1px" }}
                />
              </div>
              <div className="InputNTitleContainer">
                <SubBox>개인 번호</SubBox>
                <input
                  className="NumInputStyle"
                  {...register("personalNum")}
                  placeholder="번호를 입력하시오"
                  style={{ alignItems: "center" }}
                />
              </div>
            </NumContainer>
          </InputContainer>
          {/* </div> */}
          {/* <div style={{ width: "100%", height: "400px", marginTop:"10px" }}> */}
          <InputContainer className="Time BorderTop">
            <NameBox>
              <p>시간</p>
            </NameBox>
            <NumContainer>
              <div className="InputNTitleContainer">
                <SubBox>평일 시간대</SubBox>
                <input
                  type="time"
                  value="11:00:00"
                  className="TimeInput"
                  {...register("weekdayTimeStart")}
                />
                <p>부터</p>
                <input
                  type="time"
                  value="21:00:00"
                  className="TimeInput"
                  {...register("weekdayTimeEnd")}
                />
                <p>까지</p>
              </div>
              <div className="InputNTitleContainer">
                <SubBox>주말 시간대</SubBox>
                <input
                  value="11:00:00"
                  type="time"
                  className="TimeInput"
                  {...register("weekendTimeStart")}
                />
                <p>부터</p>
                <input
                  value="21:00:00"
                  type="time"
                  className="TimeInput"
                  {...register("weekendTimeEnd")}
                />
                <p>까지</p>
              </div>
            </NumContainer>
          </InputContainer>

          {/* </div> */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              const values = getValues();
              console.log("values ", values);
            }}
          >
            등록
          </Button>
        </InfoForm>
      </InputFormDiv>
      <MenuList>
        <MenuHeader>
          <MenuProp className="menuImg">이미지</MenuProp>
          <MenuProp className="menuName">메뉴명</MenuProp>
          <MenuProp className="menuPrice">가격</MenuProp>
          <MenuProp className="menuDesc">상세설명</MenuProp>
          <MenuProp className="menuDel">삭제</MenuProp>
        </MenuHeader>
        <MenuItem>
          <MenuProp className="menuImg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTKPDx1O2bYkd2XpUCoufgO03ERC5JzdxdIl9GFVXNf9q5j9kov4AInChkSy8Q0girIxM&usqp=CAU" />
          </MenuProp>
          <MenuProp className="menuName">불닭볶음면</MenuProp>
          <MenuProp className="menuPrice">1300</MenuProp>
          <MenuProp className="menuDesc">너무 맵고 맛있다.</MenuProp>
          <MenuProp className="menuDel">
            <button>
              <i className="fa-solid fa-trash"></i>
            </button>
          </MenuProp>
        </MenuItem>
        {addMenu ? (
          <MenuInput>
            <MenuProp className="menuImg">
              <input
                id="image_input"
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                name="photo"
                onChange={onChangeImage}
              />
              <FileIcon htmlFor="image_input">
                {file === undefined ? (
                  <FontAwesomeIcon
                    style={{
                      color: "rgba(200, 200, 200, 0.5)",
                      fontSize: "30px",
                    }}
                    icon={faCamera}
                  />
                ) : null}
              </FileIcon>
              {file !== undefined ? (
                <img src={file} style={{ border: "0" }} />
              ) : null}
            </MenuProp>
            <MenuProp className="menuName">
              <input placeholder="메뉴명" />
            </MenuProp>
            <MenuProp className="menuPrice">
              <input placeholder="가격" />
            </MenuProp>
            <MenuProp className="menuDesc" style={{ width: "45%" }}>
              <textarea placeholder="상세설명" />
            </MenuProp>
          </MenuInput>
        ) : null}
      </MenuList>
      {addMenu ? (
        <Button onClick={addMenuFunc}>등록</Button>
      ) : (
        <Button onClick={addMenuFunc}>추가</Button>
      )}
    </Container>
    // </div>
  );
}
export default Register;
