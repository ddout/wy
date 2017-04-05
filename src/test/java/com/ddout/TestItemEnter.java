package com.ddout;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.context.WebApplicationContext;

import net.sf.json.JSONObject;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration({ "classpath*:conf/spring*.xml" })
public class TestItemEnter {

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Before
    public void setup() {
	this.mockMvc = webAppContextSetup(this.wac).build();
    }

    @Test
    public void testList() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Item/list.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("start", "1").param("limit", "10").param("name", "");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testAdd() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Item/add.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("name", "我的哈哈哈").param("manuid", "1").param("model", "mode2l");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testDel() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Item/del.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "2");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testUpdate() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Item/update.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "2").param("name", "我的哈哈哈2").param("manuid", "1").param("model", "model");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }
}
