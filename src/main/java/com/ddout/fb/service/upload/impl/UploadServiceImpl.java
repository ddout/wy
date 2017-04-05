package com.ddout.fb.service.upload.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cdhy.commons.utils.ParamsUtil;
import com.cdhy.commons.utils.exception.BizException;
import com.ddout.fb.service.upload.IUploadService;

@Service
public class UploadServiceImpl implements IUploadService {

    private static final String[] fileFix = new String[] { ".jpg", ".jpeg", ".gif", ".png", ".bmp", ".pfx" };

    public static void main(String[] args) {
	String myFileName = "a.Jpg";
	boolean fixFlag = false;
	for (String fix : fileFix) {
	    if (myFileName.toLowerCase().endsWith(fix)) {
		fixFlag = true;
		break;
	    }
	}
	if (fixFlag == false) {
	    throw new BizException("文件不合法");
	}
    }

    @Override
    public Map<String, Object> saveArchivesUpload(Map<String, Object> parm, MultipartFile uploadFile) {
	Map<String, Object> fileInfo = new HashMap<String, Object>();
	try {
	    String preview = ParamsUtil.getString4Map(parm, "preview");
	    // 取得当前上传文件的文件名称
	    String myFileName = uploadFile.getOriginalFilename();
	    // 如果名称不为“”,说明该文件存在，否则说明该文件不存在
	    if (myFileName.trim() != "") {
		boolean fixFlag = false;
		for (String fix : fileFix) {
		    if (myFileName.toLowerCase().endsWith(fix)) {
			fixFlag = true;
			break;
		    }
		}
		if (fixFlag == false) {
		    throw new BizException("文件不合法");
		}
		// 获取更目录
		String basePath = "";
		if (preview.equals("true")) {// 需要预览-非隐私文件
		    // basePath =
		    // dictService.getValueForCode(IDictService.DICTTYPE_SYS,
		    // "temp_file_base_path");
		} else {
		    // basePath =
		    // dictService.getValueForCode(IDictService.DICTTYPE_SYS,
		    // "private_file_base_path");
		}
		String dir = getRamdomStr();
		String filePath = basePath + "/" + dir + "/";
		File dFile = new File(filePath);
		if (!dFile.exists()) {
		    dFile.mkdirs();
		}
		String lastname = "";
		if (myFileName.indexOf(".") >= 0) {
		    lastname = myFileName.substring(myFileName.indexOf("."));
		}
		// 服务器文件名
		String fileName = getRamdomStr() + lastname;
		// 定义存储路径
		String absolutePath = dir + "/" + fileName;
		// 绝对路径
		String path = filePath + "/" + fileName;
		File localFile = new File(path);
		// 写文件
		uploadFile.transferTo(localFile);
		// 存数据库
		Map<String, Object> fileParm = new HashMap<String, Object>();
		fileParm.put("absolutepath", absolutePath);// 相对路径
		fileParm.put("filename", fileName);// 服务器文件名
		fileParm.put("srcfilename", myFileName);// 源文件名
		// mapper.saveFileUpload(fileParm);
		// 存数据库
		fileInfo.put("fileName", myFileName);
		fileInfo.put("mediaID", ParamsUtil.getString4Map(fileParm, "id"));
		if (preview.equals("true")) {// 需要预览-非隐私文件
		    fileInfo.put("path", absolutePath);
		} else {
		    fileInfo.put("path", "");
		}
	    }
	} catch (Exception e) {
	    throw new RuntimeException(e);
	}
	return fileInfo;
    }

    public static final String getRamdomStr() {
	String str = System.currentTimeMillis() + "_" + new Random().nextInt(100000);
	return str;
    }

}
