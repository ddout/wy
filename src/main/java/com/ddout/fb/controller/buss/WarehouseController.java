package com.ddout.fb.controller.buss;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Page;
import com.cdhy.commons.utils.model.Result;
import com.ddout.fb.service.buss.IWarehouseService;
/**
 * 生产厂家
 * @author ddout
 *
 */
@Controller
@RequestMapping("/Warehouse")
public class WarehouseController {
    private static final Logger log = Logger.getLogger(WarehouseController.class);

    @Autowired
    private IWarehouseService service;

    @RequestMapping("/list")
    @ResponseBody
    public Object list(@RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    Page page = service.list(parm);
	    obj.setRows(page);
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

    @RequestMapping("/add")
    @ResponseBody
    public Object add(@RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    service.add(parm);
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

    @RequestMapping("/update")
    @ResponseBody
    public Object update(@RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    service.update(parm);
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

    @RequestMapping("/del")
    @ResponseBody
    public Object del(@RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    service.del(parm);
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
