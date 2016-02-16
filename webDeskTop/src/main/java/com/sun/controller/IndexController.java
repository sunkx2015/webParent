package com.sun.controller;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexController {
	
	/**
	 * <p>方法描述: 直接访问系统的index.html</p>
	 * <p>方法备注: 页面中直接跳转到此处</p>
	 * @param request
	 * @return
	 * <p>创建人：sunkx</p>
	 * <p>创建时间：2016-2-3 上午10:51:12</p>
	 */
	@RequestMapping("login")
	public String index(HttpServletRequest request){
		
		return "index";
	}

}
