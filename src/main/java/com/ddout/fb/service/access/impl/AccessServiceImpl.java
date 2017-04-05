package com.ddout.fb.service.access.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdhy.commons.utils.ParamsUtil;
import com.ddout.fb.dao.access.IAccessMapper;
import com.ddout.fb.service.access.IAccessService;

import net.sf.json.JSONObject;

@Service
public class AccessServiceImpl implements IAccessService {
    @Autowired
    private IAccessMapper mapper;

    @Override
    public Map<String, Object> login(Map<String, Object> parm) {
	Map<String, Object> map = new HashMap<String, Object>();

	// TODO 内部多个应用接口---验证用户口令
	JSONObject user = null;
	List<Map<String, Object>> rolePrivilege = null;
	JSONObject requestParm = new JSONObject();
	requestParm.put("username", ParamsUtil.getString4Map(parm, "username"));
	requestParm.put("password", ParamsUtil.getString4Map(parm, "password"));
	//
	map.put("user", user);
//	map.put("rolePrivilege", rolePrivilege);
//	map.put("rolePrivilegeSet", rolePrivilegeSet);
	return map;
    }

}
