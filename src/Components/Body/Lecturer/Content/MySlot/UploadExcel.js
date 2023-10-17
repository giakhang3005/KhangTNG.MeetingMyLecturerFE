import { React, useState } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export function UploadExcel() {
  const { Dragger } = Upload;

  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);

  //dragger props
  const props = {
    beforeUpload: (fileIn) => {
      setFile(fileIn);
      return false;
    },
    file,
  };
  const handleChange = (fileIn) => {
    setFile(fileIn);
    // console.log(file)
  };

  const handleUpload = () => {
    //file to pass
    console.log(file);

    setUploading(true);
    // axios.post('XXXXX', file)
    //   .then((res) => res.json())
    //   .then(() => {
    //     setFile({});
    //     message.success('upload successfully.');
    //   })
    //   .catch((err) => {
    //     message.error('upload failed.');
    //     console.log
    //   })
    //   .finally(() => {
    //     setUploading(false);
    //   });
  };
  return (
    <div
      style={Object.assign(
        { height: "50vh" },
        { display: "flex" },
        { justifyContent: "center" },
        { alignItems: "center" },
        { flexWrap: "wrap" },
        { transform: "translateY(2vh)" }
      )}
    >
      <Dragger
        {...props}
        type="file"
        accept=".xlsx"
        maxCount={1}
        onChange={(fileIn) => handleChange(fileIn)}
        style={Object.assign(
          { padding: "0 10px 0 10px" },
          { margin: 0 },
          { transform: "translateY(0.2vh)" }
        )}
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag the excel (.xlsx) file to this area to upload
        </p>
        <p className="ant-upload-hint">
          You can only upload 1 file at a time, but in your excel file can
          contain multiple slots. Your file must follow the <b>Template</b>.
        </p>
      </Dragger>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={file.length === 0}
        loading={uploading}
        style={Object.assign(
          { width: "100%" },
          { margin: "0 0 0 0" },
          { padding: 0 },
          { transform: "translateY(-30px)" }
        )}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </div>
  );
}
