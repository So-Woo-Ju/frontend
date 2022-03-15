import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upload } from "../lib/api/media";
import { useMutation } from "react-query";
import { Radio, Upload, Button, Input, message, RadioChangeEvent } from "antd";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import Loading from "components/Loading";

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

const MainPage = () => {
  const navigate = useNavigate();
  const mutationUpload = useMutation(() => upload(type, uploadFile, Url));

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [lang, setLang] = useState(1);
  const [type, setType] = useState(1);
  const [Url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [UrlErrorMsg, setUrlErrorMsg] = useState("");
  const [emptyErrorMsg, setEmptyErrorMsg] = useState("");
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  const props = {
    beforeUpload: (file: File) => {
      if (file.type !== "video/mp4") {
        message.error("Please upload video(mp4) file");
      } else {
        setUploadFile(file);
      }
      return file.type === "video/mp4" ? false : Upload.LIST_IGNORE;
    },
  };

  const _handleChangeLanguage = (e: RadioChangeEvent) => {
    setLang(e.target.value);
  };
  const _handleChangeType = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  const _handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (type === 1 && !uploadFile) {
        if (lang === 1) {
          setEmptyErrorMsg("영상을 선택해주세요");
        } else {
          setEmptyErrorMsg("Please upload video");
        }
      } else {
        setEmptyErrorMsg("");
        if (
          (type === 1 && uploadFile) ||
          (type === 2 && Url && UrlErrorMsg === "")
        ) {
          _handleUpload();
        }
      }
    }
  };
  const _handleUpload = () => {
    mutationUpload
      .mutateAsync()
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          navigate("/result", {
            state: { title, url: res.url, script: res.script },
          });
        } else {
          console.log(res.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      {mutationUpload.isLoading ? (
        <Loading />
      ) : (
        <>
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
              <Upload {...props} maxCount={1}>
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
                lang === 1
                  ? "영상 제목을 입력해주세요"
                  : "Enter your video title"
              }
            />
            <StyledError>{emptyErrorMsg}</StyledError>
          </div>
          <StyledButton type="primary" onClick={_handleSubmit}>
            {lang === 1 ? "시작하기" : "Start"}
          </StyledButton>
        </>
      )}
    </Container>
  );
};

export default MainPage;
