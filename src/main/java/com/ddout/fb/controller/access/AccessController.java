package com.ddout.fb.controller.access;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cdhy.commons.utils.exception.BizException;
import com.cdhy.commons.utils.model.Result;
import com.ddout.fb.service.access.IAccessService;
import com.ddout.fb.utils.ContextHolderUtils;

@Controller
@RequestMapping("/access")
public class AccessController {
    private static final Logger log = Logger.getLogger(AccessController.class);

    public static final String LOGIN_USER_KEY = "";
    public static final String SESSION_KEY_OF_RAND_CODE = "randCode"; // todo

    @Autowired
    private IAccessService service;

    @RequestMapping("/login")
    @ResponseBody
    public Object login(String callback, @RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    // ContextHolderUtils.getSession().setAttribute(AccessController.SESSION_KEY_OF_RAND_CODE,
	    // "1000");

	    Object randCode = parm.get("randCode");
	    if (null == randCode || "".equals(randCode)) {
		obj.setResult(Result.RESULT_ERROR);
		obj.setMsg("请输入图片验证码");
	    } else if (!randCode.toString().equalsIgnoreCase(String.valueOf(
		    ContextHolderUtils.getSession().getAttribute(AccessController.SESSION_KEY_OF_RAND_CODE)))) {
		obj.setResult(Result.RESULT_ERROR);
		obj.setMsg("图片验证码错误");
	    } else {
		Map<String, Object> result = new HashMap<String, Object>();//service.login(parm);
		// put到session
		ContextHolderUtils.getSession().setAttribute(AccessController.LOGIN_USER_KEY, result);
		obj.setRows(result);
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
	if (null != parm.get("callback") && !"".equals(parm.get("callback").toString().trim())) {
	    return new JSONPObject(parm.get("callback").toString().trim(), obj);
	} else {
	    return obj;
	}
    }

    @RequestMapping("/getLoginUserInfo")
    @ResponseBody
    public Object getLoginUserInfo(String callback, @RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    // put到session
	    Object result = ContextHolderUtils.getSession().getAttribute(AccessController.LOGIN_USER_KEY);
	    obj.setRows(result);
	} catch (BizException e) {
	    log.debug("获取失败", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(e.getMessage());
	} catch (Exception e) {
	    log.error("获取异常", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(Result.RESULT_ERROR_MSG);
	}
	if (null != parm.get("callback") && !"".equals(parm.get("callback").toString().trim())) {
	    return new JSONPObject(parm.get("callback").toString().trim(), obj);
	} else {
	    return obj;
	}
    }

    @RequestMapping("/logout")
    @ResponseBody
    public Object logout(String callback, @RequestParam Map<String, Object> parm) {
	Result obj = new Result();
	try {
	    ContextHolderUtils.getSession().removeAttribute(AccessController.LOGIN_USER_KEY);
	} catch (BizException e) {
	    log.debug("登出失败", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(e.getMessage());
	} catch (Exception e) {
	    log.error("登出异常", e);
	    obj.setResult(Result.RESULT_ERROR);
	    obj.setMsg(Result.RESULT_ERROR_MSG);
	}
	if (null != parm.get("callback") && !"".equals(parm.get("callback").toString().trim())) {
	    return new JSONPObject(parm.get("callback").toString().trim(), obj);
	} else {
	    return obj;
	}
    }
}
