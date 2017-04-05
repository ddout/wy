package com.ddout.fb.controller.upload;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Result;
import com.ddout.fb.service.upload.IUploadService;

/**
 * 文件上传
 * 
 * @Copyright (C),沪友科技
 * @author dd
 * @Date:2015年10月26日
 */
@Controller
@RequestMapping("/upload")
public class UploadController {

    // 要统一常量
    private static final Logger log = Logger.getLogger(UploadController.class);

    @Autowired
    private IUploadService service;

    /**
     * 文件上传
     * 
     * @author dd
     * @Date 2015年10月28日
     * @param parm
     * @return
     */
    @RequestMapping("/archivesUpload")
    @ResponseBody
    public Object archivesUpload(String callback, @RequestParam Map<String, Object> parm, HttpServletRequest request,
	    HttpServletResponse response) {
	Result obj = new Result();
	try {
	    List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
	    // 创建一个通用的多部分解析器
	    CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
		    request.getSession().getServletContext());
	    // 判断 request 是否有文件上传,即多部分请求
	    if (multipartResolver.isMultipart(request)) {
		// 转换成多部分request
		MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
		// 取得request中的所有文件名
		Iterator<String> iter = multiRequest.getFileNames();
		while (iter.hasNext()) {
		    // 取得上传文件
		    MultipartFile file = multiRequest.getFile(iter.next());
		    if (file != null) {
			// 1024*100//123477
			Map<String, Object> fileInfo = service.saveArchivesUpload(parm, file);
			data.add(fileInfo);
		    }
		}
	    } else {
		throw new BizException("未能获取到文件数据");
	    }
	    obj.setRows(data);
	} catch (BizException e) {
	    log.debug("操作失败", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(e.getMessage());
	} catch (Exception e) {
	    log.error("操作失败", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(Result.RESULT_ERROR_MSG);
	}
	if (null != parm.get("callback") && !"".equals(parm.get("callback").toString().trim())) {
	    return new JSONPObject(parm.get("callback").toString().trim(), obj);
	} else {
	    return obj;
	}
    }

}
