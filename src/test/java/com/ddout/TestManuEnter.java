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
public class TestManuEnter {

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
	MockHttpServletRequestBuilder mock = post("/Manu/list.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("start", "1").param("limit", "10");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testAdd() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Manu/add.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("name", "测试4").param("note", "note2");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testDel() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Manu/del.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "2");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testUpdate() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Manu/update.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "2").param("name", "测试updte").param("note", "note22");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }
}
