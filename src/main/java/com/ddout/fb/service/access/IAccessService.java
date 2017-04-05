package com.ddout.fb.service.access;

import java.util.Map;

public interface IAccessService {
    /**
     * 登录认证
     * 
     * @param parm
     * @return
     */
    Map<String, Object> login(Map<String, Object> parm);

}
