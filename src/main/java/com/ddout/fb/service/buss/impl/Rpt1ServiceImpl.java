package com.ddout.fb.service.buss.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ddout.fb.dao.buss.IRpt1Mapper;
import com.ddout.fb.service.buss.IRpt1Service;

@Service
public class Rpt1ServiceImpl implements IRpt1Service {
    @Autowired
    private IRpt1Mapper mapper;

    @Override
    public Map<String, Object> list(Map<String, Object> parm) {
	List<Map<String, Object>> list1 = mapper.queryTp1List(parm);
	List<Map<String, Object>> list2 = mapper.queryTp2List(parm);
	List<Map<String, Object>> list3 = mapper.queryTp3List(parm);
	Map<String, Object> result = new HashMap<String, Object>();
	result.put("data_tp1", list1);
	result.put("data_tp2", list2);
	result.put("data_tp3", list3);
	return result;
    }

}
