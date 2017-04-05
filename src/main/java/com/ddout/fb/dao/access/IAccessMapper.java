package com.ddout.fb.dao.access;

import java.util.List;
import java.util.Map;

public interface IAccessMapper {


    /**
     * 更具平台用户对象获取功能集合
     * 
     * @param adminUser
     * @return
     */
    List<Map<String, Object>> queryRolePrivilegeForUser(String id);

}
