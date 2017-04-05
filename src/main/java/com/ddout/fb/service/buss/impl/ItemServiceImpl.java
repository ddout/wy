package com.ddout.fb.service.buss.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdhy.commons.utils.ParamsUtil;
import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Page;
import com.ddout.fb.dao.buss.IItemMapper;
import com.ddout.fb.service.buss.IItemService;

@Service
public class ItemServiceImpl implements IItemService {
    @Autowired
    private IItemMapper mapper;

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
	String manuid = ParamsUtil.getString4Map(parm, "manuid");
	if ("".equals(manuid)) {
	    parm.remove("manuid");
	}
	Map<String, Object> item = mapper.queryItem(parm);
	if (null != item && item.size() > 0) {
	    throw new BizException("该产品已经存在!");
	}
	mapper.add(parm);
    }

    @Override
    public void update(Map<String, Object> parm) {
	String manuid = ParamsUtil.getString4Map(parm, "manuid");
	if ("".equals(manuid)) {
	    parm.remove("manuid");
	}
	Map<String, Object> item = mapper.queryItem(parm);
	if (null != item && item.size() > 0) {
	    throw new BizException("该产品已经存在!");
	}
	mapper.update(parm);
    }

    @Override
    public void del(Map<String, Object> parm) {
	mapper.del(parm);
    }
    @Override
    public Map<String, Object> getById(Map<String, Object> parm) {
	return mapper.getById(parm);
    }
}
