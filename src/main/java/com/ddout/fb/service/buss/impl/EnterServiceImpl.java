package com.ddout.fb.service.buss.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdhy.commons.utils.ParamsUtil;
import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Page;
import com.ddout.fb.dao.buss.IEnterMapper;
import com.ddout.fb.service.buss.IEnterService;

@Service
public class EnterServiceImpl implements IEnterService {
    @Autowired
    private IEnterMapper mapper;

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
	Map<String, Object> item = mapper.queryItem(parm);
	if (null != item && item.size() > 0) {
	    throw new BizException("[" + ParamsUtil.getString4Map(parm, "name") + "]重名!");
	}

	if ("".equals(ParamsUtil.getString4Map(parm, "pid"))) {
	    parm.remove("pid");
	}
	mapper.add(parm);
    }

    @Override
    public void update(Map<String, Object> parm) {
	Map<String, Object> item = mapper.queryItem(parm);
	if (null != item && item.size() > 0) {
	    throw new BizException("[" + ParamsUtil.getString4Map(parm, "name") + "]重名!");
	}
	if ("".equals(ParamsUtil.getString4Map(parm, "pid"))) {
	    parm.remove("pid");
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
