package com.ddout.fb.utils.interceptor;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.ddout.fb.controller.access.AccessController;
import com.ddout.fb.utils.ContextHolderUtils;

/**
 * 登录权限控制
 * 
 * @author ddout
 *
 */
public class AuthInterceptor implements HandlerInterceptor {
    private static final Logger logger = Logger.getLogger(AuthInterceptor.class);
    private List<String> excludeUrls;
    private List<String> excludeLoginUrls;
    private List<String> excludeNamespace;
    private List<String> excludeKeys;

    public List<String> getExcludeNamespace() {
	return excludeNamespace;
    }

    public void setExcludeNamespace(List<String> excludeNamespace) {
	this.excludeNamespace = excludeNamespace;
    }

    public List<String> getExcludeUrls() {
	return excludeUrls;
    }

    public List<String> getExcludeLoginUrls() {
	return excludeLoginUrls;
    }

    public void setExcludeLoginUrls(List<String> excludeLoginUrls) {
	this.excludeLoginUrls = excludeLoginUrls;
    }

    public void setExcludeUrls(List<String> excludeUrls) {
	this.excludeUrls = excludeUrls;
    }

    public List<String> getExcludeKeys() {
	return excludeKeys;
    }

    public void setExcludeKeys(List<String> excludeKeys) {
	this.excludeKeys = excludeKeys;
    }

    /**
     * 在controller后拦截
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object,
	    Exception exception) throws Exception {
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object,
	    ModelAndView modelAndView) throws Exception {

    }

    /**
     * 在controller前拦截
     */
    @SuppressWarnings("unchecked")
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
	return true;
//	String requestPath = getRequestPath(request);// 用户访问的资源地址
//	requestPath = requestPath.replaceFirst("/wy/", "/");
//	logger.debug("requestPath=" + requestPath);
//	if (excludeUrls.contains(requestPath)) {
//	    logger.debug("excludeUrls=true, access!" + requestPath);
//	    return true;
//	}
//	for (String string : excludeNamespace) {
//	    if (requestPath.startsWith(string)) {
//		logger.debug("excludeNamespace=true, access!" + requestPath);
//		return true;
//	    }
//	}
//	//
//	String serviceKey = request.getParameter("key");
//	//
//	if (null != excludeKeys && excludeKeys.contains(serviceKey)) {
//	    logger.debug("excludeKeys=true, access!" + requestPath + ";serviceKey=" + serviceKey);
//	    return true;
//	}
//	//
//	Object loginObj = ContextHolderUtils.getSession().getAttribute(AccessController.LOGIN_USER_KEY);
//	logger.debug("loginObj=" + loginObj);
//	if (null == loginObj) {
//	    logger.debug("loginObj is null response600!" + requestPath);
//	    response600(request, response);
//	    return false;
//	}
//	Map<String, Object> loginMap = (Map<String, Object>) loginObj;
//	Object user = loginMap.get("user");
//	if (null == user || null == ((Map<String, Object>) user).get("ID")
//		|| "".equals(((Map<String, Object>) user).get("ID").toString().trim())) {
//	    logger.debug("loginObj not null but user is null response401!" + requestPath);
//	    response401(request, response);
//	    return false;
//	}
//	for (String string : excludeLoginUrls) {
//	    if (requestPath.startsWith(string)) {
//		if ("/buss/exec.do".equals(requestPath)) {
//		    Set<String> rolePrivilegeSet = (Set<String>) loginMap.get("rolePrivilegeSet");
//		    if (rolePrivilegeSet.contains(serviceKey)) {
//			logger.debug("rolePrivilegeSet=true, access!" + requestPath + " service_key=" + serviceKey);
//			return true;
//		    } else {
//			logger.debug("rolePrivilegeSet not found, response401!" + requestPath + " service_key="
//				+ serviceKey);
//			response401(request, response);
//			return false;
//		    }
//		} else {
//		    logger.debug("excludeNamespace=true, access!" + requestPath);
//		    return true;
//		}
//
//	    }
//	}
//	return false;
    }

    private static final void response600(HttpServletRequest request, HttpServletResponse response) {
	response.setStatus(600);
    }

    private static final void response401(HttpServletRequest request, HttpServletResponse response) {
	response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    /**
     * 转发
     * 
     * @param request
     * @return
     */
    @RequestMapping(params = "forword")
    public ModelAndView forword(HttpServletRequest request) {
	return new ModelAndView(new RedirectView("access/login.do"));
    }

    @SuppressWarnings("unused")
    private void forward(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	request.getRequestDispatcher("login.html").forward(request, response);
    }

    /**
     * 获得请求路径
     * 
     * @param request
     * @return
     */
    public static String getRequestPath(HttpServletRequest request) {
	return getRequestPath(request, false);
    }

    public static String getRequestPath(HttpServletRequest request, boolean full) {
	String requestPath = request.getRequestURI();

	if (requestPath.indexOf("&") > -1 && !full) {// 去掉其他参数
	    requestPath = requestPath.substring(0, requestPath.indexOf("&"));
	}
	// requestPath = requestPath
	// .substring(request.getContextPath().length() + 1);// 去掉项目路径
	requestPath = requestPath.substring(request.getContextPath().length());// 去掉项目路径
	return requestPath;
    }

    public void setRequestUrl(HttpServletRequest request) {
	String url = request.getRequestURL().toString();
	String queryString = request.getQueryString();
	if (!StringUtils.isBlank(queryString)) {
	    url += "?" + queryString;
	}
	request.setAttribute("TAG_ACTION_URL", url);
    }
}
