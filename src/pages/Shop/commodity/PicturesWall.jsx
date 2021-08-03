import React from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    state = {
        previewVisible: false, //标识是否显示大图预览Modal
        previewImage: '', // 大图的url
        previewTitle: '',
        fileList: [],
    };

    // 隐藏Modal
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        // 显示指定file对于的大图
        this.setState({
            previewImage: file.url || file.preview, // file.preview 为base64
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    /*
        file: 当前操作的图片文件(上传/删除)
        fileList:所有已上传图文文件对象的数组 
     */
    handleChange = ({ file, fileList }) => {
        console.log(file);
        if (file.status === "done") {
            const result = file.response;
            if (result.status === 0) {
                message.success('上传成功')
                const { name, url } = result.data;
                file.name = name;
                file.url = url;
            } else {
                message.error('上传失败')
            }
        }
        //在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/manage/img/upload" //上传图片的接口地址
                    accept='image/*' //值接受图片格式
                    name="image" //请求参数名
                    listType="picture-card" // 卡片样式
                    fileList={fileList} // 所有已上传图片文件对象的数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

