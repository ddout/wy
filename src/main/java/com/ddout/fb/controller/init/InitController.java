package com.ddout.fb.controller.init;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cdhy.commons.utils.ParamsUtil;
import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Result;
import com.ddout.fb.service.init.IInitService;

@Controller
@RequestMapping("/init")
public class InitController {
    private static final Logger log = Logger.getLogger(InitController.class);

    @Autowired
    private IInitService service;

    @RequestMapping("/dbInit")
    @ResponseBody
    public Result dbInit(String callback, @RequestParam Map<String, Object> parm, HttpServletRequest resquest) {
	Result obj = new Result();
	try {
	    String pwd = ParamsUtil.getString4Map(parm, "pwd");
	    if ("wangyi".equals(pwd)) {
		boolean b = service.dbInit(resquest.getServletContext().getRealPath(""));
		obj.setRows(b);
	    } else {
		throw new BizException("密码不对");
	    }
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
