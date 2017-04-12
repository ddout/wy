package com.ddout.fb.controller.buss;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Result;
import com.ddout.fb.service.buss.IRpt1Service;

@Controller
@RequestMapping("/rpt1")
public class Rpt1Controller {
    private static final Logger log = Logger.getLogger(Rpt1Controller.class);

    @Autowired
    private IRpt1Service service;

    @RequestMapping("/list")
    @ResponseBody
    public Object list(@RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    Map<String,Object> list = service.list(parm);
	    obj.setRows(list);
	} catch (BizException e) {
	    log.debug("操作失败", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(e.getMessage());
	} catch (Exception e) {
	    log.error("操作失败", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(Result.RESULT_ERROR_MSG);
	}
	return obj;
    }
}
