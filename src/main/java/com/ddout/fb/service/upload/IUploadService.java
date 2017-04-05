package com.ddout.fb.service.upload;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface IUploadService {
    /**
     * 存储文件
     * 
     * @param parm
     * @param file
     * @return
     */
    Map<String, Object> saveArchivesUpload(Map<String, Object> parm, MultipartFile file);

}
