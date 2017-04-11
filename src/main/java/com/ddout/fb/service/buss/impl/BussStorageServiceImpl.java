package com.ddout.fb.service.buss.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdhy.commons.utils.ParamsUtil;
import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Page;
import com.ddout.fb.dao.buss.IBussStorageMapper;
import com.ddout.fb.service.buss.IBussStorageService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@SuppressWarnings("unchecked")
@Service
public class BussStorageServiceImpl implements IBussStorageService {
    @Autowired
    private IBussStorageMapper mapper;

    @Override
    public Page list(Map<String, Object> parm) {
	Object start = ParamsUtil.getString4Map(parm, "start");
	Object limit = ParamsUtil.getString4Map(parm, "limit");
	Page page = new Page(start, limit);
	int st = Integer.parseInt(start.toString());
	parm.put("start", (st - 1) < 0 ? 0 : page.getLimit() * (st - 1));
	parm.put("end", page.getLimit());
	//
	int size = mapper.queryItemsListCount(parm);
	page.setRowsCount(size);
	if (size > 0) {
	    List<Map<String, Object>> list = mapper.queryItemsList(parm);
	    page.setData(list);
	}
	return page;
    }

    @Override
    public void add(Map<String, Object> parm) {
	String houseid = ParamsUtil.getString4Map(parm, "houseid");
	if("".equals(houseid)){
	    throw new BizException("仓库必选");
	}
	parm.put("modify_userid", 0);
	mapper.add(parm);
	int id = ParamsUtil.getInt4Map(parm, "id");
	String itemsStr = ParamsUtil.getString4Map(parm, "items");
	JSONArray items = JSONArray.fromObject(itemsStr);
	for (int i = 0; i < items.size(); i++) {
	    JSONObject item = items.getJSONObject(i);
	    if("".equals(item.getString("supplierid"))){
		item.remove("supplierid");
	    }
	    item.put("storageid", id);
	    mapper.addItems(item);
	}
    }

    @Override
    public void update(Map<String, Object> parm) {
	String idStr = ParamsUtil.getString4Map(parm, "id");
	if ("".equals(idStr)) {
	    throw new BizException("id is not null");
	}
	String houseid = ParamsUtil.getString4Map(parm, "houseid");
	if("".equals(houseid)){
	    throw new BizException("仓库必选");
	}
	mapper.update(parm);
	final int id = ParamsUtil.getInt4Map(parm, "id");
	String itemsStr = ParamsUtil.getString4Map(parm, "items");
	JSONArray items = JSONArray.fromObject(itemsStr);
	mapper.delItems(new HashMap<String, Object>() {
	    private static final long serialVersionUID = -3318393167052026767L;

	    {
		put("storageid", id);
	    }
	});
	for (int i = 0; i < items.size(); i++) {
	    JSONObject item = items.getJSONObject(i);
	    if("".equals(item.getString("supplierid"))){
		item.remove("supplierid");
	    }
	    item.put("storageid", id);
	    mapper.addItems(item);
	}

    }

    @Override
    public void del(Map<String, Object> parm) {
	String idStr = ParamsUtil.getString4Map(parm, "id");
	if ("".equals(idStr)) {
	    throw new BizException("id is not null");
	}
	parm.put("storageid", idStr);
	mapper.delItems(parm);
	mapper.del(parm);
    }

    @Override
    public Map<String, Object> getById(Map<String, Object> parm) {
	Map<String, Object> item = mapper.getById(parm);
	if (null != item && item.size() > 0) {
	    List<Map<String, Object>> items = mapper.getItemsByPId(parm);
	    item.put("items", items);
	}
	return item;
    }
}
