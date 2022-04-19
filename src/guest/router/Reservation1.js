import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
`;

const MainBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  //justify-content: center;
  align-items: center;
  margin-top: 90px;
  flex-direction: column;
`;

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */

  /* max-width: 590px;
  margin: auto;
  margin-top: 20px;
  /* background-color: #d4f7d4; */

  .react-calendar {
    width: 380px;
    height: 300px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border: none;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    //background-color: #f0f0f0;
    color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  /* .react-calendar__month-view__days__day--weekend {
 color: #d10000;
} */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
    color: white;
  }

  /* .react-calendar:disabled {
    background-color: white;
  } */

  .react-calendar__month-view__days__day:disabled {
    background-color: white;
    color: #f0f0f0;
    //color: #6f48eb;
  }
`;

const ScollContainer = styled.div`
  width: 100%;
  height: 80px;
  //background-color: teal;
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const InnerContainer = styled.div`
  overflow: auto;
  width: 500px;
  height: 100%;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const PeopleContainer = styled(ScollContainer)`
  margin-top: 20px;
`;

const PeopleInnerCon = styled(InnerContainer)``;

const TimeContainer = styled(ScollContainer)`
  /* margin: 20px; */
`;

const TimeInnerCon = styled(InnerContainer)``;

const TimeBtn = styled.button`
  height: 40px;
  width: 80px;
  border: none;
  margin: 4px;
  font-size: 12px;
  border-radius: 3px;
  color: white;
  background: ${(props) => props.theme.purpleColor};
  &:active {
    background: white;
    color: ${(props) => props.theme.purpleColor};
  }
`;

const NextBtn = styled.button`
  width: 95%;
  height: 50px;
  background: white;
  margin-top: 50px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
`;

const CheckBox = styled.div`
  width: 100%;

  span {
    margin-right: 20px;
    font-size: 14px;
    /* font-weight: bold; */
    color: gray;
  }
  .wrap_box {
    width: 100%;
    height: 30px;
    margin: 20px;
    display: flex;
    align-items: center;
  }
  input {
    position: absolute;
    left: -1000%;
  }
  label {
    position: relative;
    display: block;
    width: 60px;
    height: 30px;
    background: ${(props) => props.theme.borderGrayColor};
    border-radius: 30px;
    transition: background 0.4s;
    cursor: pointer;
  }
  label:after {
    content: "";
    position: absolute;
    left: 8.5px;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: #fff;
    transform: translateY(-50%);
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
  }
  input:checked + label {
    background: #6f48eb;
    transition: all 0.4s;
  }
  /* input:checked + label:after {left:inherit; right:7.5px; } */
  input:checked + label:after {
    left: calc(100% - 27.5px);
  }
  label span {
    display: none;
  }
  /* body,
  html {
    background: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    z-index: -1;
  } */
`;

const Reservation1 = () => {
  const [peopleNum, setPeopleNum] = useState(2);
  const [time, setTime] = useState();
  const [isCar, setIsCar] = useState(false);

  //   const [value, onChange] = useState([
  //     new Date(2022, 4, 10),
  //     new Date(2022, 4, 20),
  //   ]);

  const [calendarValue, onChange] = useState();

  console.log(calendarValue);

  const peopleArr = Array(30)
    .fill()
    .map((V, i) => i + 1);

  useEffect(() => {
    console.log(isCar, peopleNum, calendarValue);
  }, [isCar, peopleNum, calendarValue]);

  const peopleClick = (num) => {
    setPeopleNum(num);
  };

  const PeopleBtn = styled.button`
    background-color: ${(props) =>
      props.num == peopleNum ? "#6f48eb" : "white"};
    color: ${(props) => (props.num == peopleNum ? "white" : "black")};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 2.5px;
    border: none;
    border: ${(props) =>
      props.num == peopleNum ? "none" : "1px solid rgba(0,0,0,0.3)"};

    cursor: pointer;
  `;

  const timeClick = () => {};
  return (
    <Container>
      <Header back="/guest/market" title={""} />
      <MainBox>
        <CalendarContainer>
          <Calendar
            minDate={new Date()}
            onChange={onChange}
            value={calendarValue}
            formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
            //minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            //maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            //showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          />
        </CalendarContainer>
        <PeopleContainer>
          <PeopleInnerCon>
            {peopleArr.map((num, index) => (
              <PeopleBtn
                num={index + 1}
                key={index}
                onClick={() => peopleClick(num)}
              >
                {num}명
              </PeopleBtn>
            ))}
          </PeopleInnerCon>
        </PeopleContainer>
        <TimeContainer>
          <TimeInnerCon>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
          </TimeInnerCon>
        </TimeContainer>
        <CheckBox>
          <div className="wrap_box">
            <span>차를 가져오셨습니까?</span>
            <input
              type="checkbox"
              id="chk1"
              onChange={() => {
                setIsCar((current) => !current);
                console.log(isCar);
              }}
            />
            <label htmlFor="chk1">
              <span>선택</span>
            </label>
          </div>
        </CheckBox>
        <NextBtn>다음</NextBtn>
        <span>{isCar}</span>
      </MainBox>
    </Container>
  );
};

export default Reservation1;