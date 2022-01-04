import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { upload } from "../modules/media";
import { Radio, Upload, Button, Input, message } from "antd";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";

const Container = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StyledLabel = styled.span`
  font-size: 15px;
`;
const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
  font-weight: bold;
`;
const StyledInput = styled(Input)`
  width: 300px;
`;
const StyledError = styled.p`
  font-size: 15px;
  color: red;
`;

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lang, setLang] = useState(1);
  const [type, setType] = useState(1);
  const [Url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [UrlErrorMsg, setUrlErrorMsg] = useState("");
  const [emptyErrorMsg, setEmptyErrorMsg] = useState("");
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  const props = {
    beforeUpload: (file) => {
      if (file.type !== "video/mp4") {
        message.error("Please upload video(mp4) file");
      }
      return file.type === "video/mp4" ? true : Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const _handleChangeLanguage = (e) => {
    setLang(e.target.value);
  };
  const _handleChangeType = (e) => {
    setType(e.target.value);
  };

  const _handleChangeUrl = (e) => {
    if (!regex.test(e.target.value)) {
      if (lang === 1) {
        setUrlErrorMsg("정확한 URL을 입력해주세요");
      } else {
        setUrlErrorMsg("Please enter correct URL");
      }
    } else {
      setUrlErrorMsg("");
    }
    setUrl(e.target.value);
  };
  const _handleSubmit = () => {
    if (!title) {
      if (lang === 1) {
        setEmptyErrorMsg("제목을 입력해주세요");
      } else {
        setEmptyErrorMsg("Please enter video title");
      }
    } else {
      setEmptyErrorMsg("");
      if (type === 1 || (type === 2 && Url && UrlErrorMsg === "")) {
        dispatch(upload());
        navigate("/loading");
      }
    }
  };

  return (
    <Container>
      <div>
        <StyledLabel>Language</StyledLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Radio.Group onChange={_handleChangeLanguage} value={lang}>
          <Radio value={1}>한국어</Radio>
          <Radio value={2}>English</Radio>
        </Radio.Group>
      </div>
      <br />
      <div>
        <StyledLabel>Type</StyledLabel>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Radio.Group onChange={_handleChangeType} value={type}>
          <Radio value={1}>File</Radio>
          <Radio value={2}>URL</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginTop: 20 }}>
        {type === 1 ? (
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>
              {lang === 1 ? "업로드" : "Upload"}
            </Button>
          </Upload>
        ) : (
          <StyledInput
            size="large"
            value={Url}
            onChange={_handleChangeUrl}
            placeholder={
              lang === 1 ? "URL을 입력해주세요" : "Please enter video URL"
            }
          />
        )}
        <StyledError>{UrlErrorMsg}</StyledError>
      </div>
      <div style={{ marginBottom: 20 }}>
        <StyledInput
          size="large"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            lang === 1 ? "영상 제목을 입력해주세요" : "Enter your video title"
          }
        />
        <StyledError>{emptyErrorMsg}</StyledError>
      </div>
      <StyledButton type="primary" onClick={_handleSubmit}>
        {lang === 1 ? "시작하기" : "Start"}
      </StyledButton>
    </Container>
  );
}

export default MainPage;
